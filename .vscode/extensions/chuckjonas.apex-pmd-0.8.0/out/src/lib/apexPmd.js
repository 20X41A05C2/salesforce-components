"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexPmd = void 0;
const vscode = require("vscode");
const ChildProcess = require("child_process");
const path = require("path");
const appStatus_1 = require("./appStatus");
const os = require("os");
const utils_1 = require("./utils");
const pmdCsvParser_1 = require("./pmdCsvParser");
//setup OS constants
const CLASSPATH_DELM = os.platform() === 'win32' ? ';' : ':';
class ApexPmd {
    constructor(outputChannel, config) {
        this.config = config;
        this.rulesets = this.getValidRulesetPaths(config.rulesets);
        this.outputChannel = outputChannel;
    }
    updateConfiguration(config) {
        this.config = config;
        this.rulesets = this.getValidRulesetPaths(config.rulesets);
    }
    run(targetPath, collection, progress, token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.outputChannel.appendLine('###################################');
            this.outputChannel.appendLine(`Analyzing ${targetPath}`);
            appStatus_1.AppStatus.getInstance().thinking();
            let canceled = false;
            token &&
                token.onCancellationRequested(() => {
                    canceled = true;
                });
            if (!this.checkPmdPath() || !this.hasAtLeastOneValidRuleset())
                return;
            try {
                const data = yield this.executeCmd(targetPath, token);
                const problemsMap = this.parseProblems(data);
                if (problemsMap.size > 0) {
                    appStatus_1.AppStatus.getInstance().errors();
                    progress &&
                        progress.report({
                            message: `Processing ${problemsMap.size} file(s)`,
                        });
                    const increment = (1 / problemsMap.size) * 100;
                    for (const [path, issues] of problemsMap) {
                        if (canceled) {
                            return;
                        }
                        progress && progress.report({ increment });
                        try {
                            const uri = vscode.Uri.file(path);
                            const doc = yield vscode.workspace.openTextDocument(uri);
                            //fix ranges to not include whitespace
                            issues.forEach((issue) => {
                                const line = doc.lineAt(issue.range.start.line);
                                issue.range = new vscode.Range(new vscode.Position(line.range.start.line, line.firstNonWhitespaceCharacterIndex), line.range.end);
                            });
                            collection.set(uri, issues);
                        }
                        catch (e) {
                            this.outputChannel.appendLine(e);
                        }
                    }
                }
                else {
                    const uri = vscode.Uri.file(targetPath);
                    collection.delete(uri);
                    appStatus_1.AppStatus.getInstance().ok();
                }
            }
            catch (e) {
                appStatus_1.AppStatus.getInstance().errors();
                vscode.window.showErrorMessage(`Static Analysis Failed. Error Details: ${e}`);
                this.outputChannel.show(true);
                // should this throw e for promise catch?
            }
        });
    }
    getRulesets() {
        return this.rulesets;
    }
    getValidRulesetPaths(rulesets) {
        const validRulesets = rulesets.filter((p) => this.checkRulesetPath(p));
        return validRulesets;
    }
    hasAtLeastOneValidRuleset() {
        if (this.rulesets.length) {
            return true;
        }
        const msg = `No valid Ruleset paths found in "apexPMD.rulesets". Ensure configuration correct or change back to the default.`;
        this.outputChannel.appendLine(msg);
        vscode.window.showErrorMessage(msg);
        return false;
    }
    executeCmd(targetPath, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { workspaceRootPath, enableCache, pmdBinPath, additionalClassPaths, commandBufferSize, } = this.config;
            // -R Comma-separated list of ruleset or rule references.
            const cachePath = `${workspaceRootPath}/.pmdCache`;
            const rulesetsArg = this.rulesets.join(',');
            const cacheKey = enableCache ? `--cache "${cachePath}"` : '--no-cache';
            const noProgressBar = '--no-progress';
            const formatKey = `-f csv`;
            const targetPathKey = `-d "${targetPath}"`;
            const rulesetsKey = `-R "${rulesetsArg}"`;
            const pmdKeys = `${noProgressBar} ${formatKey} ${cacheKey} ${targetPathKey} ${rulesetsKey}`;
            const classPath = [
                path.join(workspaceRootPath, '*'),
                ...additionalClassPaths,
            ].join(CLASSPATH_DELM);
            let env = {};
            env["CLASSPATH"] = `${classPath}`;
            if (this.config.jrePath) {
                if (os.platform() === 'win32') {
                    // add surrounding quotes in case jrePath contains spaces
                    env["PATH"] = `"${path.join(this.config.jrePath, 'bin')}${path.delimiter}${process.env.PATH}"`;
                }
                else {
                    env["PATH"] = `${path.join(this.config.jrePath, 'bin')}${path.delimiter}${process.env.PATH}`;
                }
            }
            const cmd = `"${path.join(pmdBinPath, 'bin', 'pmd')}" check ${pmdKeys}`;
            this.outputChannel.appendLine(`node: ${process.version}`);
            this.outputChannel.appendLine(`env: ${JSON.stringify(env)}`);
            this.outputChannel.appendLine('PMD Command: ' + cmd);
            const pmdCmd = ChildProcess.exec(cmd, {
                env: Object.assign(Object.assign({}, process.env), env),
                maxBuffer: Math.max(commandBufferSize, 1) * 1024 * 1024,
            });
            token &&
                token.onCancellationRequested(() => {
                    pmdCmd.kill();
                });
            let stdout = '';
            let stderr = '';
            const pmdPromise = new Promise((resolve, reject) => {
                pmdCmd.addListener('error', (e) => {
                    this.outputChannel.appendLine('error:' + e);
                    reject(e);
                });
                pmdCmd.addListener('exit', (e) => {
                    if (e !== 0 && e !== 4) {
                        this.outputChannel.appendLine(`Failed Exit Code: ${e}`);
                        if (stderr.includes('Cannot load ruleset')) {
                            reject('PMD Command Failed!  There is a problem with the ruleset. Check the plugin output for details.');
                        }
                        if (!stdout) {
                            reject('PMD Command Failed!  Check the plugin output for details.');
                        }
                    }
                    resolve(stdout);
                });
                pmdCmd.stdout.on('data', (m) => {
                    this.outputChannel.append('stdout:' + m);
                    stdout += m;
                });
                pmdCmd.stderr.on('data', (m) => {
                    this.outputChannel.append('stderr:' + m);
                    stderr += m;
                });
            });
            return pmdPromise;
        });
    }
    parseProblems(csv) {
        const results = pmdCsvParser_1.parsePmdCsv(csv);
        const problemsMap = new Map();
        let problemCount = 0;
        for (let i = 1; i < results.length; i++) {
            try {
                const result = results[i];
                if (!results[i])
                    continue;
                //skip .sfdx files
                if (result.file.includes('.sfdx')) {
                    continue;
                }
                const problem = this.createDiagnostic(result);
                if (!problem)
                    continue;
                problemCount++;
                if (problemsMap.has(result.file)) {
                    problemsMap.get(result.file).push(problem);
                }
                else {
                    problemsMap.set(result.file, [problem]);
                }
            }
            catch (ex) {
                this.outputChannel.appendLine(ex);
            }
        }
        this.outputChannel.appendLine(`${problemCount} issue(s) found`);
        return problemsMap;
    }
    createDiagnostic(result) {
        const { priorityErrorThreshold, priorityWarnThreshold } = this.config;
        const lineNum = parseInt(result.line) - 1;
        const uri = `https://pmd.github.io/latest/pmd_rules_apex_${result.ruleSet
            .split(' ')
            .join('')
            .toLowerCase()}.html#${result.rule.toLowerCase()}`;
        const msg = `${result.description} (rule: ${result.ruleSet}-${result.rule})`;
        const priority = parseInt(result.priority);
        if (isNaN(lineNum)) {
            return null;
        }
        let level;
        if (priority <= priorityErrorThreshold) {
            level = vscode.DiagnosticSeverity.Error;
        }
        else if (priority <= priorityWarnThreshold) {
            level = vscode.DiagnosticSeverity.Warning;
        }
        else {
            level = vscode.DiagnosticSeverity.Information;
        }
        const problem = new vscode.Diagnostic(new vscode.Range(new vscode.Position(lineNum, 0), new vscode.Position(lineNum, 100)), msg, level);
        problem.code = { target: vscode.Uri.parse(uri), value: result.rule };
        problem.source = 'apex pmd';
        return problem;
    }
    checkPmdPath() {
        const { pmdBinPath } = this.config;
        if (utils_1.dirExists(pmdBinPath)) {
            return true;
        }
        let msg = `pmdBinPath does not reference a valid directory: '${pmdBinPath}'. Please update or clear.`;
        this.outputChannel.appendLine(msg);
        vscode.window.showErrorMessage(msg);
        return false;
    }
    checkRulesetPath(rulesetPath) {
        if (utils_1.fileExists(rulesetPath)) {
            return true;
        }
        vscode.window.showErrorMessage(`No Ruleset not found at ${rulesetPath}. Ensure configuration correct or change back to the default.`);
        return false;
    }
}
exports.ApexPmd = ApexPmd;
//# sourceMappingURL=apexPmd.js.map