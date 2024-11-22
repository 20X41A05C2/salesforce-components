# 1.4.1

## Fixed

- We made some changes under the hood.

# 1.4.0

## Added

- We made some changes under the hood.

## Fixed

- We made improvements to our inline auto complete feature. Now you’ll get more helpful and stable suggestions as you type.
- We made some changes under the hood.

# 1.3.0

## Added

- Now you can enable or disable retrieval augmented generation (RAG) in settings. With RAG on, the responses you receive from Dev Assistant will be more relevant.
- We made some changes under the hood.

## Fixed

- We made some changes under the hood.

# 1.2.0

## Added

- A Salesforce admin can now disable Agentforce for Developers in a Salesforce org. If Agentforce for Developers is disabled in your default org, it’ll now also be disabled in the extension.

## Fixed

- We made some changes under the hood.

# 1.1.0

## Added

- Check out the new icon state in the status bar to see when inline autocompletions are paused. We pause autocompletions when we detect idle time in the editor. Paused autocompletions are easy to restart.

# 1.0.1

## Added

- Say hello to Agentforce for Developers. This extension's brand has a new identity! We've revamped the commands, views, and icons to match the exciting new branding.
- To ensure that our RAG model has all the context it needs about your workspace, we now remind you to run SFDX:Refresh SObject Definitions.

## Fixed

- We made some changes under the hood.

# 0.61.0

🚀🚀 We’re thrilled to announce the general availability of Einstein for Developers, our generative AI tool, powered by our custom Salesforce LLMs, CodeGen2.5 and xGen-Code.🚀🚀

Use Einstein for Developers, your helpful coding assistant in Visual Studio Code and Code Builder as you work on Apex and Lightning Web Component (LWC) files in your Salesforce DX project. Here’s an overview of features.

**Einstein Dev Assistant**: Code with ease with the help of your Dev Assistant right beside you. Get started with code generation and Salesforce development by asking Einstein for help. With easy-to-use slash commands, you can also focus on specific tasks like understanding new code and improving your code documentation.

**Command Palette**: Use the **Einstein: Generate Code** command in the VS Code Command Palette to enter a question about what you want to build. Einstein responds with Apex code suggestions right in your editor.

**Inline Auto Completions**: As you type, Einstein for Developers can suggest code completions, without any interruptions to your workflow. Easily pick the suggestion that works for you. Use this feature in Apex and LWC (JavaScript, CSS, and HTML) files.

**Test Case Generation for Apex**: Use Einstein for Developers to easily create unit test cases for your Apex methods. Quickly get to required Apex test coverage and get your code ready for deployment.

## Key Product Links

