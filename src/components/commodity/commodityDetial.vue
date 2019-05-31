<template>
  <div class="commodityDetial">
    <img class="foodsImg" :src="foods.image" alt>
    <div class="foodsTitle">
      <p class="title" @click="goback">{{foods.name}}</p>
      <div>
        <p class="sellsInfo">
          <span class="sellscount">月售{{foods.sellCount}}份</span>
          <span class="sellsrating">好评率{{foods.rating}}%</span>
        </p>
        <div class="priceCard">
          <p class="price">
            <span class="new-price">
              <span class="icon">￥</span>
              <span class="text">{{foods.price}}</span>
            </span>
            <span class="old-price" v-if="foods.oldPrice">
              <span class="icon">￥</span>
              <span class="text">{{foods.oldPrice}}</span>
            </span>
          </p>
          <p class="card" v-show="isShowCard" @click="addCard">加入购物车</p>
          <v-contorNum :food="foods" v-show="!isShowCard" ref="contornum"></v-contorNum>
        </div>
      </div>
    </div>
    <div class="foodsInfo" v-if="foods.info">
      <v-pannel>
        <p slot="header">商品介绍</p>
        <p class="foodsItemInfo" slot="content">{{foods.info}}</p>
      </v-pannel>
    </div>
    <div class="foodsComment">
      <v-pannel>
        <p slot="header">商品评论</p>
        <div slot="content">
          <span class="button all" @click="_all">
            <span class="text">全部</span>
            <span class="num">{{all_comment}}</span>
          </span>
          <span class="button best" @click="best">
            <span class="text">推荐</span>
            <span class="num">{{best_comment}}</span>
          </span>
          <span class="button bad" @click="_bad">
            <span class="text">吐槽</span>
            <span class="num">{{bad_comment}}</span>
          </span>
        </div>
      </v-pannel>
      <div class="onlyShow" @click="ShowNotNullContent">
        <span class="check icon-check_circle" :class="{'active':isShowNotNullContent}"></span>
        <span class="text">只看有内容的评论</span>
      </div>
      <ul class="commentList">
        <li class="commentListItem" v-for="(item,index) in ratings" :key="index">
          <div class="dateTime">
            <p class="date">{{dateTime[index]}}</p>
            <p class="user">
              {{item.username}}
              <img class="user-avatar" :src="item.avatar" alt>
            </p>
          </div>
          <div class="comment">
            <span
              class="icon icon-thumb_up"
              :class="{'like':foods.ratings[index].islike}"
              @click="isOrNoLike(index)"
            ></span>
            <span class="text">{{item.text}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pannel from "../slot/pannel";
import contorNum from "../shopCard/contorNum";
export default {
  name: "commodityDetial",
  props: ["foods"],
  data() {
    return {
      isShowNotNullContent: false, // 用于传递给详情页面是否展示没有内容的评论
      rateType: "-1",
      all_comment: 0, // 全部评论
      best_comment: 0, //推荐评论
      bad_comment: 0 //吐槽评论
    };
  },
  components: {
    "v-pannel": pannel,
    "v-contorNum": contorNum
  },
  computed: {
    // 是否展示加入购物车按钮
    isShowCard() {
      if (!this.foods.count) {
        return true;
      } else {
        return false;
      }
    },
    // 时间戳，转换日期
    dateTime() {
      let dataTimer = this.foods.ratings;
      let times = [];
      function add0(m) {
        return m < 10 ? "0" + m : m;
      }
      dataTimer.map((item, index) => {
        let time = new Date(item.rateTime);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDay();
        let hour = time.getHours();
        let min = time.getMinutes();
        times.push(`${year}-${add0(month)}-${add0(day)} ${hour}:${min}`);
      });
      return times;
    },
    ratings() {
      let allnum = 0;
      let bestnum = 0;
      let badnum = 0;
      let allList = [];
      let bestList = [];
      let badList = [];
      let list = [];
      let type;
      this.foods.ratings.map((item, index) => {
        if (item.text !== "") {
          list.push(item);
        }
        type = item.rateType;
        switch (type) {
          case 0:
            allList.push(item);
            allnum++;
            break;
          case 1:
            bestList.push(item);
            bestnum++;
            break;
          case 2:
            badList.push(item);
            badnum++;
            break;
        }
      });
      this.all_comment = allnum;
      this.best_comment = bestnum;
      this.bad_comment = badnum;
      if (this.rateType == "0") {
        return allList;
      } else if (this.rateType == "1") {
        return bestList;
      } else if (this.rateType == "2") {
        return badList;
      } else if (!this.isShowNotNullContent) {
        return this.foods.ratings;
      } else {
        return list;
      }
    }
  },
  methods: {
    /**
     * @method addCard
     * @param no
     * @returns 隐藏按钮，增加数量
     * @desc
     */
    addCard() {
      this.isShowCard = false;
      this.$refs.contornum.add();
    },
    /**
     * @method goback
     * @param no
     * @returns
     * @desc
     */
    goback() {
      this.$emit("goback");
    },
    /**
     * @method isOrNoLike
     * @param {index}评论的索引
     * @returns
     * @desc index等于几就给几点赞
     */
    isOrNoLike(index) {
      let item = this.foods.ratings[index];
      if (!item.islike) {
        this.$set(item, "islike", true);
      } else {
        this.$set(item, "islike", false);
      }
    },
    /**
     * @method ShowNotNullContent
     * @param no
     * @returns
     * @desc 控制只显示有内容的评论的按钮样式
     */
    ShowNotNullContent() {
      this.rateType = -1;
      // this.$set(this.isShowNotNullContent,!this.isShowNotNullContent)
      this.isShowNotNullContent = !this.isShowNotNullContent;
    },
    /**
     * @method noShowNotNullContent
     * @param no
     * @returns
     * @desc 用来重置，，，保证每次打开详情页，都是展示所有评论
     */
    noShowNotNullContent() {
      this.isShowNotNullContent = false;
    },
    _all() {
      this.isShowNotNullContent = false;
      this.rateType = "0";
    },
    best() {
      this.isShowNotNullContent = false;
      this.rateType = "1";
    },
    _bad() {
      this.isShowNotNullContent = false;
      this.rateType = "2";
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.commodityDetial {
  font-size: 10px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 47px;
  width: 100%;
  z-index: 1;
  background-color: #fff;
  overflow: auto;
  .foodsImg {
    width: 100%;
    height: 375px;
  }
  .foodsTitle {
    padding: 18px;
    background-color: #fff;
    .title {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .sellsInfo {
      font-size: 0;
      margin-bottom: 18px;
      color: rgb(147, 153, 159);
      line-height: 10px;
      .sellscount {
        font-size: 10px;
        display: inline-block;
        margin-right: 12px;
      }
      .sellsrating {
        font-size: 10px;
      }
    }
    .priceCard {
      display: flex;
      justify-content: space-between;
      //   margin: auto;
      //   font-size: 0;
      .price {
        font-weight: normal;
        line-height: 24px;
        font-size: 0;
        .new-price {
          font-size: 0px;
          color: rgb(240, 20, 20);
          display: inline-block;
          margin-right: 12px;
          .icon {
            font-size: 10px;
          }
          .text {
            font-size: 14px;
            font-weight: 700;
          }
        }
        .old-price {
          font-size: 0px;
          display: inline-block;
          color: rgb(147, 153, 159);
          text-decoration: line-through;
          .text {
            font-size: 10px;
            font-weight: 700;
          }
          .icon {
            font-size: 10px;
          }
        }
      }
      .card {
        height: 24px;
        padding: 6px 12px;
        border-radius: 12px;
        background-color: rgb(0, 160, 220);
        color: #fff;
        font-size: 10px;
        line-height: 12px;
      }
    }
  }
  .foodsInfo {
    .foodsItemInfo {
      padding: 0 8px;
      font-size: 12px;
      font-weight: 200;
      line-height: 24px;
      color: rgb(77, 85, 93);
    }
  }
  .foodsComment {
    font-size: 0;
    .button {
      display: inline-block;
      margin-top: 12px;
      padding: 8px 12px;
      border-radius: 1px;
    }
    .text {
      font-size: 12px;
    }
    .num {
      font-size: 8px;
    }
    .all {
      color: #fff;
      background-color: rgb(0, 160, 220);
    }
    .best {
      color: rgb(77, 85, 93);
      background-color: rgba(0, 160, 220, 0.2);
      margin: 0 8px;
    }
    .bad {
      color: rgb(77, 85, 93);
      background-color: rgba(77, 85, 93, 0.2);
    }
    .onlyShow {
      margin: 0 18px;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      padding: 12px 0;
      color: rgb(147, 153, 159);
      line-height: 24px;
      display: flex;
      .check {
        font-size: 24px;
        margin-right: 4px;
      }
      .active {
        color: rgb(0, 160, 220);
      }
      .text {
        font-size: 12px;
      }
    }
    .commentList {
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      .commentListItem {
        padding: 16px 0;
        margin: 0 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child {
          border-bottom: none;
        }
        .dateTime {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 12px;
          display: flex;
          justify-content: space-between;
          .user-avatar {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-left: 6px;
          }
        }
        .comment {
          margin-top: 6px;
          .text {
            font-size: 12px;
            color: rgba(7, 17, 27, 1);
            line-height: 16px;
          }
          .icon {
            font-size: 12px;
            color: rgb(147, 153, 159);
            line-height: 23px;
            margin-right: 4px;
          }
          .like {
            color: rgb(0, 160, 220);
          }
        }
      }
    }
  }
}
</style>
