"use strict";(self.webpackChunkrs_react_context_api=self.webpackChunkrs_react_context_api||[]).push([[104,400],{968:(e,t,s)=>{s.d(t,{q:()=>c});const n="button_btn__h6Og9";var r=s(496);const c=e=>{let{title:t,onClick:s,disabled:c,children:a}=e;return(0,r.jsx)("button",{onClick:s,disabled:c,className:n,children:t||a})}},311:(e,t,s)=>{s.d(t,{Y:()=>c});var n=s(60),r=s(496);function c(e){let{component:t,...s}=e;return(0,r.jsx)(n.Suspense,{fallback:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...",children:(0,r.jsx)(t,{...s})})}},104:(e,t,s)=>{s.r(t),s.d(t,{Category:()=>j});var n=s(60),r=s(12),c=s(560),a=s(311),l=s(968);const o="CustomSelect_customSelect__PeV3q",i="CustomSelect_lable__f+X8J",d="CustomSelect_selectField__TQr5D";var u=s(496);const x=(0,n.forwardRef)(((e,t)=>(0,u.jsxs)("div",{className:o,children:[(0,u.jsx)("label",{className:i,htmlFor:e.id,children:e.label}),(0,u.jsxs)("select",{className:d,...e,ref:t,name:e.name,id:e.id,children:[(0,u.jsx)("option",{value:"",children:"\u0411\u0435\u0437 \u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u043a\u0438"}),(0,u.jsx)("option",{value:"ASC",children:"\u041f\u043e \u0432\u043e\u0437\u0440\u0430\u0441\u0442\u0430\u043d\u0438\u044e"}),(0,u.jsx)("option",{value:"DESC",children:"\u041f\u043e \u0443\u0431\u044b\u0432\u0430\u043d\u0438\u044e"})]})]})));var h=s(400),m=s(372);const p="Category_Category__kC0uA",j=()=>{const[e,t]=(0,r.k5)(),s=e.get("sort"),[o,i]=(0,n.useState)(""),[d,j]=(0,n.useState)(1),g=(0,c.i6)(),[v,f]=(0,n.useTransition)(),{loading:_,error:b,categories:C,hasMore:S,category:k,id:y}=function(e,t){const[s,r]=(0,n.useState)(!0),[a,l]=(0,n.useState)(!1),[o,i]=(0,n.useState)([]),[d,u]=(0,n.useState)(!0),{category:x,id:h}=(0,c.W4)(),[p,j]=(0,n.useState)(null===x||void 0===x?void 0:x.slice(0,-1));return(0,n.useEffect)((()=>{i([]),j(null===x||void 0===x?void 0:x.slice(0,-1))}),[x,e]),(0,n.useLayoutEffect)((()=>{let s;return r(!0),l(!1),(0,m.c)({method:"GET",url:"https://rickandmortyapi.com/api/".concat(p),params:{q:e,page:t},cancelToken:new m.c.CancelToken((e=>s=e))}).then((e=>{i((t=>[...new Set([...t,...e.data.results])])),u(e.data.results.length>0&&null!==e.data.info.next),r(!1)})).catch((e=>{m.c.isCancel(e)||(l(!1),console.error(e))})),()=>s()}),[x,p,t,e]),{loading:s,error:a,categories:o,hasMore:d,category:x,id:h}}(o,d),w=(0,n.useRef)(),N=(0,n.useCallback)((e=>{_||(w.current&&w.current.disconnect(),w.current=new IntersectionObserver((e=>{e[0].isIntersecting&&S&&j((e=>e+1))})),e&&w.current.observe(e))}),[S,_]),F=(0,n.useRef)(),E=(0,n.useCallback)((e=>{_||(F.current&&F.current.disconnect(),F.current=new IntersectionObserver((e=>{e[0].isIntersecting&&j(1)})),e&&F.current.observe(e))}),[_]),T="characters"===k,q=T&&{width:"40px",height:"40px",margin:"1px 20px 1px 10px",transform:"translateY(15px)",border:"1px solid #084949",borderRadius:"50%",boxShadow:"-4px -2px 10px black"};return k&&!["characters","locations","episodes"].includes(k)?(0,u.jsx)(h.NotFound,{}):(0,u.jsxs)("div",{className:p,children:[(0,u.jsx)("form",{children:(0,u.jsx)(a.Y,{component:x,label:"\u0421\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u043e \u0434\u0430\u0442\u0435 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f:",type:"select",id:"select",name:"select",value:s||"",onChange:e=>{const s=e.target.value;f((()=>{i(y),j(1),t({sort:s})}))}})}),(0,u.jsxs)("ol",{style:{marginLeft:"2rem"},children:[((e,t)=>{const s=[...e||[]];return s.sort(((e,s)=>{const n=Date.parse(e.created),r=Date.parse(s.created);return"ASC"===t?n-r:"DESC"===t?r-n:0})),s})(C,s).map(((e,t)=>C.length-17===t+1?(0,u.jsx)("li",{ref:N,children:(0,u.jsxs)(r.cH,{to:"/".concat(k,"/").concat(e.id),children:[T&&(0,u.jsx)("img",{style:q,src:e.image,alt:e.name}),e.name]})},t):0===t?(0,u.jsx)("li",{ref:E,children:(0,u.jsxs)(r.cH,{to:"/".concat(k,"/").concat(e.id),children:[T&&(0,u.jsx)("img",{style:q,src:e.image,alt:e.name}),e.name]})},t):(0,u.jsx)("li",{ref:N,children:(0,u.jsxs)(r.cH,{to:"/".concat(k,"/").concat(e.id),children:[T&&(0,u.jsx)("img",{style:q,src:e.image,alt:e.name}),e.name]})},t))),_&&S&&(0,u.jsx)("div",{style:{color:"red",fontSize:"2rem"},children:"Loading..."}),!_&&!S&&(0,u.jsxs)("div",{style:{display:"flex",alignItems:"end",color:"blue",fontSize:"2rem",fontWeight:"600",textShadow:"-2px 2px 2px black"},children:["\u041a\u043e\u043d\u0435\u0446 \u0441\u043f\u0438\u0441\u043a\u0430",(0,u.jsx)(a.Y,{component:l.q,title:"\u0412 \u043d\u0430\u0447\u0430\u043b\u043e \u0441\u043f\u0438\u0441\u043a\u0430",disabled:v,onClick:()=>{window.scrollTo(0,0),f((()=>{}))}}),(0,u.jsx)(a.Y,{component:l.q,title:"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e",disabled:v,onClick:()=>g("/")}),v&&(0,u.jsx)("div",{children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."})]}),b&&(0,u.jsx)("div",{children:"Error"})]})]})}},400:(e,t,s)=>{s.r(t),s.d(t,{NotFound:()=>l});var n=s(12);const r="NotFound_NotFound__uQjyf",c="NotFound_center__5rmze";var a=s(496);const l=()=>(0,a.jsxs)("div",{className:r,children:[(0,a.jsx)("h1",{children:"\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430"}),(0,a.jsx)("p",{children:"\u0418\u0437\u0432\u0438\u043d\u0438\u0442\u0435, \u043d\u043e \u0437\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u0435\u043c\u0430\u044f \u0432\u0430\u043c\u0438 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442."}),(0,a.jsx)("p",{children:"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u0432\u0432\u0435\u0434\u0435\u043d\u043d\u043e\u0433\u043e \u0430\u0434\u0440\u0435\u0441\u0430 \u0438\u043b\u0438 \u043f\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443."}),(0,a.jsx)("div",{className:c,children:(0,a.jsx)(n.cH,{to:"/",children:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443"})})]})}}]);
//# sourceMappingURL=104.6b89b92a.chunk.js.map