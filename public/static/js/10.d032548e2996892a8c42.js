webpackJsonp([10],{459:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(467),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=i.default},463:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(449),i=function(t){return t&&t.__esModule?t:{default:t}}(n),u=s(450);e.default={name:"Spin",props:{size:{validator:function(t){return(0,u.oneOf)(t,["small","large"])}},fix:{type:Boolean,default:!1}},data:function(){return{showText:!1}},computed:{classes:function(){var t;return["ivu-spin",(t={},(0,i.default)(t,"ivu-spin-"+this.size,!!this.size),(0,i.default)(t,"ivu-spin-fix",this.fix),(0,i.default)(t,"ivu-spin-show-text",this.showText),t)]},mainClasses:function(){return"ivu-spin-main"},dotClasses:function(){return"ivu-spin-dot"},textClasses:function(){return"ivu-spin-text"}},mounted:function(){this.showText=void 0!==this.$slots.default}}},467:function(t,e,s){var n=s(173)(s(463),s(468),null,null);t.exports=n.exports},468:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade"}},[s("div",{class:t.classes},[s("div",{class:t.mainClasses},[s("span",{class:t.dotClasses}),t._v(" "),s("div",{class:t.textClasses},[t._t("default")],2)])])])},staticRenderFns:[]}}});
//# sourceMappingURL=10.d032548e2996892a8c42.js.map