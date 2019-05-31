<template>
  <div class="Merchant">
    <div class="header">
      <div class="title">
        <div class="merchant-info">
          <P class="title">{{sellers.name}}</P>
          <P class="star">
            <v-star class="starItem" :size="36" :score="sellers.score"></v-star>
            <span class="text1">({{sellers.ratingCount}})</span>
            <span class="text">月售{{sellers.sellCount}}单</span>
          </P>
        </div>
        <div class="collection">
          <span class="icon icon-favorite" :class="{'active':merIsLike}" @click="IsLike"></span>
          <span class="text">收藏</span>
        </div>
      </div>
      <ul class="info">
        <li>
          <p class="text">起送价</p>
          <p class="num">
            <span class="price">20</span>
            <span class="unit">元</span>
          </p>
        </li>
        <li>
          <p class="text">商家配送</p>
          <span class="num">
            <span class="price">20</span>
            <span class="unit">元</span>
          </span>
        </li>
        <li>
          <p class="text">平均配送时间</p>
          <p class="num">
            <span class="price">20</span>
            <span class="unit">元</span>
          </p>
        </li>
      </ul>
    </div>
    <v-pannel class="notice">
      <div slot="header">公告与活动</div>
      <div slot="content">
        <p class="introduce">{{sellers.bulletin}}</p>
        <ul>
          <li v-for="(item,index) in sellers.supports" :key="index">
            <span class="icon" :class="suppersClass[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
    </v-pannel>
    <v-pannel class="scene">
      <div slot="header">商家实景</div>
      <div slot="content">
        <ul>
          <li v-for="(item,index) in sellers.pics" :key="index">
            <img :src="item" alt>
          </li>
        </ul>
      </div>
    </v-pannel>
    <v-pannel class="info">
      <div slot="header">商家信息</div>
      <div slot="content">
        <ul>
          <li v-for="(item,index) in sellers.infos" :key="index">{{item}}</li>
        </ul>
      </div>
    </v-pannel>
  </div>
</template>

<script>
import star from "../star/star";
import pannel from "../slot/pannel";
export default {
  name: "Merchant",
  data() {
    return {
      suppersClass: ["decrease", "discount", "guarantee", "invoice", "special"], // 控制活动标志的类
      sellers: {},
      merIsLike: false // 收藏商家
    };
  },
  components: {
    "v-star": star,
    "v-pannel": pannel
  },
  computed: {},
  methods: {
    IsLike() {
      this.merIsLike = !this.merIsLike;
    }
  },
  mounted() {
    this.sellers = this.$store.state.sellers;
  }
};
</script>

<style lang="less" scoped>
@import "../../common/less/common.less";

.Merchant {
  .header {
    padding: 18px 0;
    > .title {
      margin: 0 18px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      padding-bottom: 18px;
      .merchant-info {
        display: flex;
        flex-direction: column;
        .title {
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 14px;
          margin-bottom: 8px;
          font-weight: 700;
        }
        .star {
          display: flex;
          align-items: center;
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 18px;
          .text1 {
            margin: 0 12px 0 -8px;
          }
        }
      }
      .collection {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          color: rgb(77, 85, 93);
          font-size: 24px;
          line-height: 24px;
          margin-bottom: 4px;
        }
        .active {
          color: rgb(240, 20, 20);
        }
        .text {
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 10px;
        }
      }
    }
    .info {
      display: flex;
      margin: 0 18px;
      margin-top: 18px;

      li {
        flex: 1;
        margin: auto;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child {
          border-right: none;
        }
        .text {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
          margin-bottom: 4px;
        }
        .num {
          font-weight: 200;
          color: rgb(7, 17, 27);
          line-height: 24px;
          font-size: 0;
          .price {
            font-size: 24px;
          }
          .unit {
            font-size: 10px;
          }
        }
      }
    }
  }
  .notice {
    .introduce {
      margin: 8px 12px 16px 12px;
      color: rgb(240, 20, 20);
      line-height: 24px;
      font-weight: 200;
      font-size: 12px;
    }
    ul {
      li {
        padding: 16px 12px;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        display: flex;
        margin: auto;
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: 16px 16px;
          margin-right: 6px;
        }
        .decrease {
          .bg-image("../../assets/img/decrease_4");
        }
        .discount {
          .bg-image("../../assets/img/discount_4");
        }
        .guarantee {
          .bg-image("../../assets/img/guarantee_4");
        }
        .invoice {
          .bg-image("../../assets/img/invoice_4");
        }
        .special {
          .bg-image("../../assets/img/special_4");
        }
        .text {
          font-size: 12px;
          font-weight: 200;
          color: rgb(7, 17, 27);
          line-height: 16px;
        }
      }
    }
  }
  .scene {
    ul {
      display: flex;
      overflow-x: auto;
      li {
        &:not(:last-child) {
          margin-right: 6px;
        }
        img {
          width: 120px;
          height: 90px;
        }
      }
    }
  }
  .info {
    margin-bottom: 47px;
    ul {
      li {
        padding: 16px 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 16px;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
      }
    }
  }
}
</style>
