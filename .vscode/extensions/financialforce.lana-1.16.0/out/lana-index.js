"use strict";var e,t=require("./lana-_commonjsHelpers.js"),r=require("./lana-exported.js"),n={},i={},o=t.commonjsGlobal&&t.commonjsGlobal.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function c(e){try{l(n.next(e))}catch(e){o(e)}}function s(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(c,s)}l((n=n.apply(e,t||[])).next())})};Object.defineProperty(i,"__esModule",{value:!0}),i.AuthHelper=void 0;const c=r.exported,s=r.require$$1,l="@apexdevtools/sfdx-auth-helper";let AuthHelper=class AuthHelper{static instance(e){return new AuthHelper().init(e)}static toJsForceConnection(e){let t=e.getApiVersion(),r=e.getAuthInfo();return new s.Connection(a(r,{version:t,callOptions:{client:l}}))}connect(e){return o(this,void 0,void 0,function*(){let t=yield this.getValidUsername(e),r=yield c.AuthInfo.create({username:t});return c.Connection.create({authInfo:r,configAggregator:this.config})})}connectJsForce(e,t="57.0"){return o(this,void 0,void 0,function*(){let r=yield this.getValidUsername(e),n=yield c.AuthInfo.create({username:r}),i=this.config.getPropertyValue(c.OrgConfigProperties.ORG_API_VERSION),o=i?String(i):t;return new s.Connection(a(n,{version:o,callOptions:{client:l}}))})}getDefaultUsername(){return o(this,void 0,void 0,function*(){let e=this.config.getPropertyValue(c.OrgConfigProperties.TARGET_ORG),t=yield this.resolveUsername(e?String(e):void 0);if(!t)throw Error("No default username found in org config");return t})}reloadConfig(){return o(this,void 0,void 0,function*(){c.StateAggregator.clearInstance(),yield this.config.reload()})}init(e){return o(this,void 0,void 0,function*(){if(!this.config){let t=this.cwd();e!==t&&this.chdir(e);try{this.config=yield c.ConfigAggregator.create()}finally{this.cwd()!==t&&this.chdir(t)}}return this})}getValidUsername(e){return o(this,void 0,void 0,function*(){return e?(yield this.resolveUsername(e))||e:this.getDefaultUsername()})}resolveUsername(e){return o(this,void 0,void 0,function*(){let t=yield c.StateAggregator.getInstance();return e?t.aliases.resolveUsername(e):void 0})}cwd(){return process.cwd()}chdir(e){e&&process.chdir(e)}};function a(e,t){var r,n,i;let o=e.getConnectionOptions();return Object.assign(Object.assign({},t),{accessToken:o.accessToken,instanceUrl:o.instanceUrl,loginUrl:o.loginUrl,oauth2:{clientId:null===(r=o.oauth2)||void 0===r?void 0:r.clientId,loginUrl:null===(n=o.oauth2)||void 0===n?void 0:n.loginUrl,redirectUri:null===(i=o.oauth2)||void 0===i?void 0:i.redirectUri},refreshFn:o.refreshFn})}i.AuthHelper=AuthHelper,Object.defineProperty(n,"__esModule",{value:!0}),n.AuthHelper=void 0,Object.defineProperty(n,"AuthHelper",{enumerable:!0,get:function(){return i.AuthHelper}});var u=(e={__proto__:null},[n].forEach(function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach(function(r){if("default"!==r&&!(r in e)){var n=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:function(){return t[r]}})}})}),Object.freeze(e));exports.index=u;