(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my-address/my-address"],{2567:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return r}));var r={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"cc46"))}},u=function(){var e=this.$createElement,t=(this._self._c,JSON.stringify(this.address));this.$mp.data=Object.assign({},{$root:{g0:t}})},c=[]},"2da8":function(e,t,n){"use strict";var r=n("fb96"),u=n.n(r);u.a},"518b":function(e,t,n){"use strict";n.r(t);var r=n("8e35"),u=n.n(r);for(var c in r)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(c);t["default"]=u.a},7779:function(e,t,n){"use strict";n.r(t);var r=n("2567"),u=n("518b");for(var c in u)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return u[e]}))}(c);n("2da8");var s=n("f0c5"),o=Object(s["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);t["default"]=o.exports},"8e35":function(e,t,n){"use strict";(function(e){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(n("2eee")),c=r(n("278c")),s=r(n("c973")),o=r(n("9523")),a=n("26cb");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f={name:"my-address",data:function(){return{}},computed:d(d({},(0,a.mapState)("user",["address"])),(0,a.mapGetters)("user",["addstr"])),methods:d(d({},(0,a.mapMutations)("user",["updateAddress"])),{},{chooseAddress:function(){var t=this;return(0,s.default)(u.default.mark((function n(){var r,s,o,a;return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.chooseAddress().catch((function(e){return e}));case 2:r=n.sent,s=(0,c.default)(r,2),o=s[0],a=s[1],null===o&&"chooseAddress:ok"===a.errMsg&&t.updateAddress(a);case 7:case"end":return n.stop()}}),n)})))()}})};t.default=f}).call(this,n("543d")["default"])},fb96:function(e,t,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my-address/my-address-create-component',
    {
        'components/my-address/my-address-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7779"))
        })
    },
    [['components/my-address/my-address-create-component']]
]);
