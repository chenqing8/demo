<template>
  <div class="card">
    <div class="shopCard">
    <!-- 购物车标志 -->
    <div class="outCard" @click="showSopCard">
      <div class="inCard" :class="[total[1]>0?'inCardAct':'']">
        <span class="icon-shopping_cart"></span>
        <span class="icon-shopping_count" v-if="total[1]>0">{{total[1]}}</span>
      </div>
    </div>
    <!-- 金额 -->
    <div class="moeny">
      <span class="total">¥{{total[0]}}</span>
      <span class="mark">另需配送费¥{{deliveryPrice}}元</span>
    </div>
    <!-- button -->
    <div class="button bg" v-if="diffMony<=0" @click="pay">去结算</div>
    <div class="button" v-else><span v-if="total[1]>0">还差</span>¥{{diffMony}}起送</div>

    </div>
    <!-- 购物车商品列表-->
    <div class="background" v-show="showCardList" @click="showCardList=false;"></div>
    <div class="shopCardList" v-show="showCardList">
      <div class="title"> 
        <span>购物车</span>
        <span class="clear" @click="clear">清空</span>
      </div>
      <div class="list">
        <div class="list-item" v-for="(item,index) in shopCardList" :key="index">
          <div class="list-item-title">{{item.name}}</div>
          <div class="list-item-num">
            <span><span class="icon">￥</span>{{item.count*item.price}}</span>
            <v-contorNum :num="num" :ids="item.id" :goods="goods" :shopcardsId="shopcardsId" :shopCardList="shopCardList" @getshopCardList="getshopCardList"></v-contorNum>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contorNum from "../shopCard/contorNum";
export default {
  name: "shopCard",
  props: ["deliveryPrice", "minPrice", "shopCardList","num","goods","shopcardsId"],
  data() {
    return {
      showCardList:false
    };
  },
  components: {
    "v-contorNum": contorNum,
  },
  computed: {
    total(){
      let sum = 0;
      let count = 0;
      this.shopCardList.map((item, index)=>{
        sum += item.count*item.price;
        count += item.count;
      });
      return [sum,count];
    },
    diffMony(){
      return (this.minPrice - this.total[0]);
    },
    index1(num){
      let [index,id]=this.shopCardList[num].id.split("-");
      return [index,id];
},
  },
  methods: {

    pay(){},
    showSopCard(){
this.showCardList=!this.showCardList;
    },
    getshopCardList(data,data1){
      this.shopCardList=data;
      this.shopcardsId=data1;
    },
    clear(){
let length=this.shopCardList.length;
this.shopCardList.map((item,index)=>{  
  let ids=item.id.split("-");
  this.num[Number(ids[0])].splice(Number(ids[1]),1,0);
  if(this.shopCardList.length-1===index){
  this.shopCardList.splice(0,length);
  this.shopcardsId.splice(0,length);
  }
})    
       }
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
.card{
    font-size: 0;
  .shopCard {
    height: 47px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: #141d27;
    display: flex;
    z-index: 4;
    //   购物车标志
    .outCard {
      position: absolute;
      bottom: 4px;
      left: 12px;
      width: 57px;
      height: 57px;
      background-color: #141d27;
      border-radius: 50%;
      display: flex;
      .inCard {
        display: flex;
        margin: auto;
        width: 44px;
        height: 44px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        .icon-shopping_cart {
          margin: auto;
          font-size: 24px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 28px;
        }
        
        .icon-shopping_count{
          position: absolute;
          top: 0;
          left:32px;
          padding: 0 6px;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0px  rgba(0, 0, 0, 0.4);
          display: inline-block;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          line-height: 16px;
          border-radius: 6px;
        }
      }
            .inCardAct{
        background-color: rgba(0,160,220);
          .icon-shopping_cart{
            color: rgba(255, 255, 255);
        }
        }

    }
    //   moeny
    .moeny {
      flex: 1;
      padding-left: 80px;
      margin: 12px 0;
      margin-right: 12px;
      // margin: auto;
      color: rgba(255, 255, 255, 0.4);
      line-height: 24px;
      .mark {
        font-size: 16px;
        display: inline-block;
        padding-left: 12px;
      }
      .total {
        font-size: 16px;
        font-weight: 700;
        display: inline-block;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
    // button
    .button {
      width: 105px;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: 700;
      font-size: 14px;
      line-height: 24px;
      padding: 11px 8px;
      text-align: center;
      color: rgba(255, 255, 255, 0.4);
    }
    .bg{
      background-color: rgba(4, 121, 10);
      color:#fff;
    }
  }
  // 背景
  .background{
    position: fixed;
    top: 0%;
    bottom: 0;
    left: 0;;
    right: 0;
    z-index:0;
    background: rgba(7, 17, 27, .6);
    backdrop-filter: blur(10px);
  }
  .shopCardList{
    z-index: 1;
    position: fixed;
    bottom: 47px;
    width:100%;
    background-color: #fff;
    .title{
      background-color: #f3f5f7;
      height:40px;
      padding: 0 18px;
      border-bottom: 1px solid rgba(7,17,27,.1);
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 200;
      color:rgba(7,17,27);
      line-height: 40px;
      .clear{
        font-size: 12px;
        color:rgb(0, 160, 220);
        line-height: 40px;
      }
    }
    .list{
       max-height:215px;
        overflow: auto;
    padding-bottom:20px;

      .list-item{
        padding: 12px 0;
        margin:0 18px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(7, 17, 27, .1);;
        .list-item-title{
            font-size: 14px;
            color:rgb(7,17,27);
            line-height: 24px;
        }
        .list-item-num{
            font-size: 14px;
            display: flex;
            align-items: center;
          >span{
            display: inline-block;
            font-weight: 700;
            color:#F00;
            line-height: 24px;
            margin: 0 12px 0 18px;
            .icon{
              font-size:10px;
            }
          }
        }
      }
    }
  }  
}
</style>
