(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-400e150b"],{"0839":function(s,t,e){"use strict";e("f266")},"8e2a":function(s,t,e){"use strict";e.r(t);var n=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"message"},[e("div",[e("Panel",{scopedSlots:s._u([{key:"header",fn:function(){return[e("span",[e("router-link",{attrs:{to:"/"}},[s._v("主页")]),s._v("/"),e("span",{on:{click:s.hideMsg}},[s._v("消息")])],1)]},proxy:!0},{key:"content",fn:function(){return[e("div",{on:{click:function(t){return t.preventDefault(),s.changeTab(!0)}}},[s._v(" 未读消息: "+s._s(s.msg.hasnot_read_messages.length)+" ")]),e("div",{on:{click:function(t){return t.preventDefault(),s.changeTab(!1)}}},[s._v(" 已读消息: "+s._s(s.msg.has_read_messages.length)+" ")]),e("div",{staticClass:"msg-list"},s._l(s.isOnRead?s.msg.hasnot_read_messages:s.msg.has_read_messages,(function(t,n){return e("div",{key:t.id+n,staticClass:"msg-item"},[e("div",{staticClass:"msg-body"},[e("div",{staticClass:"msg-name"},[e("span",{on:{click:s.view}},[e("router-link",{attrs:{to:{name:"user",params:{name:t.author.loginname}}}},[s._v(s._s(t.author.loginname))])],1),s._v(" 的回复： ")]),e("div",{staticClass:"msg-msg",domProps:{innerHTML:s._s(t.reply.content)}}),e("div",{on:{click:s.view}},[e("div",{staticClass:"msg-from"},[e("router-link",{attrs:{to:{name:"article",params:{id:t.topic.id}}}},[s._v(" 来自："+s._s(t.topic.title)+" ")])],1)])])])})),0)]},proxy:!0}])})],1),e("div")])},a=[],i=e("89d7"),o={components:{Panel:i["a"]},name:"msg",data:function(){return{msg:{hasnot_read_messages:[],has_read_messages:[]},isOnRead:!0}},computed:{accessToken:function(){return this.$store.state.accessToken}},created:function(){var s=this;this.accesstoken?(console.log(this.msg),this.$axios.get("/messages?accesstoken={this.accessToken}").then((function(s){return s.data.data})).then((function(t){return s.msg=t}))):this.$store.commit("showLogin",!0)},methods:{hideMsg:function(){this.$store.commit("showMsg",!1)},changeTab:function(s){this.isOnRead=s},view:function(){this.$store.commit("showMsg",!1)}}},c=o,r=(e("0839"),e("2877")),m=Object(r["a"])(c,n,a,!1,null,"ab0e7476",null);t["default"]=m.exports},f266:function(s,t,e){}}]);
//# sourceMappingURL=chunk-400e150b.5176b2ec.js.map