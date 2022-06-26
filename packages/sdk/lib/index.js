"use strict";var O=Object.create;var m=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var N=Object.getPrototypeOf,$=Object.prototype.hasOwnProperty;var a=(r,e)=>m(r,"name",{value:e,configurable:!0});var q=(r,e)=>{for(var t in e)m(r,t,{get:e[t],enumerable:!0})},T=(r,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of I(e))!$.call(r,s)&&s!==t&&m(r,s,{get:()=>e[s],enumerable:!(i=R(e,s))||i.enumerable});return r};var x=(r,e,t)=>(t=r!=null?O(N(r)):{},T(e||!r||!r.__esModule?m(t,"default",{value:r,enumerable:!0}):t,r)),C=r=>T(m({},"__esModule",{value:!0}),r);var M={};q(M,{Convo:()=>b});module.exports=C(M);var k=x(require("cross-fetch")),j=x(require("abort-controller"));async function n(r,e,t="",i={},s={},d=6e3){let o=new j.default,p=setTimeout(()=>{o.abort()},d);try{let c=e;t!=""&&(c+=(e.includes("?")===!0?"&":"?")+"apikey="+t);let w={headers:{"Content-Type":"application/json",...s},signal:o.signal};r!=="GET"&&(w.method=r,w.body=JSON.stringify(i));let l=await(0,k.default)(c,w);return l.ok===!0&&l.status>=200&&l.status<300?await l.json():{error:{message:"Invalid Request",response:l}}}catch(c){return console.error(e,c),{error:c}}finally{clearTimeout(p)}}a(n,"fetcher");var h=class{constructor(e,t){this.send=async(e,t,i,s)=>await n("POST",`${this.node}/rewards`,this.apikey,{token:t,signerAddress:e,address:i,amount:s});return this.apikey=e,this.node=t,this}};a(h,"Rewards");var v=h;var y=class{constructor(e,t){this.create=async(e,t,i)=>await n("POST",`${this.node}/customers`,this.apikey,{token:t,signerAddress:e,email:i});return this.apikey=e,this.node=t,this}};a(y,"Customers");var S=y;var u=require("siwe");var g=class{constructor(e,t){this.validate=async(e,t)=>await n("POST",`${this.node}/validateAuth`,this.apikey,{signerAddress:e,token:t});this.authenticate=async(e,t,i,s,d="")=>{let o=`${this.node}/auth`;if(s==="ethereum")return await n("POST",o,this.apikey,{signerAddress:e,signature:t,timestamp:i,chain:"ethereum"});if(s==="near")return await n("POST",o,this.apikey,{signerAddress:e,signature:t,accountId:d,timestamp:i,chain:"near"});if(s==="flow")return await n("POST",o,this.apikey,{signerAddress:e,signature:t,timestamp:i,chain:"flow"});if(s==="solana")return await n("POST",o,this.apikey,{signerAddress:e,signature:t,timestamp:i,chain:"solana"});{let p="Invalid Chain Name";return console.error(p),{error:p}}};this.authenticateV2=async(e,t)=>await n("POST",`${this.node}/authV2`,this.apikey,{message:e,signature:t,chain:"ethereum"});return this.apikey=e,this.node=t,this}getSignatureData(e,t){return`I allow this site to access my data on Rward using the account ${e}. Timestamp:${t}`}getSignatureDataV2(e,t,i,s=[]){let d=e.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i),o=new Date,p=o;return p.setDate(o.getDate()+1),s.push("https://rward.xyz/privacy-policy"),new u.SiweMessage({domain:d[1],address:t,chainId:i,uri:e,version:"1",statement:"I allow this site to access my data on Rward.",nonce:(0,u.generateNonce)(),issuedAt:o.toISOString(),expirationTime:p.toISOString(),resources:s}).prepareMessage()}parseSignatureV2(e){return new u.SiweMessage(e)}};a(g,"Auth");var E=g;var D=x(require("cross-fetch"));var P="0.0.4";var f=class{constructor(e,t){this.version=P;this.logConfig=async()=>{let e=await this.pingNode(),t=await(0,D.default)("https://bundlephobia.com/api/size?package=@rward.xyz/sdk@latest&record=true").then(i=>i.json());return{node:this.node,apikey:this.apikey,currentVersion:this.version,latestVersion:t.version,pingResult:e}};this.pingNode=async()=>await n("GET",`${this.node}/ping`,this.apikey,{});this.listNodes=()=>["https://rward.xyz/api","https://backup.rward.xyz/api","https://node1.rward.xyz/api","https://node2.rward.xyz/api","https://node3.rward.xyz/api","https://node4.rward.xyz/api"];this.switchNode=e=>{this.node=e};return this.apikey=e,this.node=t,this}};a(f,"ConvoBase");var z=f;var b=class extends z{constructor(t,i="https://rward.xyz/api"){super(t,i);return this.rewards=new v(t,this.node),this.customers=new S(t,this.node),this.auth=new E(t,this.node),this}};a(b,"Convo");0&&(module.exports={Convo});