- [Documentation](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/einstein-overview.html)
- [FAQ](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/einstein-faq.html)
- [GitHub](https://github.com/forcedotcom/Einstein-GPT-for-Developers/issues) repo for logging issues.
- [Terms of Use](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/einstein-termsofuse.html)

We look forward to seeing how Einstein for Developers will power your Salesforce Development. Thank you for being a part of our journey!

# 0.60.0

Meet Einstein Dev Assistant, the latest addition to Einstein for Developers 🤖 🎉. This chat experience lets you ask Einstein questions about your local files and explain your existing code. With the ability to iterate over your responses, Einstein Dev Assistant will make you more productive than ever.

# 0.59.0

## Fixed

- We made some changes under the hood.

# 0.58.0

## Fixed

- We made some changes under the hood.

# 0.57.0

### Features

- No need to guess if the magic ✨ is happening. We've added a handy setting that’ll show you when an autocomplete is in progress.

## Fixed

- We made some changes under the hood.

# 0.56.0

## Added

- Our inline autocompletion feature just got a whole lot better. Now, you can easily find previous generations by simply placing your cursor back in the same location. We’ll show you up to 5 previous generations, making it easy to find the perfect completion.

## Fixed

- We made some changes under the hood.

# 0.55.0

## Added

- We made some changes under the hood.

## Fixed

- We made some changes under the hood.

# 0.54.0

## Added

- We made some changes under the hood.

## Fixed

- We made some changes under the hood.

# 0.53.0

## Added

- We made some changes under the hood.

## Fixed

- We made some changes under the hood.

# 0.52.0

## Added

- We made some changes under the hood.

## Fixed

- We made some changes under the hood.

# 0.51.0

## Added

- We made some changes under the hood.

## Fixed

- We made some changes under the hood.

# 0.50.0

## Added

- The Einstein for Developers extension is now bundled! This should result in a significantly faster startup time. 🚀
- We updated the Einstein for Developers sidebar introduction text to direct users to our Apex Unit Test Case Generation feature.

## Fixed

- We added a missing description to an icon.

# 0.49.0

## Added

🚀 We’re thrilled to announce that Einstein for Developers (Beta) is now a part of the [Salesforce Expanded Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-expanded)! 🚀
Here’s what you can expect with this change:

- Access to powerful generative AI tooling that is grounded in your org’s data, and is backed by the promise of Salesforce’s Trust Layer. See [Additional Terms of Use](https://developer.salesforce.com/tools/vscode/en/einstein/einstein-termsofuse) for information.
- Seamless updating of extension versions. Weekly extension releases include new features and enhancements that we continue to make to Einstein for Developers!
- Einstein for Developers is enabled by default in our VS Code desktop application. Enable it in Code Builder in minutes.

We’re excited that we’ve made it easier for you to give Einstein for Developers a spin, and we hope you’ll give it a try. We’d love your [feedback](https://developer.salesforce.com/tools/vscode/en/einstein/einstein-feedback) ! 📝

### Fixed

- We fixed an issue where the History tab in the output panel stole focus when the extension was first initialized

# 0.48.0

## Added

- We made some changes under the hood.

# 0.47.0

## Added

- We added a new setting that allows users to select the length of inline autocompletions.
- We made some changes under the hood.

## Fixed

- We fixed an issue with file creation during Test Case Generation so that all Salesforce CLI extension versions are now supported. ([#72](https://github.com/forcedotcom/Einstein-GPT-for-Developers/issues/72))

# 0.46.0

## Added

- We made some changes under the hood.

# 0.45.1

## Fixed

- We fixed an issue with the change log not rendering correctly.

# 0.45.0

## Added

- We made some changes under the hood.

## Fixed

- We made some changes under the hood.

# 0.44.0

## Fixed

- We fixed an issue where launching VS Code and opening a non `sfdx` project created a `.sfdx` sub-folder in the project.

# 0.43.2

## Fixed

- We fixed a bug that caused some Einstein for Developers features to be hidden when used with the most recent version of the Core CLI extension (v60.7.0).

# 0.43.1

## Added

- We made some changes under the hood.

# 0.43.0

## Added

- We improved the Einstein for Developers sidebar experience by adding a more detailed and helpful greeting. This includes links to a walkthrough and product documentation.

## Fixed

- We fixed an issue with the Einstein for Developers icon, where the extension's enabled state was not accurately reflected when users manually triggered completions.
- We made some changes under the hood.

# 0.42.0

## Features

- We updated some setting names in an effort to make their purpose clearer to understand. Values for these settings have reverted to default as a result of this update. Go to **Settings** and search for "Einstein for Developers" and make any settings updates you need.

## Fixed

- We made some changes under the hood.

# 0.41.0

## Added

- The Inline autocomplete feature now includes support for HTML files for LWC.

# 0.40.0 Major Release Update!

This release of Einstein for Developers (Beta) includes some spiffy new items that power up our custom generative AI tool. :tada: :tada: Use these features to make your productivity take a major leap forward. The extension is now enabled by default across all Salesforce orgs.

- **Inline Autocomplete for Apex and LWC**: Get multiple inline suggestions, as you code. Easily pick the one that works for you. This new feature is available in Apex and LWC (Javascript and CSS) files.
- **Test Case Generation for Apex**: Use Einstein for Developers to quickly generate unit tests for your Apex methods.
- **Update to Data Usage Policy**: Einstein for Developers no longer uses customer data to train our LLM, CodeGen.

Some other changes we’ve made to help you with your tasks include:

- An update to status icon that now suggests actions when you click on it, and also keeps you even more informed about the state of affairs.
- A brand new **Einstein for Developers Walkthrough** so that you can learn about these new features!

We hope you have fun with the features! :tada:

# 0.39.0

## Added

- We made some changes so that clicking the Einstein icon in the status bar now opens the command palette from where you can choose helpful Einstein for Developers commands.
- We made some changes under the hood.

## Fixed

- We made some changes under the hood.

# 0.38.0

## Fixed

- We made some changes under the hood.

# 0.37.0

## Fixed

- Fixed an issue that sometimes prevented the Einstein for Developers extension from activating in Code Builder. ([#370](https://github.com/forcedotcom/Einstein-GPT-for-Developers/issues/370))
- We made some changes under the hood.

## Added

- Pressing enter in the side bar now triggers the ask button automatically. ([#358](https://github.com/forcedotcom/Einstein-GPT-for-Developers/issues/358)), closes [#278](https://github.com/forcedotcom/Einstein-GPT-for-Developers/issues/278)

# 0.36.0

## Fixed

- We made some changes under the hood.

# 0.35.0

## Added

- We made some changes under the hood.

## Fixed

- We made some changes under the hood.

# 0.34.0

## Fixed

- We made some changes under the hood.

# 0.33.0

## Added

- We made some changes under the hood.

## Fixed

- We fixed a bug so that you can now copy prompts and generated responses from the History and Feedback panel. Thank you [abrantes23](https://github.com/abrantes23) for bringing the [issue](https://github.com/forcedotcom/Einstein-GPT-for-Developers/issues/10) to our attention. We hope we made your job just a little easier.

# 0.32.0

## Added

- We added some spiffy syntax highlighting to responses so that the generated code block looks exactly like it would in your code editor.

## Fixed

- We made token usage optimal by estimating in advance how many tokens a prompt would use, while also increasing the token budget. Response truncation incidents are now greatly reduced as a result of these updates. And you’re no longer wasting those precious tokens. Win-win much?
- We fixed an issue with single line generations not wrapping around columns. Responses are now formatted correctly in the History & Feedback tab.
- We fixed some issues so that both engineered prompts and Apex code responses are better formatted.

# 0.31.0

## Added

- We updated the minimum required version of the @salesforce/core library to 59.9.0
- We made some changes under the hood.

## Fixed

- We made some changes under the hood.
- We fixed an issue with incorrect handling of the user prompt so that it is now correctly added at the end of the printed engineered prompt in logs.

# 0.30.0

## Added

- We made some changes under the hood.

## Fixed

- We made some changes under the hood.
- We fixed an issue with incorrect handling of the situation when the Einstein for Developers is disabled in an org while it’s active.

# 0.29.0

## Added

- We made some changes under the hood.

# 0.28.0

## Added

- Einstein icon now has an updated look.
- You can now specify any apex files in your workspace in your prompts with the suffix .cls. Our engineered prompts can now extract the outlines of these files and use the information as context to provide better grounding.
- We made some changes under the hood.

## Fixed

- We made some changes under the hood.

# 0.27.1

## Added

- We made some changes under the hood.

# 0.26.3

## Added

- Einstein for Developers can now correctly parse custom metadata when it is a part of a prompt and uses the `__mdt` suffix. The metadata added to a prompt in this way is automatically included into the context to ground generations. Make sure to run `SFDX:Refresh SObject Definitions` to pull custom metadata from your org into the project. Then build prompts using the custom metadata and associated suffix. Enjoy building those cool prompts!
- We made some changes under the hood.

# 0.24.2

## Added

- You can now reference multiple custom objects in your prompt, making code generations more aware of your project's metadata. Run SFDX:Refresh SObjects Definitions to gather org metadata into your project. Then build your prompt using as many custom objects in the metadata as you want. Enjoy building those awesome prompts!
- You can now use the Esc key to clear code suggestions.

# 0.23.1

### Fixed

- We updated these keyboard shortcuts--

  - Use `ctrl+enter` / `cmd+enter` to accept a code suggestion that is generated in your Apex file when you run the `Einstein: Generate Code` command from that file.
  - Use `ctrl+shift+r` / `cmd+shift+r` to open the `Einstein: Generate Code` command in the command palette. You must have an Apex file in focus to use this shortcut.

- We increased the character limit for the text you can enter in the Einstein sidebar. Now you don’t have to worry about running out of words when you’re crafting your prompts. We know you have a lot of questions. Ask away!

# 0.22.1

## Fixed

- We made an update so that a text response is not rendered as code.
- We made some changes under the hood.

## Added

- We've added org context information to items the prompt history panel. Now the panel only displays prompt history information for the default org.

# 0.21.1

## Fixed

- We now let you know when your prompt is too long for us to handle!
- We also let you know when your CLI version needs updating.
- We fixed an issue where the feedback in the panel would get out of sync with feedback in the history. Thank you [Jeff Kranz](https://github.com/jkranz-rk) for reporting the [issue](https://github.com/forcedotcom/Einstein-GPT-for-Developers/issues/16).
- We made some changes under the hood.

## Added

- We made an update to telemetry reporting.

# 0.19.0 Open Beta Release

We released a brand new Einstein for Developers (Beta) extension. This extension used with the Salesforce Extension Pack, powers up your Salesforce development environment with custom generative AI. Use the extension to generate boilerplate Apex code from natural language instructions in a sidebar, so you can work with your editor and the tool side by side, without any interruptions to your workflow.

# 0.1.0 - 0.18.0

These releases were limited to the Einstein for Developers closed pilot.
