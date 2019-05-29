<template>
  <div class="header">
    <!-- 头部内容区域 -->
    <div class="header-content">
      <div class="header-awatar">
        <img class="header-awatar-img" :src="headerData.avatar" alt="头像">
        <div class="header-awatar-info">
          <p class="header-awatar-info-name">
            <span class="header-awatar-info-nameImg"></span>
            <span class="header-awatar-info-nameText">{{headerData.name}}</span>
          </p>
          <p
            class="header-awatar-info-description"
          >{{headerData.description}}/{{headerData.deliveryTime}}分钟送达</p>
          <p class="header-awatar-info-supports" v-if="headerData.supports">
            <!--v-if的作用就是当app组件请求接口的同时，
            就执行了headerData.supports[0]['description']的操作，
            所以当没有获取到数据的时候，
            就会报错，
            所以加一个判断条件-->
            <span
              :class="[suppersClass[headerData.supports[0]['type']]]"
              class="header-awatar-info-supportsImg"
            ></span>
            <span class="header-awatar-info-supportsText">{{headerData.supports[0]['description']}}</span>
          </p>
        </div>
        <div class="header-count" v-if="headerData.supports" @click="showDetial">
          <span class="header-count-num">{{headerData.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
    <!-- 头部公告区域 -->
    <div class="header-notice">
      <p class="header-notice-img"></p>
      <!-- <img src="../../assets/img/bulletin@2x.png" alt="公告"> -->
      <p class="header-notice-bulletin">{{headerData.bulletin}}</p>
      <p class="icon-keyboard_arrow_right"></p>
    </div>
    <!-- 背景部分 -->
    <div class="background">
      <img :src="headerData.avatar" alt="背景">
    </div>
    <!-- 浮层部分 -->
    <transition name="fade">
      <div class="countFloat" v-show="showCountFloat">
        <!-- <div class="background"></div> -->
        <div class="content clearfix">
          <div class="content-main">
            <!-- 标题 -->
            <div class="title">{{headerData.name}}</div>
            <!-- 评分star -->
            <v-star :size="48" :score="headerData.score"></v-star>
            <!-- 优惠信息 -->
            <div class="saleInfo">
              <div class="title">
                <div class="boder"></div>
                <div class="text">优惠信息</div>
                <div class="boder"></div>
              </div>
              <ul class="saleList">
                <li v-for="(item , index) in headerData.supports" :key="index">
                  <span
                    :class="[suppersClass[item['type']]]"
                    class="header-awatar-info-supportsImg"
                  ></span>
                  <span>{{item.description}}</span>
                </li>
              </ul>
            </div>
            <!-- 商家公告 -->
            <div class="sellerNotice">
              <div class="title">
                <div class="boder"></div>
                <div class="text">商家公告</div>
                <div class="boder"></div>
              </div>
              <p class="sellerNotice-content">{{headerData.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="close">
          <span class="icon-close" @click="hideDetial"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from "../star/star";
export default {
  name: "Header",
  props: ["headerData"],
  data() {
    return {
      suppersClass: ["decrease", "discount", "guarantee", "invoice", "special"],
      showCountFloat: false
    };
  },
  components: {
    "v-star": star
  },
  computed: {},
  methods: {
    showDetial() {
      this.showCountFloat = true;
    },
    hideDetial() {
      this.showCountFloat = false;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "../../common/less/common.less";
.header {
  position: relative;
  background-color: rgba(7, 17, 27, 0.5);
  // 内容区域
  .header-content {
    padding: 24px 0 18px 24px;
    box-sizing: border-box;
    position: relative;
    // 头像部分
    .header-awatar {
      display: flex;
      color: rgb(255, 255, 255);
      // 头像
      .header-awatar-img {
        width: 64px;
        height: 64px;
        border-radius: 2px;
        margin-right: 16px;
      }
      // 商家信息
      .header-awatar-info {
        margin: 2px 0;
        width: calc(100% - 104px);
        // 商家名字
        .header-awatar-info-name {
          line-height: 18px;
          display: flex;
          align-items: center;
          .header-awatar-info-nameImg {
            margin-right: 6px;
            display: inline-block;
            height: 18px;
            width: 30px;
            .bg-image("../../assets/img/brand");
            background-size: 30px 18px;
          }
          .header-awatar-info-nameText {
            display: inline-block;
            width: calc(100% - 21px);
            .ellipsis;
            font-size: 16px;
            font-weight: bold;
          }
        }
        // 商家介绍
        .header-awatar-info-description {
          font-weight: 200;
          line-height: 12px;
          font-size: 12px;
          margin: 8px 0 10px 0;
          width: calc(100% - 0px);
          .ellipsis;
        }
        // 商家活动
        .header-awatar-info-supports {
          display: flex;
          align-items: center;
          .header-awatar-info-supportsImg {
            margin-right: 4px;
            display: inline-block;
            height: 12px;
            width: 12px;
            background-size: 12px 12px;
          }
          .decrease {
            .bg-image("../../assets/img/decrease_1");
          }
          .discount {
            .bg-image("../../assets/img/discount_1");
          }
          .guarantee {
            .bg-image("../../assets/img/guarantee_1");
          }
          .invoice {
            .bg-image("../../assets/img/invoice_1");
          }
          .special {
            .bg-image("../../assets/img/special_1");
          }
          .header-awatar-info-supportsText {
            font-weight: 200;
            line-height: 12px;
            font-size: 10px;
            display: inline-block;
            width: calc(100% - 48px);
            .ellipsis;
          }
        }
      }
    }
    // 活动个数
    .header-count {
      position: absolute;
      bottom: 14px;
      right: 12px;
      display: flex;
      align-items: center;
      font-size: 10px;
      color: rgb(255, 255, 255);
      font-weight: 200;
      line-height: 24px;
      padding: 0 8px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 14px;
      .header-count-num {
        margin-right: 2px;
      }
    }
  }
  // 公告区域
  .header-notice {
    height: 28px;
    background: rgba(7, 17, 27, 0.2);
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 10px;
    font-weight: 200;
    .header-notice-img {
      height: 12px;
      width: 22px;
      .bg-image("../../assets/img/bulletin");
      background-size: 22px 12px;
    }
    .header-notice-bulletin {
      width: calc(100% - 42px);
      .ellipsis;
      margin: 0 4px;
    }
  }
  // 背景部分
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // width: 100%;
    // height: 100%;
    z-index: -1;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      filter: blur(10px);
      transform: scale(1.2);
    }
  }
  // 浮层部分
  .countFloat {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    // filter: blur(2px);
    z-index: 5;
    background-color: rgba(7, 17, 27, 0.8);
    backdrop-filter: blur(10px);
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    // 文字
    .content {
      min-height: 100%;
      width: 100%;
      .content-main {
        margin-top: 64px;
        padding-bottom: 64px;
        margin-left: 36px;
        margin-right: 36px;
        color: rgb(255, 255, 255);
        // 标题
        .title {
          width: 100%;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          line-height: 16px;
        }
        // 优惠信息\商家公告
        .saleInfo,
        .sellerNotice {
          width: 100%;
          .title {
            display: flex;
            align-items: center;
            .boder {
              flex: 1;
              height: 1px;
              background-color: rgba(255, 255, 255, 0.2);
            }
            .text {
              padding: 0 12px;
              box-sizing: border-box;
              font-size: 14px;
              font-weight: 700;
              line-height: 14px;
            }
          }
          .saleList {
            margin: 24px 12px 28px 12px;
            font-size: 12px;
            font-weight: 200;
            color: rgb(255, 255, 255);
            li {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              line-height: 12px;
              .header-awatar-info-supportsImg {
                margin-right: 4px;
                display: inline-block;
                height: 16px;
                width: 16px;
                background-size: 16px 16px;
              }
              .decrease {
                .bg-image("../../assets/img/decrease_2");
              }
              .discount {
                .bg-image("../../assets/img/discount_2");
              }
              .guarantee {
                .bg-image("../../assets/img/guarantee_2");
              }
              .invoice {
                .bg-image("../../assets/img/invoice_2");
              }
              .special {
                .bg-image("../../assets/img/special_2");
              }
            }
          }
          .sellerNotice-content {
            margin: 24px 12px 28px 12px;
            font-size: 12px;
            font-weight: 200;
            color: rgb(255, 255, 255);
            line-height: 24px;
          }
        }
      }
    }
    .close {
      // position: relative;
      width: 28px;
      height: 28px;
      margin: -64px auto 0 auto;
      // clear: both;
      font-size: 32px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
