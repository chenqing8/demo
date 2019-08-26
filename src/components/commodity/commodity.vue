<template>
  <div class="commodity" v-if="goods">
    <div class="warp">
      <ul class="menu">
        <li
          class="menu-item border-1px"
          v-for="(item,index) in goods"
          :key="index"
          @click="foodsDetial(index)"
        >
          <p class="menu-list">
            <span v-show="item.type>0" :class="suppersClass[item.type]" class="icon"></span>
            <span class="text">{{item.name}}</span>
          </p>
        </li>
      </ul>
      <div class="foods">
        <div class="foods-item" v-for="(item,index) in goods" :key="index">
          <div class="title" id="titleName">{{item.name}}</div>
          <ul class="foodsList">
            <li class="list border-1px" v-for="(list,id) in item.foods" :key="id">
              <img class="list-img" :src="list.image" alt="商品图片">
              <div class="list-content">
                <span class="title" @click="showfoodslist(list)">{{list.name}}</span>
                <span class="description" v-if="list.description">{{list.description}}</span>
                <span class="saleNum">
                  <span class="num">月售{{list.sellCount}}份</span>
                  <span class="rate">好评率{{list.rating}}%</span>
                </span>
                <div class="salePrice">
                  <span class="price">
                    <span class="new">
                      <span class="str">¥</span>
                      <span class="money">{{list.price}}</span>
                    </span>
                    <span class="old" v-if="list.oldPrice">
                      <span class="str">¥</span>
                      <span class="money">{{list.oldPrice}}</span>
                    </span>
                  </span>
                  <v-contorNum :food="list"></v-contorNum>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品详情 -->
      <transition name="fade">
        <v-commodityDetial
          :foods="foodslist"
          v-if="showFoodsDetial"
          @goback="showFoodsDetial=false"
          ref="commoditydetial"
        ></v-commodityDetial>
      </transition>
    </div>
  </div>
</template>

<script>
import contorNum from "../shopCard/contorNum";
import commodityDetial from "../commodity/commodityDetial";
export default {
  name: "commodity",
  data() {
    return {
      goods: [], // 商品数据
      suppersClass: ["decrease", "discount", "guarantee", "invoice", "special"], // 控制活动标志的类
      deliveryPrice: "", // 配送费
      minPrice: "", // 起送费
      showFoodsDetial: false, // 展示商品详情页
      foodslist: {} // 商品详情信息
    };
  },
  components: {
    "v-contorNum": contorNum,
    "v-commodityDetial": commodityDetial
  },
  computed: {},
  methods: {
    /**
     * @method scroll
     * @param no
     * @returns
     * @desc 滚动右侧商品，对应左侧高亮
     */
    scroll(inx) {
      let titleNames = $(".foods>.foods-item");
      let menus = $(".menu-item");
      let index = 0;
      menus.eq(0).addClass("active");
      $(".foods").scroll(() => {
        this.$nextTick(() => {
          if (
            $(".foods").scrollTop() >=
            titleNames.eq(index)[0].offsetTop - 1
          ) {
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
          } else {
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
    },
    /**
     * @method foodsDetial
     * @param {index} 索引
     * @returns 返回menu对应索引的foodslist
     * @desc 点击menu的item右边展示对应的foodslist
     */
    foodsDetial(index) {
      this.$nextTick(() => {
        let titleNames = $(".foods>.foods-item");
        let sTop = titleNames.eq(index)[0].offsetTop;
        $(".foods").animate({ scrollTop: sTop }, 1000);
      });
    },
    /**
     * @method showfoodslist
     * @param {list} 每一列商品的详细信息
     * @returns
     * @desc 把商品信息赋值给foodslist
     */
    showfoodslist(list) {
      this.foodslist = list;
      this.showFoodsDetial = true;
    }
  },
  updated() {
    this.scroll(0);
  },
  mounted() {
    this.goods = this.$store.state.goods;
    let sellers = this.$store.state.sellers;
    this.deliveryPrice = sellers.deliveryPrice;
    this.minPrice = sellers.minPrice;
  }
};
</script>
<style lang="less" scoped>
@import "../../common/less/common.less";
.commodity {
  .warp {
    width: 100%;
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 47px;
    font-size: 0;
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
    .fade-enter-to,
    .fade-leave {
      opacity: 1;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: all 0.4s ease-in-out;
    }
    .menu {
      overflow: auto;
      .menu-item {
        // display: table;
        display: flex;
        width: 80px;
        height: 56px;
        line-height: 14px;
        background: #f3f5f7;
        padding: 0 12px;
        box-sizing: border-box;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          &::after {
            display: none;
          }
        }
        .menu-list {
          // display: table-cell;
          // vertical-align: middle;
          margin: auto;
          font-size: 0;
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-size: 12px 12px;
            margin-right: 2px;
          }
          .decrease {
            .bg-image("../../assets/img/decrease_3");
          }
          .discount {
            .bg-image("../../assets/img/discount_3");
          }
          .guarantee {
            .bg-image("../../assets/img/guarantee_3");
          }
          .invoice {
            .bg-image("../../assets/img/invoice_3");
          }
          .special {
            .bg-image("../../assets/img/special_3");
          }
          .text {
            font-size: 12px;
            color: #000;
          }
        }
      }
      .active {
        background-color: #fff;
      }
    }
    .foods {
      flex: 1;
      overflow: auto;
      .foods-item {
        > .title {
          font-size: 12px;
          line-height: 26px;
          color: rgb(147, 153, 159);
          background-color: #f3f5f7;
          border-left: 3px solid #d9dde1;
          padding-left: 14px;
        }
        .foodsList {
          .list {
            margin: 0 18px;
            padding: 18px 0;
            display: flex;
            .border-1px(rgba(7, 17, 27, 0.1));
            &:last-child {
              &::after {
                display: none;
              }
            }
            .list-img {
              margin-right: 10px;
              width: 57px;
              height: 57px;
            }
            .list-content {
              display: flex;
              flex-direction: column;
              flex: 1;
              .title {
                font-size: 14px;
                color: rgba(7, 17, 27, 1);
                line-height: 14px;
                margin-top: 2px;
              }
              .description {
                margin-top: 8px;
                font-size: 10px;
                color: rgb(147, 153, 159);
                line-height: 10px;
              }
              .saleNum {
                margin-top: 8px;
                font-size: 0px;
                color: rgb(147, 153, 159);
                line-height: 10px;
                .num {
                  margin-right: 12px;
                  font-size: 10px;
                }
                .text {
                  font-size: 10px;
                }
              }
              .salePrice {
                font-weight: 700;
                line-height: 24px;
                display: flex;
                justify-content: space-between;
                .new {
                  color: #f01414;
                  margin-right: 8px;
                  .str {
                    font-size: 10px;
                    font-weight: normal;
                  }
                  .money {
                    font-size: 14px;
                  }
                }
                .old {
                  color: rgb(147, 153, 159);
                  text-decoration-line: line-through;
                  .str {
                    font-size: 10px;
                    font-weight: normal;
                  }
                  .money {
                    font-size: 10px;
                    font-weight: 700;
                  }
                }
                .num {
                  display: flex;
                  align-items: center;
                  .icon {
                    font-size: 14px;
                    color: rgb(0, 160, 220);
                    line-height: 24px;
                  }
                  .text {
                    display: inline-block;
                    width: 24px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                    text-align: center;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
