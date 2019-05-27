# demo

> 点餐系统

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## ==============图表字体============================
将设计师给的svg图片上传至icomoonAPP中转化为字体图表，然后按照正常的流程走就是了。把fonts目录拷贝到项目中，然后把style.css拷贝到目录中，然后使用就行了。

## =============浮层页==============================
 1.标题利用flex布局实现的
 2.line-height无效，可能需要给文本添加line-height，，span和p 都能设置。
 3.动画：不生效，，，，为什么呢？

 4.blur值越大，就会出现白色阴影，？
   **解决办法：**
   给图片添加  
      filter: blur(10px);
      transform: scale(1.2);

## ===============商品页（问题及解决办法）===========================
 1. 怎么让多行文本垂直居中？
    **解决办法：**
    用table-ceil,必须给想要剧中的父级元素设置table的属性，子元素设置table-ceil和居中对齐。
    `注意：`如果子元素有多个就需要用一个元素包裹起来，然后给包裹元素设置刚刚的属性
    **還可以用flex** 然後子元素設置``margin：auto``然後就實現了上下左右垂直居中的問題；
 2. 学会使用固定和自适应：
   ` flex：1`；就可以达到自适应,和`width：100%`是一样的

 3. 当元素之间有空白间隙？
    **解决办法：**
    `font-size: 0;`,`然后必须给两个元素分别设置font-size: 0;  `才可以
 4. 兄弟组件间通信问题？想在app组件中查到的值直接传给shopcard组件，而不用再次请求接口
 5. 给数组或者对象的值进行修改页面却不会进行渲染？
    **解决办法：**
    必须通过this.$set(数组或者对象,新的值)；这样页面才能重新渲染