/*! ****ChenQing edit**** */
webpackJsonp([1],{LCmJ:function(s,t){},rz9i:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("+Dp9"),o={name:"commodityDetial",props:["foods"],data:function(){return{isShowNotNullContent:!1,rateType:"-1",all_comment:0,best_comment:0,bad_comment:0}},components:{"v-pannel":a("mj28").a,"v-contorNum":i.a},computed:{isShowCard:function(){return!this.foods.count},dateTime:function(){var s=[];function t(s){return s<10?"0"+s:s}return this.foods.ratings.map(function(a,i){var o=new Date(a.rateTime),e=o.getFullYear(),n=o.getMonth()+1,c=o.getDay(),l=o.getHours(),r=o.getMinutes();s.push(e+"-"+t(n)+"-"+t(c)+" "+l+":"+r)}),s},ratings:function(){var s=0,t=0,a=0,i=[],o=[],e=[],n=[];return this.foods.ratings.map(function(c,l){switch(""!==c.text&&n.push(c),c.rateType){case 0:i.push(c),s++;break;case 1:o.push(c),t++;break;case 2:e.push(c),a++}}),"0"===this.rateType?[i,s,t,a]:"1"===this.rateType?[o,s,t,a]:"2"===this.rateType?[e,s,t,a]:this.isShowNotNullContent?[n,s,t,a]:[this.rating,s,t,a]}},methods:{addCard:function(){this.isShowCard=!1,this.$refs.contornum.add()},goback:function(){this.$emit("goback")},isOrNoLike:function(s){var t=this.foods.ratings[s];t.islike?this.$set(t,"islike",!1):this.$set(t,"islike",!0)},ShowNotNullContent:function(){this.rateType=-1,this.isShowNotNullContent=!this.isShowNotNullContent},noShowNotNullContent:function(){this.isShowNotNullContent=!1},_all:function(){this.isShowNotNullContent=!1,this.rateType="0"},best:function(){this.isShowNotNullContent=!1,this.rateType="1"},_bad:function(){this.isShowNotNullContent=!1,this.rateType="2"}},mounted:function(){}},e={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"commodityDetial"},[a("img",{staticClass:"foodsImg",attrs:{src:s.foods.image,alt:""}}),s._v(" "),a("div",{staticClass:"foodsTitle"},[a("p",{staticClass:"title",on:{click:s.goback}},[s._v(s._s(s.foods.name))]),s._v(" "),a("div",[a("p",{staticClass:"sellsInfo"},[a("span",{staticClass:"sellscount"},[s._v("月售"+s._s(s.foods.sellCount)+"份")]),s._v(" "),a("span",{staticClass:"sellsrating"},[s._v("好评率"+s._s(s.foods.rating)+"%")])]),s._v(" "),a("div",{staticClass:"priceCard"},[a("p",{staticClass:"price"},[a("span",{staticClass:"new-price"},[a("span",{staticClass:"icon"},[s._v("￥")]),s._v(" "),a("span",{staticClass:"text"},[s._v(s._s(s.foods.price))])]),s._v(" "),s.foods.oldPrice?a("span",{staticClass:"old-price"},[a("span",{staticClass:"icon"},[s._v("￥")]),s._v(" "),a("span",{staticClass:"text"},[s._v(s._s(s.foods.oldPrice))])]):s._e()]),s._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:s.isShowCard,expression:"isShowCard"}],staticClass:"card",on:{click:s.addCard}},[s._v("加入购物车")]),s._v(" "),a("v-contorNum",{directives:[{name:"show",rawName:"v-show",value:!s.isShowCard,expression:"!isShowCard"}],ref:"contornum",attrs:{food:s.foods}})],1)])]),s._v(" "),s.foods.info?a("div",{staticClass:"foodsInfo"},[a("v-pannel",[a("p",{attrs:{slot:"header"},slot:"header"},[s._v("商品介绍")]),s._v(" "),a("p",{staticClass:"foodsItemInfo",attrs:{slot:"content"},slot:"content"},[s._v(s._s(s.foods.info))])])],1):s._e(),s._v(" "),a("div",{staticClass:"foodsComment"},[a("v-pannel",[a("p",{attrs:{slot:"header"},slot:"header"},[s._v("商品评论")]),s._v(" "),a("div",{attrs:{slot:"content"},slot:"content"},[a("span",{staticClass:"button all",on:{click:s._all}},[a("span",{staticClass:"text"},[s._v("全部")]),s._v(" "),a("span",{staticClass:"num"},[s._v(s._s(s.ratings[1]))])]),s._v(" "),a("span",{staticClass:"button best",on:{click:s.best}},[a("span",{staticClass:"text"},[s._v("推荐")]),s._v(" "),a("span",{staticClass:"num"},[s._v(s._s(s.ratings[2]))])]),s._v(" "),a("span",{staticClass:"button bad",on:{click:s._bad}},[a("span",{staticClass:"text"},[s._v("吐槽")]),s._v(" "),a("span",{staticClass:"num"},[s._v(s._s(s.ratings[3]))])])])]),s._v(" "),a("div",{staticClass:"onlyShow",on:{click:s.ShowNotNullContent}},[a("span",{staticClass:"check icon-check_circle",class:{active:s.isShowNotNullContent}}),s._v(" "),a("span",{staticClass:"text"},[s._v("只看有内容的评论")])]),s._v(" "),a("ul",{staticClass:"commentList"},s._l(s.ratings[0],function(t,i){return a("li",{key:i,staticClass:"commentListItem"},[a("div",{staticClass:"dateTime"},[a("p",{staticClass:"date"},[s._v(s._s(s.dateTime[i]))]),s._v(" "),a("p",{staticClass:"user"},[s._v("\n            "+s._s(t.username)+"\n            "),a("img",{staticClass:"user-avatar",attrs:{src:t.avatar,alt:""}})])]),s._v(" "),a("div",{staticClass:"comment"},[a("span",{staticClass:"icon icon-thumb_up",class:{like:s.foods.ratings[i].islike},on:{click:function(t){return s.isOrNoLike(i)}}}),s._v(" "),a("span",{staticClass:"text"},[s._v(s._s(t.text))])])])}),0)],1)])},staticRenderFns:[]};var n=a("VU/8")(o,e,!1,function(s){a("yJzk")},"data-v-cd408f8c",null).exports,c={name:"commodity",data:function(){return{goods:[],suppersClass:["decrease","discount","guarantee","invoice","special"],deliveryPrice:"",minPrice:"",showFoodsDetial:!1,foodslist:{}}},components:{"v-contorNum":i.a,"v-commodityDetial":n},computed:{},methods:{scroll:function(s){var t=this,a=$(".foods>.foods-item"),i=$(".menu-item"),o=0;i.eq(0).addClass("active"),$(".foods").scroll(function(){t.$nextTick(function(){$(".foods").scrollTop()>=a.eq(o)[0].offsetTop-1?(i.eq(o).addClass("active").siblings().removeClass("active"),o<a.length-1?o+=1:o=a.length-1):(o>0?o-=1:o=0,i.eq(o).addClass("active").siblings().removeClass("active"))})})},foodsDetial:function(s){this.$nextTick(function(){var t=$(".foods>.foods-item").eq(s)[0].offsetTop;$(".foods").animate({scrollTop:t},1e3)})},showfoodslist:function(s){this.foodslist=s,this.showFoodsDetial=!0}},updated:function(){this.scroll(0)},mounted:function(){this.goods=this.$store.state.goods;var s=this.$store.state.sellers;this.deliveryPrice=s.deliveryPrice,this.minPrice=s.minPrice}},l={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return s.goods?a("div",{staticClass:"commodity"},[a("div",{staticClass:"warp"},[a("ul",{staticClass:"menu"},s._l(s.goods,function(t,i){return a("li",{key:i,staticClass:"menu-item border-1px",on:{click:function(t){return s.foodsDetial(i)}}},[a("p",{staticClass:"menu-list"},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.type>0,expression:"item.type>0"}],staticClass:"icon",class:s.suppersClass[t.type]}),s._v(" "),a("span",{staticClass:"text"},[s._v(s._s(t.name))])])])}),0),s._v(" "),a("div",{staticClass:"foods"},s._l(s.goods,function(t,i){return a("div",{key:i,staticClass:"foods-item"},[a("div",{staticClass:"title",attrs:{id:"titleName"}},[s._v(s._s(t.name))]),s._v(" "),a("ul",{staticClass:"foodsList"},s._l(t.foods,function(t,i){return a("li",{key:i,staticClass:"list border-1px"},[a("img",{staticClass:"list-img",attrs:{src:t.image,alt:"商品图片"}}),s._v(" "),a("div",{staticClass:"list-content"},[a("span",{staticClass:"title",on:{click:function(a){return s.showfoodslist(t)}}},[s._v(s._s(t.name))]),s._v(" "),t.description?a("span",{staticClass:"description"},[s._v(s._s(t.description))]):s._e(),s._v(" "),a("span",{staticClass:"saleNum"},[a("span",{staticClass:"num"},[s._v("月售"+s._s(t.sellCount)+"份")]),s._v(" "),a("span",{staticClass:"rate"},[s._v("好评率"+s._s(t.rating)+"%")])]),s._v(" "),a("div",{staticClass:"salePrice"},[a("span",{staticClass:"price"},[a("span",{staticClass:"new"},[a("span",{staticClass:"str"},[s._v("¥")]),s._v(" "),a("span",{staticClass:"money"},[s._v(s._s(t.price))])]),s._v(" "),t.oldPrice?a("span",{staticClass:"old"},[a("span",{staticClass:"str"},[s._v("¥")]),s._v(" "),a("span",{staticClass:"money"},[s._v(s._s(t.oldPrice))])]):s._e()]),s._v(" "),a("v-contorNum",{attrs:{food:t}})],1)])])}),0)])}),0),s._v(" "),a("transition",{attrs:{name:"fade"}},[s.showFoodsDetial?a("v-commodityDetial",{ref:"commoditydetial",attrs:{foods:s.foodslist},on:{goback:function(t){s.showFoodsDetial=!1}}}):s._e()],1)],1)]):s._e()},staticRenderFns:[]};var r=a("VU/8")(c,l,!1,function(s){a("LCmJ")},"data-v-0bbb8f6b",null);t.default=r.exports},yJzk:function(s,t){}});
//# sourceMappingURL=1.39d299364ce9e1a30817.js.map