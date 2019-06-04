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
 1.标题利用flex布局实现的<br>
 2.line-height无效，可能需要给文本添加line-height，，span和p 都能设置。<br>
 3.动画：不生效，，，，为什么呢？<br>
    **解决办法**
    ```
    .fade-enter,
    .fade-enter-to{
      opacity: 0;
    }
    .fade-enter-to,
    .fade-leave {
      opacity: 0.6;
      transform: translateX(-5px);
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: all .3s ease;
    }
    ```
 4.blur值越大，就会出现白色阴影，？<br>
   ***解决办法：***<br>
   给图片添加  <br>
      filter: blur(10px);
      transform: scale(1.2);

## ===============商品页（问题及解决办法）===========================
 1. ***怎么让多行文本垂直居中？***<br>
    ***解决办法：***<br>
    用table-ceil,必须给想要剧中的父级元素设置table的属性，子元素设置table-ceil和居中对齐。<br>
    `注意：`如果子元素有多个就需要用一个元素包裹起来，然后给包裹元素设置刚刚的属性<br>
    **還可以用flex** 然後子元素設置``margin：auto``然後就實現了上下左右垂直居中的問題；<br>
 2. **学会使用固定和自适应**：<br>
   ` flex：1`；就可以达到自适应,和`width：100%`是一样的<br>

 3. **当元素之间有空白间隙？**<br>
    ***解决办法：***<br>
    `font-size: 0;`,`然后必须给两个元素分别设置font-size: 0;  `才可以<br>
 4. **兄弟组件间通信问题？**想在app组件中查到的值直接传给shopcard组件，而不用再次请求接口<br>
 5. **给数组或者对象的值进行修改页面却不会进行渲染？**<br>
    ***解决办法：***<br>
    必须通过this.$set(数组或者对象,新的值)；这样页面才能重新渲染<br>
 6. **加入购物车以及购物车列表功能**<br>
    ***思路1：给购物车组件传递当前的foods数据（只有一条）***<br>
    1. 增加商品。<br>
    2. 判断该商品是否有count字段。<br>
    3. 没有就给她加一个字段，有就++。<br>
    4. 遍历商品的数据，，取出带有count的，push到另一个数组里面去<br>
    5. 然后显示在购物车列表中<br>
    ***思路2：给购物车组件传递所有的foods数据***<br>
    1. 事先遍历一个count数组用来装，商品列表中选择商品的数量。<br>
    1. 增加商品<br>
    2. 把加入购物车的商品push到一个新的列表中，，需要有一个字段表示这个数据的索引值<br>
    3. 根据索引值修改count数组和goods对应索引的值<br>
 7. **商品页面滚动监控？(用插件better-scroll来实现)**<br>
    1.点击menuitem,foods会滚动到相应的位置，但是menuitem不会对于应在相应的位置上，推测：在滚动的时候就算没有执行scroll方法，但是也经过了jq自带的scroll函数的，所以改变了index的值。？<br>
    2.找到了问题：当我点击某个item的时候，`$(".foods").scrollTop()`会逐渐增加，在中途就会出现`if`判断为false的时候，，就会执行` index = index - 1;`,所以导致问题出现。<br>
    ***解决办法：***<br>
    就是在`titleNames.eq(index)[0].offsetTop`的基础上`-1`,我也还没搞清楚原理，，，不知道为什么减了一就可以了<br>
    ```
     $(".foods").scroll(() => {
        this.$nextTick(() => {
          if ($(".foods").scrollTop() >= titleNames.eq(index)[0].offsetTop-1) {
            menus
              .eq(index)
              .addClass("active")
              .siblings()
              .removeClass("active");
            if (index < titleNames.length - 1) {
              index = index + 1;
            } else {
              index = titleNames.length - 1;
            }
          }  else {
            if (index > 0) {
              index = index - 1;
            } else {
              index = 0;
            }
            menus
              .eq(index)
              .addClass("active")
              .siblings()
              .removeClass("active");
          }
        });
      });
    ```
8. **点赞，点那个亮哪个？**<br>
    问题就是，不可能有几个item 就用几个变量控制他的class吧<br>
    ***解决办法：***<br>
   1. jquery，增删class
   2. 通过给对象字段（没有就增加），根据是否那那个字段或者字段的true or false 来弄
   ```
    isOrNoLike(index) {
        let item=this.foods.ratings[index];
        console.log(item);
        if(!item.islike){
            this.$set(item,"islike",true)
        }else{
            this.$set(item,"islike",false)            
        }
        console.log(item);
    },
   ```
 9. 
 