(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[4257],{25414:function(){},38222:function(Et,We,v){"use strict";v.d(We,{Z:function(){return ua}});var L=v(96156),F=v(22122),Ne=v(54549),Ve=v(44545),St=v(49101),Ct=v(94184),G=v.n(Ct),X=v(28991),R=v(28481),ye=v(90484),ge=v(81253),t=v(67294),xt=v(31131),je=v(21770),Tt=v(63441),Ee=(0,t.createContext)(null),Pt=t.forwardRef(function(e,n){var r=e.prefixCls,a=e.className,o=e.style,i=e.id,s=e.active,l=e.tabKey,f=e.children;return t.createElement("div",{id:i&&"".concat(i,"-panel-").concat(l),role:"tabpanel",tabIndex:s?0:-1,"aria-labelledby":i&&"".concat(i,"-tab-").concat(l),"aria-hidden":!s,style:o,className:G()(r,s&&"".concat(r,"-active"),a),ref:n},f)}),$e=Pt,Zt=["key","forceRender","style","className"];function Rt(e){var n=e.id,r=e.activeKey,a=e.animated,o=e.tabPosition,i=e.destroyInactiveTabPane,s=t.useContext(Ee),l=s.prefixCls,f=s.tabs,b=a.tabPane,T="".concat(l,"-tabpane");return t.createElement("div",{className:G()("".concat(l,"-content-holder"))},t.createElement("div",{className:G()("".concat(l,"-content"),"".concat(l,"-content-").concat(o),(0,L.Z)({},"".concat(l,"-content-animated"),b))},f.map(function(d){var E=d.key,I=d.forceRender,C=d.style,P=d.className,M=(0,ge.Z)(d,Zt),O=E===r;return t.createElement(Tt.Z,(0,F.Z)({key:E,visible:O,forceRender:I,removeOnLeave:!!i,leavedClassName:"".concat(T,"-hidden")},a.tabPaneMotion),function(A,y){var z=A.style,w=A.className;return t.createElement($e,(0,F.Z)({},M,{prefixCls:T,id:n,tabKey:E,animated:b,active:O,style:(0,X.Z)((0,X.Z)({},C),z),className:G()(P,w),ref:y}))})})))}var Ue=v(85061),ce=v(75164),Nt=v(42550),Fe=v(48717);function He(e){var n=(0,t.useRef)(),r=(0,t.useRef)(!1);function a(){for(var o=arguments.length,i=new Array(o),s=0;s<o;s++)i[s]=arguments[s];r.current||(ce.Z.cancel(n.current),n.current=(0,ce.Z)(function(){e.apply(void 0,i)}))}return(0,t.useEffect)(function(){return r.current=!1,function(){r.current=!0,ce.Z.cancel(n.current)}},[]),a}function It(e){var n=(0,t.useRef)([]),r=(0,t.useState)({}),a=(0,R.Z)(r,2),o=a[1],i=(0,t.useRef)(typeof e=="function"?e():e),s=He(function(){var f=i.current;n.current.forEach(function(b){f=b(f)}),n.current=[],i.current=f,o({})});function l(f){n.current.push(f),s()}return[i.current,l]}var Y=v(15105);function kt(e,n){var r,a=e.prefixCls,o=e.id,i=e.active,s=e.tab,l=s.key,f=s.label,b=s.disabled,T=s.closeIcon,d=e.closable,E=e.renderWrapper,I=e.removeAriaLabel,C=e.editable,P=e.onClick,M=e.onRemove,O=e.onFocus,A=e.style,y="".concat(a,"-tab");t.useEffect(function(){return M},[]);var z=C&&d!==!1&&!b;function w(S){b||P(S)}function K(S){S.preventDefault(),S.stopPropagation(),C.onEdit("remove",{key:l,event:S})}var D=t.createElement("div",{key:l,ref:n,className:G()(y,(r={},(0,L.Z)(r,"".concat(y,"-with-remove"),z),(0,L.Z)(r,"".concat(y,"-active"),i),(0,L.Z)(r,"".concat(y,"-disabled"),b),r)),style:A,onClick:w},t.createElement("div",{role:"tab","aria-selected":i,id:o&&"".concat(o,"-tab-").concat(l),className:"".concat(y,"-btn"),"aria-controls":o&&"".concat(o,"-panel-").concat(l),"aria-disabled":b,tabIndex:b?null:0,onClick:function(c){c.stopPropagation(),w(c)},onKeyDown:function(c){[Y.Z.SPACE,Y.Z.ENTER].includes(c.which)&&(c.preventDefault(),w(c))},onFocus:O},f),z&&t.createElement("button",{type:"button","aria-label":I||"remove",tabIndex:0,className:"".concat(y,"-remove"),onClick:function(c){c.stopPropagation(),K(c)}},T||C.removeIcon||"\xD7"));return E?E(D):D}var Mt=t.forwardRef(kt),Ge={width:0,height:0,left:0,top:0};function At(e,n,r){return(0,t.useMemo)(function(){for(var a,o=new Map,i=n.get((a=e[0])===null||a===void 0?void 0:a.key)||Ge,s=i.left+i.width,l=0;l<e.length;l+=1){var f=e[l].key,b=n.get(f);if(!b){var T;b=n.get((T=e[l-1])===null||T===void 0?void 0:T.key)||Ge}var d=o.get(f)||(0,X.Z)({},b);d.right=s-d.left-d.width,o.set(f,d)}return o},[e.map(function(a){return a.key}).join("_"),n,r])}var Xe={width:0,height:0,left:0,top:0,right:0};function Lt(e,n,r,a,o,i,s){var l=s.tabs,f=s.tabPosition,b=s.rtl,T,d,E;return["top","bottom"].includes(f)?(T="width",d=b?"right":"left",E=Math.abs(r)):(T="height",d="top",E=-r),(0,t.useMemo)(function(){if(!l.length)return[0,0];for(var I=l.length,C=I,P=0;P<I;P+=1){var M=e.get(l[P].key)||Xe;if(M[d]+M[T]>E+n){C=P-1;break}}for(var O=0,A=I-1;A>=0;A-=1){var y=e.get(l[A].key)||Xe;if(y[d]<E){O=A+1;break}}return[O,C]},[e,n,a,o,i,E,f,l.map(function(I){return I.key}).join("_"),b])}var Ye=v(94423),wt=v(96753);function Bt(e,n){var r=e.prefixCls,a=e.editable,o=e.locale,i=e.style;return!a||a.showAdd===!1?null:t.createElement("button",{ref:n,type:"button",className:"".concat(r,"-nav-add"),style:i,"aria-label":(o==null?void 0:o.addAriaLabel)||"Add tab",onClick:function(l){a.onEdit("add",{event:l})}},a.addIcon||"+")}var Je=t.forwardRef(Bt);function Ot(e,n){var r=e.prefixCls,a=e.id,o=e.tabs,i=e.locale,s=e.mobile,l=e.moreIcon,f=l===void 0?"More":l,b=e.moreTransitionName,T=e.style,d=e.className,E=e.editable,I=e.tabBarGutter,C=e.rtl,P=e.removeAriaLabel,M=e.onTabClick,O=e.getPopupContainer,A=e.popupClassName,y=(0,t.useState)(!1),z=(0,R.Z)(y,2),w=z[0],K=z[1],D=(0,t.useState)(null),S=(0,R.Z)(D,2),c=S[0],h=S[1],Z="".concat(a,"-more-popup"),x="".concat(r,"-dropdown"),p=c!==null?"".concat(Z,"-").concat(c):null,W=i==null?void 0:i.dropdownAriaLabel;function k(u,B){u.preventDefault(),u.stopPropagation(),E.onEdit("remove",{key:B,event:u})}var ue=t.createElement(Ye.ZP,{onClick:function(B){var J=B.key,H=B.domEvent;M(J,H),K(!1)},prefixCls:"".concat(x,"-menu"),id:Z,tabIndex:-1,role:"listbox","aria-activedescendant":p,selectedKeys:[c],"aria-label":W!==void 0?W:"expanded dropdown"},o.map(function(u){var B=E&&u.closable!==!1&&!u.disabled;return t.createElement(Ye.sN,{key:u.key,id:"".concat(Z,"-").concat(u.key),role:"option","aria-controls":a&&"".concat(a,"-panel-").concat(u.key),disabled:u.disabled},t.createElement("span",null,u.label),B&&t.createElement("button",{type:"button","aria-label":P||"remove",tabIndex:0,className:"".concat(x,"-menu-item-remove"),onClick:function(H){H.stopPropagation(),k(H,u.key)}},u.closeIcon||E.removeIcon||"\xD7"))}));function ee(u){for(var B=o.filter(function(oe){return!oe.disabled}),J=B.findIndex(function(oe){return oe.key===c})||0,H=B.length,re=0;re<H;re+=1){J=(J+u+H)%H;var le=B[J];if(!le.disabled){h(le.key);return}}}function j(u){var B=u.which;if(!w){[Y.Z.DOWN,Y.Z.SPACE,Y.Z.ENTER].includes(B)&&(K(!0),u.preventDefault());return}switch(B){case Y.Z.UP:ee(-1),u.preventDefault();break;case Y.Z.DOWN:ee(1),u.preventDefault();break;case Y.Z.ESC:K(!1);break;case Y.Z.SPACE:case Y.Z.ENTER:c!==null&&M(c,u);break}}(0,t.useEffect)(function(){var u=document.getElementById(p);u&&u.scrollIntoView&&u.scrollIntoView(!1)},[c]),(0,t.useEffect)(function(){w||h(null)},[w]);var q=(0,L.Z)({},C?"marginRight":"marginLeft",I);o.length||(q.visibility="hidden",q.order=1);var de=G()((0,L.Z)({},"".concat(x,"-rtl"),C)),ne=s?null:t.createElement(wt.Z,{prefixCls:x,overlay:ue,trigger:["hover"],visible:o.length?w:!1,transitionName:b,onVisibleChange:K,overlayClassName:G()(de,A),mouseEnterDelay:.1,mouseLeaveDelay:.1,getPopupContainer:O},t.createElement("button",{type:"button",className:"".concat(r,"-nav-more"),style:q,tabIndex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":Z,id:"".concat(a,"-more"),"aria-expanded":w,onKeyDown:j},f));return t.createElement("div",{className:G()("".concat(r,"-nav-operations"),d),style:T,ref:n},ne,t.createElement(Je,{prefixCls:r,locale:i,editable:E}))}var Dt=t.memo(t.forwardRef(Ot),function(e,n){return n.tabMoving}),zt=.1,Qe=.01,Se=20,qe=Math.pow(.995,Se);function Kt(e,n){var r=(0,t.useState)(),a=(0,R.Z)(r,2),o=a[0],i=a[1],s=(0,t.useState)(0),l=(0,R.Z)(s,2),f=l[0],b=l[1],T=(0,t.useState)(0),d=(0,R.Z)(T,2),E=d[0],I=d[1],C=(0,t.useState)(),P=(0,R.Z)(C,2),M=P[0],O=P[1],A=(0,t.useRef)();function y(c){var h=c.touches[0],Z=h.screenX,x=h.screenY;i({x:Z,y:x}),window.clearInterval(A.current)}function z(c){if(!!o){c.preventDefault();var h=c.touches[0],Z=h.screenX,x=h.screenY;i({x:Z,y:x});var p=Z-o.x,W=x-o.y;n(p,W);var k=Date.now();b(k),I(k-f),O({x:p,y:W})}}function w(){if(!!o&&(i(null),O(null),M)){var c=M.x/E,h=M.y/E,Z=Math.abs(c),x=Math.abs(h);if(Math.max(Z,x)<zt)return;var p=c,W=h;A.current=window.setInterval(function(){if(Math.abs(p)<Qe&&Math.abs(W)<Qe){window.clearInterval(A.current);return}p*=qe,W*=qe,n(p*Se,W*Se)},Se)}}var K=(0,t.useRef)();function D(c){var h=c.deltaX,Z=c.deltaY,x=0,p=Math.abs(h),W=Math.abs(Z);p===W?x=K.current==="x"?h:Z:p>W?(x=h,K.current="x"):(x=Z,K.current="y"),n(-x,-x)&&c.preventDefault()}var S=(0,t.useRef)(null);S.current={onTouchStart:y,onTouchMove:z,onTouchEnd:w,onWheel:D},t.useEffect(function(){function c(p){S.current.onTouchStart(p)}function h(p){S.current.onTouchMove(p)}function Z(p){S.current.onTouchEnd(p)}function x(p){S.current.onWheel(p)}return document.addEventListener("touchmove",h,{passive:!1}),document.addEventListener("touchend",Z,{passive:!1}),e.current.addEventListener("touchstart",c,{passive:!1}),e.current.addEventListener("wheel",x),function(){document.removeEventListener("touchmove",h),document.removeEventListener("touchend",Z)}},[])}function Wt(){var e=(0,t.useRef)(new Map);function n(a){return e.current.has(a)||e.current.set(a,t.createRef()),e.current.get(a)}function r(a){e.current.delete(a)}return[n,r]}function _e(e,n){var r=t.useRef(e),a=t.useState({}),o=(0,R.Z)(a,2),i=o[1];function s(l){var f=typeof l=="function"?l(r.current):l;f!==r.current&&n(f,r.current),r.current=f,i({})}return[r.current,s]}function et(e){var n;return e instanceof Map?(n={},e.forEach(function(r,a){n[a]=r})):n=e,JSON.stringify(n)}var Vt=t.forwardRef(function(e,n){var r=e.position,a=e.prefixCls,o=e.extra;if(!o)return null;var i,s={};return(0,ye.Z)(o)==="object"&&!t.isValidElement(o)?s=o:s.right=o,r==="right"&&(i=s.right),r==="left"&&(i=s.left),i?t.createElement("div",{className:"".concat(a,"-extra-content"),ref:n},i):null}),tt=Vt,se=function(n){var r=n.current||{},a=r.offsetWidth,o=a===void 0?0:a,i=r.offsetHeight,s=i===void 0?0:i;return[o,s]},Ce=function(n,r){return n[r?0:1]};function jt(e,n){var r,a=t.useContext(Ee),o=a.prefixCls,i=a.tabs,s=e.className,l=e.style,f=e.id,b=e.animated,T=e.activeKey,d=e.rtl,E=e.extra,I=e.editable,C=e.locale,P=e.tabPosition,M=e.tabBarGutter,O=e.children,A=e.onTabClick,y=e.onTabScroll,z=(0,t.useRef)(),w=(0,t.useRef)(),K=(0,t.useRef)(),D=(0,t.useRef)(),S=(0,t.useRef)(),c=(0,t.useRef)(),h=(0,t.useRef)(),Z=Wt(),x=(0,R.Z)(Z,2),p=x[0],W=x[1],k=P==="top"||P==="bottom",ue=_e(0,function(g,$){k&&y&&y({direction:g>$?"left":"right"})}),ee=(0,R.Z)(ue,2),j=ee[0],q=ee[1],de=_e(0,function(g,$){!k&&y&&y({direction:g>$?"top":"bottom"})}),ne=(0,R.Z)(de,2),u=ne[0],B=ne[1],J=(0,t.useState)([0,0]),H=(0,R.Z)(J,2),re=H[0],le=H[1],oe=(0,t.useState)([0,0]),fe=(0,R.Z)(oe,2),xe=fe[0],Ie=fe[1],ke=(0,t.useState)([0,0]),ve=(0,R.Z)(ke,2),Me=ve[0],Ae=ve[1],N=(0,t.useState)([0,0]),te=(0,R.Z)(N,2),me=te[0],da=te[1],fa=It(new Map),ot=(0,R.Z)(fa,2),va=ot[0],ma=ot[1],Te=At(i,va,xe[0]),ie=Ce(re,k),_=Ce(xe,k),Le=Ce(Me,k),it=Ce(me,k),ba=ie<_+Le,Q=ba?ie-it:ie-Le,pa="".concat(o,"-nav-operations-hidden"),be=0,pe=0;k&&d?(be=0,pe=Math.max(0,_-Q)):(be=Math.min(0,Q-_),pe=0);function we(g){return g<be?be:g>pe?pe:g}var st=(0,t.useRef)(),ha=(0,t.useState)(),lt=(0,R.Z)(ha,2),Pe=lt[0],ct=lt[1];function Be(){ct(Date.now())}function Oe(){window.clearTimeout(st.current)}Kt(D,function(g,$){function m(V,U){V(function(Re){var Ra=we(Re+U);return Ra})}return ie>=_?!1:(k?m(q,g):m(B,$),Oe(),Be(),!0)}),(0,t.useEffect)(function(){return Oe(),Pe&&(st.current=window.setTimeout(function(){ct(0)},100)),Oe},[Pe]);var ya=Lt(Te,Q,k?j:u,_,Le,it,(0,X.Z)((0,X.Z)({},e),{},{tabs:i})),ut=(0,R.Z)(ya,2),ga=ut[0],Ea=ut[1],dt=function(){var $=arguments.length>0&&arguments[0]!==void 0?arguments[0]:T,m=Te.get($)||{width:0,height:0,left:0,right:0,top:0};if(k){var V=j;d?m.right<j?V=m.right:m.right+m.width>j+Q&&(V=m.right+m.width-Q):m.left<-j?V=-m.left:m.left+m.width>-j+Q&&(V=-(m.left+m.width-Q)),B(0),q(we(V))}else{var U=u;m.top<-u?U=-m.top:m.top+m.height>-u+Q&&(U=-(m.top+m.height-Q)),q(0),B(we(U))}},Ze={};P==="top"||P==="bottom"?Ze[d?"marginRight":"marginLeft"]=M:Ze.marginTop=M;var ft=i.map(function(g,$){var m=g.key;return t.createElement(Mt,{id:f,prefixCls:o,key:m,tab:g,style:$===0?void 0:Ze,closable:g.closable,editable:I,active:m===T,renderWrapper:O,removeAriaLabel:C==null?void 0:C.removeAriaLabel,ref:p(m),onClick:function(U){A(m,U)},onRemove:function(){W(m)},onFocus:function(){dt(m),Be(),!!D.current&&(d||(D.current.scrollLeft=0),D.current.scrollTop=0)}})}),Sa=function(){return ma(function(){var $=new Map;return i.forEach(function(m){var V=m.key,U=p(V).current;U&&$.set(V,{width:U.offsetWidth,height:U.offsetHeight,left:U.offsetLeft,top:U.offsetTop})}),$})};(0,t.useEffect)(function(){Sa()},[i.map(function(g){return g.key}).join("_")]);var De=He(function(){var g=se(z),$=se(w),m=se(K);le([g[0]-$[0]-m[0],g[1]-$[1]-m[1]]);var V=se(h);Ae(V);var U=se(c);da(U);var Re=se(S);Ie([Re[0]-V[0],Re[1]-V[1]])}),Ca=i.slice(0,ga),xa=i.slice(Ea+1),vt=[].concat((0,Ue.Z)(Ca),(0,Ue.Z)(xa)),Ta=(0,t.useState)(),mt=(0,R.Z)(Ta,2),Pa=mt[0],Za=mt[1],ae=Te.get(T),bt=(0,t.useRef)();function pt(){ce.Z.cancel(bt.current)}(0,t.useEffect)(function(){var g={};return ae&&(k?(d?g.right=ae.right:g.left=ae.left,g.width=ae.width):(g.top=ae.top,g.height=ae.height)),pt(),bt.current=(0,ce.Z)(function(){Za(g)}),pt},[ae,k,d]),(0,t.useEffect)(function(){dt()},[T,et(ae),et(Te),k]),(0,t.useEffect)(function(){De()},[d]);var ht=!!vt.length,he="".concat(o,"-nav-wrap"),ze,Ke,yt,gt;return k?d?(Ke=j>0,ze=j+ie<_):(ze=j<0,Ke=-j+ie<_):(yt=u<0,gt=-u+ie<_),t.createElement(Fe.Z,{onResize:De},t.createElement("div",{ref:(0,Nt.x1)(n,z),role:"tablist",className:G()("".concat(o,"-nav"),s),style:l,onKeyDown:function(){Be()}},t.createElement(tt,{ref:w,position:"left",extra:E,prefixCls:o}),t.createElement("div",{className:G()(he,(r={},(0,L.Z)(r,"".concat(he,"-ping-left"),ze),(0,L.Z)(r,"".concat(he,"-ping-right"),Ke),(0,L.Z)(r,"".concat(he,"-ping-top"),yt),(0,L.Z)(r,"".concat(he,"-ping-bottom"),gt),r)),ref:D},t.createElement(Fe.Z,{onResize:De},t.createElement("div",{ref:S,className:"".concat(o,"-nav-list"),style:{transform:"translate(".concat(j,"px, ").concat(u,"px)"),transition:Pe?"none":void 0}},ft,t.createElement(Je,{ref:h,prefixCls:o,locale:C,editable:I,style:(0,X.Z)((0,X.Z)({},ft.length===0?void 0:Ze),{},{visibility:ht?"hidden":null})}),t.createElement("div",{className:G()("".concat(o,"-ink-bar"),(0,L.Z)({},"".concat(o,"-ink-bar-animated"),b.inkBar)),style:Pa})))),t.createElement(Dt,(0,F.Z)({},e,{removeAriaLabel:C==null?void 0:C.removeAriaLabel,ref:c,prefixCls:o,tabs:vt,className:!ht&&pa,tabMoving:!!Pe})),t.createElement(tt,{ref:K,position:"right",extra:E,prefixCls:o})))}var at=t.forwardRef(jt),$t=["renderTabBar"],Ut=["label","key"];function Ft(e){var n=e.renderTabBar,r=(0,ge.Z)(e,$t),a=(0,t.useContext)(Ee),o=a.tabs;if(n){var i=(0,X.Z)((0,X.Z)({},r),{},{panes:o.map(function(s){var l=s.label,f=s.key,b=(0,ge.Z)(s,Ut);return t.createElement($e,(0,F.Z)({tab:l,key:f,tabKey:f},b))})});return n(i,at)}return t.createElement(at,r)}var Na=v(80334);function Ht(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{inkBar:!0,tabPane:!1},n;return e===!1?n={inkBar:!1,tabPane:!1}:e===!0?n={inkBar:!0,tabPane:!1}:n=(0,X.Z)({inkBar:!0},(0,ye.Z)(e)==="object"?e:{}),n.tabPaneMotion&&n.tabPane===void 0&&(n.tabPane=!0),!n.tabPaneMotion&&n.tabPane&&(n.tabPane=!1),n}var Gt=["id","prefixCls","className","items","direction","activeKey","defaultActiveKey","editable","animated","tabPosition","tabBarGutter","tabBarStyle","tabBarExtraContent","locale","moreIcon","moreTransitionName","destroyInactiveTabPane","renderTabBar","onChange","onTabClick","onTabScroll","getPopupContainer","popupClassName"],nt=0;function Xt(e,n){var r,a=e.id,o=e.prefixCls,i=o===void 0?"rc-tabs":o,s=e.className,l=e.items,f=e.direction,b=e.activeKey,T=e.defaultActiveKey,d=e.editable,E=e.animated,I=e.tabPosition,C=I===void 0?"top":I,P=e.tabBarGutter,M=e.tabBarStyle,O=e.tabBarExtraContent,A=e.locale,y=e.moreIcon,z=e.moreTransitionName,w=e.destroyInactiveTabPane,K=e.renderTabBar,D=e.onChange,S=e.onTabClick,c=e.onTabScroll,h=e.getPopupContainer,Z=e.popupClassName,x=(0,ge.Z)(e,Gt),p=t.useMemo(function(){return(l||[]).filter(function(N){return N&&(0,ye.Z)(N)==="object"&&"key"in N})},[l]),W=f==="rtl",k=Ht(E),ue=(0,t.useState)(!1),ee=(0,R.Z)(ue,2),j=ee[0],q=ee[1];(0,t.useEffect)(function(){q((0,xt.Z)())},[]);var de=(0,je.Z)(function(){var N;return(N=p[0])===null||N===void 0?void 0:N.key},{value:b,defaultValue:T}),ne=(0,R.Z)(de,2),u=ne[0],B=ne[1],J=(0,t.useState)(function(){return p.findIndex(function(N){return N.key===u})}),H=(0,R.Z)(J,2),re=H[0],le=H[1];(0,t.useEffect)(function(){var N=p.findIndex(function(me){return me.key===u});if(N===-1){var te;N=Math.max(0,Math.min(re,p.length-1)),B((te=p[N])===null||te===void 0?void 0:te.key)}le(N)},[p.map(function(N){return N.key}).join("_"),u,re]);var oe=(0,je.Z)(null,{value:a}),fe=(0,R.Z)(oe,2),xe=fe[0],Ie=fe[1];(0,t.useEffect)(function(){a||(Ie("rc-tabs-".concat(nt)),nt+=1)},[]);function ke(N,te){S==null||S(N,te);var me=N!==u;B(N),me&&(D==null||D(N))}var ve={id:xe,activeKey:u,animated:k,tabPosition:C,rtl:W,mobile:j},Me,Ae=(0,X.Z)((0,X.Z)({},ve),{},{editable:d,locale:A,moreIcon:y,moreTransitionName:z,tabBarGutter:P,onTabClick:ke,onTabScroll:c,extra:O,style:M,panes:null,getPopupContainer:h,popupClassName:Z});return t.createElement(Ee.Provider,{value:{tabs:p,prefixCls:i}},t.createElement("div",(0,F.Z)({ref:n,id:a,className:G()(i,"".concat(i,"-").concat(C),(r={},(0,L.Z)(r,"".concat(i,"-mobile"),j),(0,L.Z)(r,"".concat(i,"-editable"),d),(0,L.Z)(r,"".concat(i,"-rtl"),W),r),s)},x),Me,t.createElement(Ft,(0,F.Z)({},Ae,{renderTabBar:K})),t.createElement(Rt,(0,F.Z)({destroyInactiveTabPane:w},ve,{animated:k}))))}var Yt=t.forwardRef(Xt),Jt=Yt,Qt=Jt,qt=v(53124),_t=v(97647),ea=v(33603),ta={motionAppear:!1,motionEnter:!0,motionLeave:!0};function aa(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{inkBar:!0,tabPane:!1},r;return n===!1?r={inkBar:!1,tabPane:!1}:n===!0?r={inkBar:!0,tabPane:!0}:r=(0,F.Z)({inkBar:!0},(0,ye.Z)(n)==="object"?n:{}),r.tabPane&&(r.tabPaneMotion=(0,F.Z)((0,F.Z)({},ta),{motionName:(0,ea.mL)(e,"switch")})),r}var na=v(50344),ra=function(e,n){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(r[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,a=Object.getOwnPropertySymbols(e);o<a.length;o++)n.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(r[a[o]]=e[a[o]]);return r};function oa(e){return e.filter(function(n){return n})}function ia(e,n){if(e)return e;var r=(0,na.Z)(n).map(function(a){if(t.isValidElement(a)){var o=a.key,i=a.props,s=i||{},l=s.tab,f=ra(s,["tab"]),b=(0,F.Z)((0,F.Z)({key:String(o)},f),{label:l});return b}return null});return oa(r)}var sa=function(){return null},la=sa,ca=function(e,n){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(r[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,a=Object.getOwnPropertySymbols(e);o<a.length;o++)n.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(r[a[o]]=e[a[o]]);return r};function rt(e){var n=e.type,r=e.className,a=e.size,o=e.onEdit,i=e.hideAdd,s=e.centered,l=e.addIcon,f=e.children,b=e.items,T=e.animated,d=ca(e,["type","className","size","onEdit","hideAdd","centered","addIcon","children","items","animated"]),E=d.prefixCls,I=d.moreIcon,C=I===void 0?t.createElement(Ve.Z,null):I,P=t.useContext(qt.E_),M=P.getPrefixCls,O=P.direction,A=P.getPopupContainer,y=M("tabs",E),z;n==="editable-card"&&(z={onEdit:function(c,h){var Z=h.key,x=h.event;o==null||o(c==="add"?x:Z,c)},removeIcon:t.createElement(Ne.Z,null),addIcon:l||t.createElement(St.Z,null),showAdd:i!==!0});var w=M(),K=ia(b,f),D=aa(y,T);return t.createElement(_t.Z.Consumer,null,function(S){var c,h=a!==void 0?a:S;return t.createElement(Qt,(0,F.Z)({direction:O,getPopupContainer:A,moreTransitionName:"".concat(w,"-slide-up")},d,{items:K,className:G()((c={},(0,L.Z)(c,"".concat(y,"-").concat(h),h),(0,L.Z)(c,"".concat(y,"-card"),["card","editable-card"].includes(n)),(0,L.Z)(c,"".concat(y,"-editable-card"),n==="editable-card"),(0,L.Z)(c,"".concat(y,"-centered"),s),c),r),editable:z,moreIcon:C,prefixCls:y,animated:D}))})}rt.TabPane=la;var ua=rt},18106:function(Et,We,v){"use strict";var L=v(38663),F=v.n(L),Ne=v(25414),Ve=v.n(Ne)}}]);
