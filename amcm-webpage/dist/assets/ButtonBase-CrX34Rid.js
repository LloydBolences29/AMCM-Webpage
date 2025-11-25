import{c as y,a as ue,u as ce,s as J,g as Ne,b as we}from"./DefaultPropsProvider-BQFJOVLU.js";import{r as a,R as K,j as L}from"./index-CH27Beym.js";import{_ as Ve,h as ke,i as re}from"./Footer-D2Q2iCNQ.js";import{_ as Ie}from"./extends-CF3RwP-h.js";import{k as Q}from"./createSimplePaletteValueFilter-Dh0TRCQ5.js";const Be=typeof window<"u"?a.useLayoutEffect:a.useEffect;function De(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ee(e,t){var n=function(o){return t&&a.isValidElement(o)?t(o):o},s=Object.create(null);return e&&a.Children.map(e,function(r){return r}).forEach(function(r){s[r.key]=n(r)}),s}function Le(e,t){e=e||{},t=t||{};function n(p){return p in t?t[p]:e[p]}var s=Object.create(null),r=[];for(var o in e)o in t?r.length&&(s[o]=r,r=[]):r.push(o);var i,c={};for(var u in t){if(s[u])for(i=0;i<s[u].length;i++){var f=s[u][i];c[s[u][i]]=n(f)}c[u]=n(u)}for(i=0;i<r.length;i++)c[r[i]]=n(r[i]);return c}function D(e,t,n){return n[t]!=null?n[t]:e.props[t]}function je(e,t){return ee(e.children,function(n){return a.cloneElement(n,{onExited:t.bind(null,n),in:!0,appear:D(n,"appear",e),enter:D(n,"enter",e),exit:D(n,"exit",e)})})}function $e(e,t,n){var s=ee(e.children),r=Le(t,s);return Object.keys(r).forEach(function(o){var i=r[o];if(a.isValidElement(i)){var c=o in t,u=o in s,f=t[o],p=a.isValidElement(f)&&!f.props.in;u&&(!c||p)?r[o]=a.cloneElement(i,{onExited:n.bind(null,i),in:!0,exit:D(i,"exit",e),enter:D(i,"enter",e)}):!u&&c&&!p?r[o]=a.cloneElement(i,{in:!1}):u&&c&&a.isValidElement(f)&&(r[o]=a.cloneElement(i,{onExited:n.bind(null,i),in:f.props.in,exit:D(i,"exit",e),enter:D(i,"enter",e)}))}}),r}var Fe=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},Oe={component:"div",childFactory:function(t){return t}},te=function(e){Ve(t,e);function t(s,r){var o;o=e.call(this,s,r)||this;var i=o.handleExited.bind(De(o));return o.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},o}var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(r,o){var i=o.children,c=o.handleExited,u=o.firstRender;return{children:u?je(r,c):$e(r,i,c),firstRender:!1}},n.handleExited=function(r,o){var i=ee(this.props.children);r.key in i||(r.props.onExited&&r.props.onExited(o),this.mounted&&this.setState(function(c){var u=Ie({},c.children);return delete u[r.key],{children:u}}))},n.render=function(){var r=this.props,o=r.component,i=r.childFactory,c=ke(r,["component","childFactory"]),u=this.state.contextValue,f=Fe(this.state.children).map(i);return delete c.appear,delete c.enter,delete c.exit,o===null?K.createElement(re.Provider,{value:u},f):K.createElement(re.Provider,{value:u},K.createElement(o,c,f))},t}(K.Component);te.propTypes={};te.defaultProps=Oe;const oe={};function fe(e,t){const n=a.useRef(oe);return n.current===oe&&(n.current=e(t)),n}const Ue=[];function ze(e){a.useEffect(e,Ue)}class ne{static create(){return new ne}currentId=null;start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear}function He(){const e=fe(ne.create).current;return ze(e.disposeEffect),e}function _(e){const t=a.useRef(e);return Be(()=>{t.current=e}),a.useRef((...n)=>(0,t.current)(...n)).current}function ie(...e){const t=a.useRef(void 0),n=a.useCallback(s=>{const r=e.map(o=>{if(o==null)return null;if(typeof o=="function"){const i=o,c=i(s);return typeof c=="function"?c:()=>{i(null)}}return o.current=s,()=>{o.current=null}});return()=>{r.forEach(o=>o?.())}},e);return a.useMemo(()=>e.every(s=>s==null)?null:s=>{t.current&&(t.current(),t.current=void 0),s!=null&&(t.current=n(s))},e)}function Ae(e){return typeof e=="string"}function ct(e,t,n){return e===void 0||Ae(e)?t:{...t,ownerState:{...t.ownerState,...n}}}function ft(e,t,n){return typeof e=="function"?e(t,n):e}function We(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(s=>s.match(/^on[A-Z]/)&&typeof e[s]=="function"&&!t.includes(s)).forEach(s=>{n[s]=e[s]}),n}function ae(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function pt(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:s,externalForwardedProps:r,className:o}=e;if(!t){const E=y(n?.className,o,r?.className,s?.className),g={...n?.style,...r?.style,...s?.style},R={...n,...r,...s};return E.length>0&&(R.className=E),Object.keys(g).length>0&&(R.style=g),{props:R,internalRef:void 0}}const i=We({...r,...s}),c=ae(s),u=ae(r),f=t(i),p=y(f?.className,n?.className,o,r?.className,s?.className),d={...f?.style,...n?.style,...r?.style,...s?.style},b={...f,...n,...u,...c};return p.length>0&&(b.className=p),Object.keys(d).length>0&&(b.style=d),{props:b,internalRef:f.ref}}function le(e){try{return e.matches(":focus-visible")}catch{}return!1}class G{static create(){return new G}static use(){const t=fe(G.create).current,[n,s]=a.useState(!1);return t.shouldMount=n,t.setShouldMount=s,a.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=Xe(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...t){this.mount().then(()=>this.ref.current?.start(...t))}stop(...t){this.mount().then(()=>this.ref.current?.stop(...t))}pulsate(...t){this.mount().then(()=>this.ref.current?.pulsate(...t))}}function Ye(){return G.use()}function Xe(){let e,t;const n=new Promise((s,r)=>{e=s,t=r});return n.resolve=e,n.reject=t,n}function Ke(e){const{className:t,classes:n,pulsate:s=!1,rippleX:r,rippleY:o,rippleSize:i,in:c,onExited:u,timeout:f}=e,[p,d]=a.useState(!1),b=y(t,n.ripple,n.rippleVisible,s&&n.ripplePulsate),E={width:i,height:i,top:-(i/2)+o,left:-(i/2)+r},g=y(n.child,p&&n.childLeaving,s&&n.childPulsate);return!c&&!p&&d(!0),a.useEffect(()=>{if(!c&&u!=null){const R=setTimeout(u,f);return()=>{clearTimeout(R)}}},[u,c,f]),L.jsx("span",{className:b,style:E,children:L.jsx("span",{className:g})})}const M=ue("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),q=550,_e=80,Ge=Q`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,Ze=Q`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,qe=Q`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,Je=J("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),Qe=J(Ke,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${M.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${Ge};
    animation-duration: ${q}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${M.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${M.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${M.childLeaving} {
    opacity: 0;
    animation-name: ${Ze};
    animation-duration: ${q}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${M.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${qe};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,et=a.forwardRef(function(t,n){const s=ce({props:t,name:"MuiTouchRipple"}),{center:r=!1,classes:o={},className:i,...c}=s,[u,f]=a.useState([]),p=a.useRef(0),d=a.useRef(null);a.useEffect(()=>{d.current&&(d.current(),d.current=null)},[u]);const b=a.useRef(!1),E=He(),g=a.useRef(null),R=a.useRef(null),v=a.useCallback(h=>{const{pulsate:x,rippleX:C,rippleY:F,rippleSize:k,cb:O}=h;f(T=>[...T,L.jsx(Qe,{classes:{ripple:y(o.ripple,M.ripple),rippleVisible:y(o.rippleVisible,M.rippleVisible),ripplePulsate:y(o.ripplePulsate,M.ripplePulsate),child:y(o.child,M.child),childLeaving:y(o.childLeaving,M.childLeaving),childPulsate:y(o.childPulsate,M.childPulsate)},timeout:q,pulsate:x,rippleX:C,rippleY:F,rippleSize:k},p.current)]),p.current+=1,d.current=O},[o]),j=a.useCallback((h={},x={},C=()=>{})=>{const{pulsate:F=!1,center:k=r||x.pulsate,fakeElement:O=!1}=x;if(h?.type==="mousedown"&&b.current){b.current=!1;return}h?.type==="touchstart"&&(b.current=!0);const T=O?null:R.current,N=T?T.getBoundingClientRect():{width:0,height:0,left:0,top:0};let w,P,V;if(k||h===void 0||h.clientX===0&&h.clientY===0||!h.clientX&&!h.touches)w=Math.round(N.width/2),P=Math.round(N.height/2);else{const{clientX:U,clientY:I}=h.touches&&h.touches.length>0?h.touches[0]:h;w=Math.round(U-N.left),P=Math.round(I-N.top)}if(k)V=Math.sqrt((2*N.width**2+N.height**2)/3),V%2===0&&(V+=1);else{const U=Math.max(Math.abs((T?T.clientWidth:0)-w),w)*2+2,I=Math.max(Math.abs((T?T.clientHeight:0)-P),P)*2+2;V=Math.sqrt(U**2+I**2)}h?.touches?g.current===null&&(g.current=()=>{v({pulsate:F,rippleX:w,rippleY:P,rippleSize:V,cb:C})},E.start(_e,()=>{g.current&&(g.current(),g.current=null)})):v({pulsate:F,rippleX:w,rippleY:P,rippleSize:V,cb:C})},[r,v,E]),W=a.useCallback(()=>{j({},{pulsate:!0})},[j]),$=a.useCallback((h,x)=>{if(E.clear(),h?.type==="touchend"&&g.current){g.current(),g.current=null,E.start(0,()=>{$(h,x)});return}g.current=null,f(C=>C.length>0?C.slice(1):C),d.current=x},[E]);return a.useImperativeHandle(n,()=>({pulsate:W,start:j,stop:$}),[W,j,$]),L.jsx(Je,{className:y(M.root,o.root,i),ref:R,...c,children:L.jsx(te,{component:null,exit:!0,children:u})})});function tt(e){return Ne("MuiButtonBase",e)}const nt=ue("MuiButtonBase",["root","disabled","focusVisible"]),st=e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:s,classes:r}=e,i=we({root:["root",t&&"disabled",n&&"focusVisible"]},tt,r);return n&&s&&(i.root+=` ${s}`),i},rt=J("button",{name:"MuiButtonBase",slot:"Root"})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${nt.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),dt=a.forwardRef(function(t,n){const s=ce({props:t,name:"MuiButtonBase"}),{action:r,centerRipple:o=!1,children:i,className:c,component:u="button",disabled:f=!1,disableRipple:p=!1,disableTouchRipple:d=!1,focusRipple:b=!1,focusVisibleClassName:E,LinkComponent:g="a",onBlur:R,onClick:v,onContextMenu:j,onDragLeave:W,onFocus:$,onFocusVisible:h,onKeyDown:x,onKeyUp:C,onMouseDown:F,onMouseLeave:k,onMouseUp:O,onTouchEnd:T,onTouchMove:N,onTouchStart:w,tabIndex:P=0,TouchRippleProps:V,touchRippleRef:U,type:I,...z}=s,H=a.useRef(null),m=Ye(),pe=ie(m.ref,U),[B,Y]=a.useState(!1);f&&B&&Y(!1),a.useImperativeHandle(r,()=>({focusVisible:()=>{Y(!0),H.current.focus()}}),[]);const de=m.shouldMount&&!p&&!f;a.useEffect(()=>{B&&b&&!p&&m.pulsate()},[p,b,B,m]);const he=S(m,"start",F,d),me=S(m,"stop",j,d),ge=S(m,"stop",W,d),be=S(m,"stop",O,d),ye=S(m,"stop",l=>{B&&l.preventDefault(),k&&k(l)},d),Me=S(m,"start",w,d),Ee=S(m,"stop",T,d),Re=S(m,"stop",N,d),Ce=S(m,"stop",l=>{le(l.target)||Y(!1),R&&R(l)},!1),xe=_(l=>{H.current||(H.current=l.currentTarget),le(l.target)&&(Y(!0),h&&h(l)),$&&$(l)}),Z=()=>{const l=H.current;return u&&u!=="button"&&!(l.tagName==="A"&&l.href)},Te=_(l=>{b&&!l.repeat&&B&&l.key===" "&&m.stop(l,()=>{m.start(l)}),l.target===l.currentTarget&&Z()&&l.key===" "&&l.preventDefault(),x&&x(l),l.target===l.currentTarget&&Z()&&l.key==="Enter"&&!f&&(l.preventDefault(),v&&v(l))}),ve=_(l=>{b&&l.key===" "&&B&&!l.defaultPrevented&&m.stop(l,()=>{m.pulsate(l)}),C&&C(l),v&&l.target===l.currentTarget&&Z()&&l.key===" "&&!l.defaultPrevented&&v(l)});let X=u;X==="button"&&(z.href||z.to)&&(X=g);const A={};X==="button"?(A.type=I===void 0?"button":I,A.disabled=f):(!z.href&&!z.to&&(A.role="button"),f&&(A["aria-disabled"]=f));const Pe=ie(n,H),se={...s,centerRipple:o,component:u,disabled:f,disableRipple:p,disableTouchRipple:d,focusRipple:b,tabIndex:P,focusVisible:B},Se=st(se);return L.jsxs(rt,{as:X,className:y(Se.root,c),ownerState:se,onBlur:Ce,onClick:v,onContextMenu:me,onFocus:xe,onKeyDown:Te,onKeyUp:ve,onMouseDown:he,onMouseLeave:ye,onMouseUp:be,onDragLeave:ge,onTouchEnd:Ee,onTouchMove:Re,onTouchStart:Me,ref:Pe,tabIndex:f?-1:P,type:I,...A,...z,children:[i,de?L.jsx(et,{ref:pe,center:o,...V}):null]})});function S(e,t,n,s=!1){return _(r=>(n&&n(r),s||e[t](r),!0))}export{dt as B,ne as T,ie as a,Be as b,_ as c,Ae as d,We as e,ct as f,le as i,pt as m,ft as r,He as u};
