"use strict";var v=Object.defineProperty;var s=(o,e)=>v(o,"name",{value:e,configurable:!0});import S from"cross-fetch";import E from"abort-controller";async function i(o,e,t="",r={},n={},d=6e3){let a=new E,p=setTimeout(()=>{a.abort()},d);try{let c=e;t!=""&&(c+=(e.includes("?")===!0?"&":"?")+"apikey="+t);let g={headers:{"Content-Type":"application/json",...n},signal:a.signal};o!=="GET"&&(g.method=o,g.body=JSON.stringify(r));let l=await S(c,g);return l.ok===!0&&l.status>=200&&l.status<300?await l.json():{error:{message:"Invalid Request",response:l}}}catch(c){return console.error(e,c),{error:c}}finally{clearTimeout(p)}}s(i,"fetcher");var m=class{constructor(e,t){this.send=async(e,t,r,n)=>await i("POST",`${this.node}/rewards`,this.apikey,{token:t,signerAddress:e,address:r,amount:n});return this.apikey=e,this.node=t,this}};s(m,"Rewards");var b=m;var u=class{constructor(e,t){this.create=async(e,t,r)=>await i("POST",`${this.node}/customers`,this.apikey,{token:t,signerAddress:e,email:r});return this.apikey=e,this.node=t,this}};s(u,"Customers");var w=u;import{SiweMessage as x,generateNonce as P}from"siwe";var h=class{constructor(e,t){this.validate=async(e,t)=>await i("POST",`${this.node}/validateAuth`,this.apikey,{signerAddress:e,token:t});this.authenticate=async(e,t,r,n,d="")=>{let a=`${this.node}/auth`;if(n==="ethereum")return await i("POST",a,this.apikey,{signerAddress:e,signature:t,timestamp:r,chain:"ethereum"});if(n==="near")return await i("POST",a,this.apikey,{signerAddress:e,signature:t,accountId:d,timestamp:r,chain:"near"});if(n==="flow")return await i("POST",a,this.apikey,{signerAddress:e,signature:t,timestamp:r,chain:"flow"});if(n==="solana")return await i("POST",a,this.apikey,{signerAddress:e,signature:t,timestamp:r,chain:"solana"});{let p="Invalid Chain Name";return console.error(p),{error:p}}};this.authenticateV2=async(e,t)=>await i("POST",`${this.node}/authV2`,this.apikey,{message:e,signature:t,chain:"ethereum"});return this.apikey=e,this.node=t,this}getSignatureData(e,t){return`I allow this site to access my data on Rward using the account ${e}. Timestamp:${t}`}getSignatureDataV2(e,t,r,n=[]){let d=e.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i),a=new Date,p=a;return p.setDate(a.getDate()+1),n.push("https://rward.xyz/privacy-policy"),new x({domain:d[1],address:t,chainId:r,uri:e,version:"1",statement:"I allow this site to access my data on Rward.",nonce:P(),issuedAt:a.toISOString(),expirationTime:p.toISOString(),resources:n}).prepareMessage()}parseSignatureV2(e){return new x(e)}};s(h,"Auth");var T=h;import z from"cross-fetch";var k="0.0.4";var y=class{constructor(e,t){this.version=k;this.logConfig=async()=>{let e=await this.pingNode(),t=await z("https://bundlephobia.com/api/size?package=@rward.xyz/sdk@latest&record=true").then(r=>r.json());return{node:this.node,apikey:this.apikey,currentVersion:this.version,latestVersion:t.version,pingResult:e}};this.pingNode=async()=>await i("GET",`${this.node}/ping`,this.apikey,{});this.listNodes=()=>["https://rward.xyz/api","https://backup.rward.xyz/api","https://node1.rward.xyz/api","https://node2.rward.xyz/api","https://node3.rward.xyz/api","https://node4.rward.xyz/api"];this.switchNode=e=>{this.node=e};return this.apikey=e,this.node=t,this}};s(y,"ConvoBase");var j=y;var f=class extends j{constructor(t,r="https://rward.xyz/api"){super(t,r);return this.rewards=new b(t,this.node),this.customers=new w(t,this.node),this.auth=new T(t,this.node),this}};s(f,"Convo");export{f as Convo};