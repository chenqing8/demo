<template>
  <div class="commodity" v-if="goods">
    <div class="warp">
      <ul class="menu">
        <li class="menu-item border-1px" v-for="(item,index) in goods" :key="index">
          <p class="menu-list">
            <span v-show="item.type>0" :class="suppersClass[item.type]" class="icon"></span>
            <span class="text">{{item.name}}</span>
          </p>
        </li>
      </ul>
      <div class="foods">
        <div class="foods-item" v-for="(item,index) in goods" :key="index">
          <div class="title" id="title">{{item.name}}</div>
          <ul class="foodsList">
            <li class="list border-1px" v-for="(list,id) in item.foods" :key="id">
              <img class="list-img" :src="list.image" alt="商品图片">
              <div class="list-content">
                <span class="title">{{list.name}}</span>
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
                  <v-contorNum :num="num" :ids="index+'-'+id" :goods="goods" :shopcardsId="shopcardsId" :shopCardList="shopCardList" @getshopCardList="getshopCardList"></v-contorNum>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer">
      <v-shopcard  :num="num"  :goods="goods" :shopcardsId="shopcardsId"  :minPrice="minPrice" :deliveryPrice="deliveryPrice" :shopCardList="shopCardList"></v-shopcard>
    </div>
  </div>
</template>

<script>
import shopCard from "../shopCard/shopCard";
import contorNum from "../shopCard/contorNum";
export default {
  name: "commodity",
  data() {
    return {
      goods: [],
      suppersClass: ["decrease", "discount", "guarantee", "invoice", "special"],
      num: [], // 保存每个商品选中的个数
      shopCardList: [], // 选中的商品list
      deliveryPrice: "", // 配送费
      minPrice: "", // 起送费
      shopcardsId:[],
    };
  },
  components: {
    "v-shopcard": shopCard,
    "v-contorNum": contorNum,
  },
  computed: {},
  methods: {
    /**
     * @method add
     * @param {index}:menu的索引
     * @param {id}:foods的索引
     * @returns
     * @desc 找到当前索引的foods，把它添加在shopCardList,并且改变num中的数量
     */
    add(index, id) {
      // 改变数组的值，不会渲染页面刷新，只有通过这两种方式才可以：
      // this.$set(this.num[index],id,this.num[index][id]+1);
      this.num[index].splice(id,1, this.num[index][id]+1);
      let ids=this.shopcardsId.indexOf(index+""+id);      
      if(ids>=0){
        this.shopCardList[ids].count++;
      }else{
         this.shopcardsId.push(index+""+id);
         this.shopCardList.push({
           id:index+"-"+id,
          count: this.num[index][id],
          price: this.goods[index]["foods"][id]["price"],
          name: this.goods[index]["foods"][id]["name"]
        });
      }
    },
    getshopCardList(data,data1){
      this.shopCardList=data;
      this.shopcardsId=data1;
    }
  },
  mounted() {
    this.$http.get("/goods").then(res => {
      if (res.status === 200) {
        this.goods = res.data;
        let Num = [];
        res.data.map((item, index) => {
          let num = [];
          item.foods.map((item1, index1) => {
            num.push(0);
          });
          Num.push(num);
        });
        this.num = Num;
      }
    });
    this.$http.get("/sellers").then(res => {
      if (res.status === 200) {
        this.deliveryPrice = res.data.dataList[0].deliveryPrice;
        this.minPrice = res.data.dataList[0].minPrice;
      }
    });
    console.log('==========',$("#title"));
    
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
