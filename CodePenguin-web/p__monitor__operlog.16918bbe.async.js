(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[3802],{41252:function(He,G,p){"use strict";p.r(G),p.d(G,{default:function(){return ye}});var Be=p(57663),I=p(71577),M=p(2824),u=p(39428),S=p(11849),Se=p(34792),g=p(48086),Z=p(3182),De=p(71194),D=p(50146),N=p(57119),ne=p(73171),W=p(49101),T=p(67294),n=p(43581),te=p(85224),se=p(69193),ue=p(33700),w=p(86072),Re="V+Q0";function le(c){return R.apply(this,arguments)}function R(){return R=(0,Z.Z)((0,u.Z)().mark(function c(l){var a;return(0,u.Z)().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return a=new URLSearchParams(l).toString(),i.abrupt("return",(0,w.Z)("/monitor/operlog/list?".concat(a),{data:l,method:"GET",headers:{"Content-Type":"application/json;charset=UTF-8"}}));case 2:case"end":return i.stop()}},c)})),R.apply(this,arguments)}function $e(c){return request("/monitor/operlog/".concat(c),{method:"GET"})}function oe(c){return $.apply(this,arguments)}function $(){return $=(0,Z.Z)((0,u.Z)().mark(function c(l){return(0,u.Z)().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.abrupt("return",(0,w.Z)("/monitor/operlog",{method:"POST",data:l}));case 1:case"end":return s.stop()}},c)})),$.apply(this,arguments)}function ie(c){return A.apply(this,arguments)}function A(){return A=(0,Z.Z)((0,u.Z)().mark(function c(l){return(0,u.Z)().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.abrupt("return",(0,w.Z)("/monitor/operlog",{method:"PUT",data:l}));case 1:case"end":return s.stop()}},c)})),A.apply(this,arguments)}function ce(c){return _.apply(this,arguments)}function _(){return _=(0,Z.Z)((0,u.Z)().mark(function c(l){return(0,u.Z)().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.abrupt("return",(0,w.Z)("/monitor/operlog/".concat(l),{method:"DELETE",headers:{"Content-Type":"application/json;charset=UTF-8"}}));case 1:case"end":return s.stop()}},c)})),_.apply(this,arguments)}function de(c){return(0,ue.su)("/monitor/operlog/export",{params:c},"oper_log_".concat(new Date().getTime(),".xlsx"))}function pe(){return L.apply(this,arguments)}function L(){return L=(0,Z.Z)((0,u.Z)().mark(function c(){return(0,u.Z)().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.abrupt("return",(0,w.Z)("/monitor/operlog/clean",{method:"DELETE"}));case 1:case"end":return a.stop()}},c)})),L.apply(this,arguments)}var Ae=p(98858),k=p(4914),e=p(85893),o="OxhE",fe=function(l){var a=l.values,s=l.statusOptions,i=l.businessTypeOptions,m=l.operatorTypeOptions;(0,T.useEffect)(function(){},[l]);var r=(0,n.YB)(),E=function(){l.onCancel()};return(0,e.jsx)(D.Z,{width:800,title:r.formatMessage({id:"monitor.Operlog.detail",defaultMessage:"\u64CD\u4F5C\u65E5\u5FD7\u8BE6\u7EC6\u4FE1\u606F"}),visible:l.visible,destroyOnClose:!0,onCancel:E,footer:[(0,e.jsx)(I.Z,{onClick:E,_nk:"".concat(o,"21"),children:"\u5173\u95ED"},"back")],_nk:"".concat(o,"11"),children:(0,e.jsxs)(k.Z,{column:24,_nk:"".concat(o,"31"),children:[(0,e.jsx)(k.Z.Item,{span:12,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_id",defaultMessage:"\u65E5\u5FD7\u4E3B\u952E",_nk:"".concat(o,"51")}),_nk:"".concat(o,"41"),children:a.operId}),(0,e.jsx)(k.Z.Item,{span:12,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.title",defaultMessage:"\u6240\u5C5E\u6A21\u5757",_nk:"".concat(o,"52")}),_nk:"".concat(o,"42"),children:a.title}),(0,e.jsx)(k.Z.Item,{span:12,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.business_type",defaultMessage:"\u4E1A\u52A1\u7C7B\u578B",_nk:"".concat(o,"53")}),_nk:"".concat(o,"43"),children:i[a.businessType?a.businessType:0]}),(0,e.jsx)(k.Z.Item,{span:12,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.operator_type",defaultMessage:"\u64CD\u4F5C\u7C7B\u522B",_nk:"".concat(o,"54")}),_nk:"".concat(o,"44"),children:m[a.operatorType?a.operatorType:0]}),(0,e.jsx)(k.Z.Item,{span:24,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.method",defaultMessage:"\u65B9\u6CD5\u540D\u79F0",_nk:"".concat(o,"55")}),_nk:"".concat(o,"45"),children:a.method}),(0,e.jsx)(k.Z.Item,{span:24,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_url",defaultMessage:"\u8BF7\u6C42URL",_nk:"".concat(o,"56")}),_nk:"".concat(o,"46"),children:a.operUrl}),(0,e.jsx)(k.Z.Item,{span:12,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.request_method",defaultMessage:"\u8BF7\u6C42\u65B9\u5F0F",_nk:"".concat(o,"57")}),_nk:"".concat(o,"47"),children:a.requestMethod}),(0,e.jsx)(k.Z.Item,{span:12,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_name",defaultMessage:"\u64CD\u4F5C\u4EBA\u5458",_nk:"".concat(o,"58")}),_nk:"".concat(o,"48"),children:a.operName}),(0,e.jsx)(k.Z.Item,{span:12,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_ip",defaultMessage:"\u4E3B\u673A\u5730\u5740",_nk:"".concat(o,"59")}),_nk:"".concat(o,"49"),children:a.operIp}),(0,e.jsx)(k.Z.Item,{span:12,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_location",defaultMessage:"\u64CD\u4F5C\u5730\u70B9",_nk:"".concat(o,"5a")}),_nk:"".concat(o,"4a"),children:a.operLocation}),(0,e.jsx)(k.Z.Item,{span:24,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_param",defaultMessage:"\u8BF7\u6C42\u53C2\u6570",_nk:"".concat(o,"5b")}),_nk:"".concat(o,"4b"),children:a.operParam}),(0,e.jsx)(k.Z.Item,{span:24,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.json_result",defaultMessage:"\u8FD4\u56DE\u53C2\u6570",_nk:"".concat(o,"5c")}),_nk:"".concat(o,"4c"),children:a.jsonResult}),(0,e.jsx)(k.Z.Item,{span:12,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.status",defaultMessage:"\u64CD\u4F5C\u72B6\u6001",_nk:"".concat(o,"5d")}),_nk:"".concat(o,"4d"),children:s[a.status?a.status:0]}),(0,e.jsx)(k.Z.Item,{span:24,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.error_msg",defaultMessage:"\u9519\u8BEF\u6D88\u606F",_nk:"".concat(o,"5e")}),_nk:"".concat(o,"4e"),children:a.errorMsg}),(0,e.jsx)(k.Z.Item,{span:12,label:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_time",defaultMessage:"\u64CD\u4F5C\u65F6\u95F4",_nk:"".concat(o,"5f")}),_nk:"".concat(o,"4f"),children:a.operTime})]})})},he=fe,P=p(52346),me=p(28524),t="rzE0",Y=D.Z.confirm,ge=function(){var c=(0,Z.Z)((0,u.Z)().mark(function l(a){var s,i;return(0,u.Z)().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return s=g.default.loading("\u6B63\u5728\u6DFB\u52A0"),r.prev=1,r.next=4,oe((0,S.Z)({},a));case 4:return i=r.sent,s(),i.code===200?g.default.success("\u6DFB\u52A0\u6210\u529F"):g.default.error(i.msg),r.abrupt("return",!0);case 10:return r.prev=10,r.t0=r.catch(1),s(),g.default.error("\u6DFB\u52A0\u5931\u8D25\u8BF7\u91CD\u8BD5\uFF01"),r.abrupt("return",!1);case 15:case"end":return r.stop()}},l,null,[[1,10]])}));return function(a){return c.apply(this,arguments)}}(),ve=function(){var c=(0,Z.Z)((0,u.Z)().mark(function l(a){var s,i;return(0,u.Z)().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return s=g.default.loading("\u6B63\u5728\u914D\u7F6E"),r.prev=1,r.next=4,ie(a);case 4:return i=r.sent,s(),i.code===200?g.default.success("\u914D\u7F6E\u6210\u529F"):g.default.error(i.msg),r.abrupt("return",!0);case 10:return r.prev=10,r.t0=r.catch(1),s(),g.default.error("\u914D\u7F6E\u5931\u8D25\u8BF7\u91CD\u8BD5\uFF01"),r.abrupt("return",!1);case 15:case"end":return r.stop()}},l,null,[[1,10]])}));return function(a){return c.apply(this,arguments)}}(),K=function(){var c=(0,Z.Z)((0,u.Z)().mark(function l(a){var s,i;return(0,u.Z)().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(s=g.default.loading("\u6B63\u5728\u5220\u9664"),a){r.next=3;break}return r.abrupt("return",!0);case 3:return r.prev=3,r.next=6,ce(a.map(function(E){return E.operId}).join(","));case 6:return i=r.sent,s(),i.code===200?g.default.success("\u5220\u9664\u6210\u529F\uFF0C\u5373\u5C06\u5237\u65B0"):g.default.error(i.msg),r.abrupt("return",!0);case 12:return r.prev=12,r.t0=r.catch(3),s(),g.default.error("\u5220\u9664\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"),r.abrupt("return",!1);case 17:case"end":return r.stop()}},l,null,[[3,12]])}));return function(a){return c.apply(this,arguments)}}(),Ze=function(){var c=(0,Z.Z)((0,u.Z)().mark(function l(){var a,s;return(0,u.Z)().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return a=g.default.loading("\u6B63\u5728\u5220\u9664"),m.prev=1,m.next=4,pe();case 4:return s=m.sent,a(),s.code===200?g.default.success("\u5220\u9664\u6210\u529F\uFF0C\u5373\u5C06\u5237\u65B0"):g.default.error(s.msg),m.abrupt("return",!0);case 10:return m.prev=10,m.t0=m.catch(1),a(),g.default.error("\u5220\u9664\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"),m.abrupt("return",!1);case 15:case"end":return m.stop()}},l,null,[[1,10]])}));return function(){return c.apply(this,arguments)}}(),ke=function(){var c=(0,Z.Z)((0,u.Z)().mark(function l(){var a;return(0,u.Z)().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return a=g.default.loading("\u6B63\u5728\u5BFC\u51FA"),i.prev=1,i.next=4,de();case 4:return a(),g.default.success("\u5BFC\u51FA\u6210\u529F"),i.abrupt("return",!0);case 9:return i.prev=9,i.t0=i.catch(1),a(),g.default.error("\u5BFC\u51FA\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"),i.abrupt("return",!1);case 14:case"end":return i.stop()}},l,null,[[1,9]])}));return function(){return c.apply(this,arguments)}}(),je=function(){var l=(0,T.useRef)(),a=(0,T.useState)(!1),s=(0,M.Z)(a,2),i=s[0],m=s[1],r=(0,T.useRef)(),E=(0,T.useState)(),U=(0,M.Z)(E,2),Oe=U[0],V=U[1],Te=(0,T.useState)([]),Q=(0,M.Z)(Te,2),x=Q[0],z=Q[1],Ce=(0,T.useState)([]),J=(0,M.Z)(Ce,2),X=J[0],xe=J[1],be=(0,T.useState)([]),q=(0,M.Z)(be,2),ee=q[0],Ie=q[1],Me=(0,T.useState)([]),ae=(0,M.Z)(Me,2),re=ae[0],Ee=ae[1],H=(0,n.md)(),Fe=(0,n.YB)();(0,T.useEffect)(function(){(0,P.zP)("sys_oper_type").then(function(v){if(v.code===200){var f={};v.data.forEach(function(d){f[d.dictValue]=d.dictLabel}),xe(f)}}),(0,P.zP)("sys_oper_type").then(function(v){if(v.code===200){var f={};v.data.forEach(function(d){f[d.dictValue]=d.dictLabel}),Ie(f)}}),(0,P.zP)("sys_common_status").then(function(v){if(v.code===200){var f={};v.data.forEach(function(d){f[d.dictValue]=d.dictLabel}),Ee(f)}})},[]);var we=[{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_id",defaultMessage:"\u65E5\u5FD7\u4E3B\u952E",_nk:"".concat(t,"11")}),dataIndex:"operId",valueType:"text",hideInSearch:!0},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.title",defaultMessage:"\u6240\u5C5E\u6A21\u5757",_nk:"".concat(t,"12")}),dataIndex:"title",valueType:"text"},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.business_type",defaultMessage:"\u4E1A\u52A1\u7C7B\u578B",_nk:"".concat(t,"13")}),dataIndex:"businessType",valueType:"select",valueEnum:X},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.method",defaultMessage:"\u65B9\u6CD5\u540D\u79F0",_nk:"".concat(t,"14")}),dataIndex:"method",valueType:"text",hideInSearch:!0,hideInTable:!0},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.request_method",defaultMessage:"\u8BF7\u6C42\u65B9\u5F0F",_nk:"".concat(t,"15")}),dataIndex:"requestMethod",valueType:"text"},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.operator_type",defaultMessage:"\u64CD\u4F5C\u7C7B\u522B",_nk:"".concat(t,"16")}),dataIndex:"operatorType",valueType:"select",valueEnum:ee,hideInTable:!0},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_name",defaultMessage:"\u64CD\u4F5C\u4EBA\u5458",_nk:"".concat(t,"17")}),dataIndex:"operName",valueType:"text"},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.dept_name",defaultMessage:"\u90E8\u95E8\u540D\u79F0",_nk:"".concat(t,"18")}),dataIndex:"deptName",valueType:"text",hideInSearch:!0,hideInTable:!0},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_url",defaultMessage:"\u8BF7\u6C42URL",_nk:"".concat(t,"19")}),dataIndex:"operUrl",valueType:"text",hideInTable:!0},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_ip",defaultMessage:"\u4E3B\u673A\u5730\u5740",_nk:"".concat(t,"1a")}),dataIndex:"operIp",valueType:"text"},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_location",defaultMessage:"\u64CD\u4F5C\u5730\u70B9",_nk:"".concat(t,"1b")}),dataIndex:"operLocation",valueType:"text"},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_param",defaultMessage:"\u8BF7\u6C42\u53C2\u6570",_nk:"".concat(t,"1c")}),dataIndex:"operParam",valueType:"textarea",hideInSearch:!0,hideInTable:!0},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.json_result",defaultMessage:"\u8FD4\u56DE\u53C2\u6570",_nk:"".concat(t,"1d")}),dataIndex:"jsonResult",valueType:"textarea",hideInSearch:!0,hideInTable:!0},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.status",defaultMessage:"\u64CD\u4F5C\u72B6\u6001",_nk:"".concat(t,"1e")}),dataIndex:"status",valueType:"select",valueEnum:re},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.error_msg",defaultMessage:"\u9519\u8BEF\u6D88\u606F",_nk:"".concat(t,"1f")}),dataIndex:"errorMsg",valueType:"textarea",hideInSearch:!0,hideInTable:!0},{title:(0,e.jsx)(n._H,{id:"monitor.Operlog.oper_time",defaultMessage:"\u64CD\u4F5C\u65F6\u95F4",_nk:"".concat(t,"1g")}),dataIndex:"operTime",valueType:"dateRange",render:function(f,d){return(0,e.jsx)("span",{_nk:"".concat(t,"21"),children:d.operTime})},search:{transform:function(f){return{"params[beginTime]":f[0],"params[endTime]":f[1]}}}},{title:(0,e.jsx)(n._H,{id:"pages.searchTable.titleOption",defaultMessage:"\u64CD\u4F5C",_nk:"".concat(t,"1h")}),dataIndex:"option",width:"220px",valueType:"option",render:function(f,d){return[(0,e.jsx)(I.Z,{type:"link",size:"small",hidden:!H.hasPerms("monitor:operlog:list"),onClick:function(){m(!0),V(d)},_nk:"".concat(t,"31"),children:(0,e.jsx)(n._H,{id:"detaile",defaultMessage:"Detail",_nk:"".concat(t,"1i")})},"edit")]}}];return(0,e.jsxs)(me.Z,{_nk:"".concat(t,"41"),children:[(0,e.jsx)("div",{style:{width:"100%",float:"right"},_nk:"".concat(t,"51"),children:(0,e.jsx)(se.ZP,{headerTitle:Fe.formatMessage({id:"pages.searchTable.title",defaultMessage:"\u4FE1\u606F"}),actionRef:r,formRef:l,rowKey:"operId",search:{labelWidth:120},toolBarRender:function(){return[(0,e.jsxs)(I.Z,{type:"primary",hidden:(x==null?void 0:x.length)===0||!H.hasPerms("monitor:operlog:remove"),onClick:(0,Z.Z)((0,u.Z)().mark(function f(){return(0,u.Z)().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:Y({title:"\u662F\u5426\u786E\u8BA4\u6E05\u7A7A\u6240\u6709\u767B\u5F55\u65E5\u5FD7\u6570\u636E\u9879?",icon:(0,e.jsx)(N.Z,{_nk:"".concat(t,"71")}),content:"\u8BF7\u8C28\u614E\u64CD\u4F5C",onOk:function(){return(0,Z.Z)((0,u.Z)().mark(function j(){var C,y,b;return(0,u.Z)().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,K(x);case 2:C=O.sent,C&&(z([]),(y=r.current)===null||y===void 0||(b=y.reloadAndRest)===null||b===void 0||b.call(y));case 4:case"end":return O.stop()}},j)}))()},onCancel:function(){}});case 1:case"end":return h.stop()}},f)})),_nk:"".concat(t,"32"),children:[(0,e.jsx)(ne.Z,{_nk:"".concat(t,"81")}),(0,e.jsx)(n._H,{id:"pages.searchTable.delete",defaultMessage:"\u5220\u9664",_nk:"".concat(t,"1j")})]},"remove"),(0,e.jsxs)(I.Z,{type:"primary",hidden:!H.hasPerms("monitor:operlog:remove"),onClick:(0,Z.Z)((0,u.Z)().mark(function f(){return(0,u.Z)().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:Y({title:"\u662F\u5426\u786E\u8BA4\u6E05\u7A7A\u6240\u6709\u767B\u5F55\u65E5\u5FD7\u6570\u636E\u9879?",icon:(0,e.jsx)(N.Z,{_nk:"".concat(t,"72")}),content:"\u8BF7\u8C28\u614E\u64CD\u4F5C",onOk:function(){return(0,Z.Z)((0,u.Z)().mark(function j(){var C,y;return(0,u.Z)().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:Ze(),(C=r.current)===null||C===void 0||(y=C.reloadAndRest)===null||y===void 0||y.call(C);case 2:case"end":return B.stop()}},j)}))()},onCancel:function(){}});case 1:case"end":return h.stop()}},f)})),_nk:"".concat(t,"33"),children:[(0,e.jsx)(W.Z,{_nk:"".concat(t,"91")}),(0,e.jsx)(n._H,{id:"pages.searchTable.clear",defaultMessage:"\u6E05\u7A7A",_nk:"".concat(t,"1k")})]},"clear"),(0,e.jsxs)(I.Z,{type:"primary",hidden:!H.hasPerms("monitor:operlog:export"),onClick:(0,Z.Z)((0,u.Z)().mark(function f(){return(0,u.Z)().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:ke();case 1:case"end":return h.stop()}},f)})),_nk:"".concat(t,"34"),children:[(0,e.jsx)(W.Z,{_nk:"".concat(t,"92")}),(0,e.jsx)(n._H,{id:"pages.searchTable.export",defaultMessage:"\u5BFC\u51FA",_nk:"".concat(t,"1l")})]},"export")]},request:function(f){return le((0,S.Z)({},f)).then(function(d){var h={data:d.rows,total:d.total,success:!0};return h})},columns:we,rowSelection:{onChange:function(f,d){z(d)}},_nk:"".concat(t,"61")},"operlogList")}),(x==null?void 0:x.length)>0&&(0,e.jsx)(te.Z,{extra:(0,e.jsxs)("div",{_nk:"".concat(t,"52"),children:[(0,e.jsx)(n._H,{id:"pages.searchTable.chosen",defaultMessage:"\u5DF2\u9009\u62E9",_nk:"".concat(t,"1m")}),(0,e.jsx)("a",{style:{fontWeight:600},_nk:"".concat(t,"b1"),children:x.length}),(0,e.jsx)(n._H,{id:"pages.searchTable.item",defaultMessage:"\u9879",_nk:"".concat(t,"1n")})]}),_nk:"".concat(t,"a1"),children:(0,e.jsx)(I.Z,{hidden:!H.hasPerms("monitor:operlog:remove"),onClick:(0,Z.Z)((0,u.Z)().mark(function v(){return(0,u.Z)().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:D.Z.confirm({title:"\u5220\u9664",content:"\u786E\u5B9A\u5220\u9664\u8BE5\u9879\u5417\uFF1F",okText:"\u786E\u8BA4",cancelText:"\u53D6\u6D88",onOk:function(){var h=(0,Z.Z)((0,u.Z)().mark(function j(){var C,y,b;return(0,u.Z)().wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return O.next=2,K(x);case 2:C=O.sent,C&&(z([]),(y=r.current)===null||y===void 0||(b=y.reloadAndRest)===null||b===void 0||b.call(y));case 4:case"end":return O.stop()}},j)}));function F(){return h.apply(this,arguments)}return F}()});case 1:case"end":return d.stop()}},v)})),_nk:"".concat(t,"35"),children:(0,e.jsx)(n._H,{id:"pages.searchTable.batchDeletion",defaultMessage:"\u6279\u91CF\u5220\u9664",_nk:"".concat(t,"1o")})},"remove")}),(0,e.jsx)(he,{onSubmit:function(){var v=(0,Z.Z)((0,u.Z)().mark(function f(d){var h;return(0,u.Z)().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:if(h=!1,!d.operId){j.next=7;break}return j.next=4,ve((0,S.Z)({},d));case 4:h=j.sent,j.next=10;break;case 7:return j.next=9,ge((0,S.Z)({},d));case 9:h=j.sent;case 10:h&&(m(!1),V(void 0),r.current&&r.current.reload());case 11:case"end":return j.stop()}},f)}));return function(f){return v.apply(this,arguments)}}(),onCancel:function(){m(!1),V(void 0)},visible:i,values:Oe||{},businessTypeOptions:X,operatorTypeOptions:ee,statusOptions:re,_nk:"".concat(t,"c1")})]})},ye=je}}]);
