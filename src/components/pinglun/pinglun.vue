<template>
  <div class="pinglun">
    <div class="header">
      <div class="left">
        <p class="num">{{total}}</p>
        <p class="text">综合评分</p>
        <p class="smallText">高于周边商家{{rankRate}}%</p>
      </div>
      <div class="right">
        <p>
          <span class="text">服务态度</span>
          <v-star :size="36" :score="serviceScore"></v-star>
          <span class="num">{{serviceScore}}</span>
        </p>
        <p>
          <span class="text">食物口感</span>
          <v-star :size="36" :score="foodScore"></v-star>
          <span class="num">{{foodScore}}</span>
        </p>
        <p>
          <span class="text">送达时间</span>
          <span class="time">{{deliveryTime}}分钟</span>
        </p>
      </div>
    </div>
    <v-pannel>
      <div class="pinglun-header" slot="content">
        <span class="button all" @click="_all">
          <span class="text">全部</span>
          <span class="num">{{ratings[1]}}</span>
        </span>
        <span class="button best" @click="best">
          <span class="text">推荐</span>
          <span class="num">{{ratings[2]}}</span>
        </span>
        <span class="button bad" @click="_bad">
          <span class="text">吐槽</span>
          <span class="num">{{ratings[3]}}</span>
        </span>
      </div>
    </v-pannel>
    <div class="onlyShow" @click="ShowNotNullContent">
      <span class="check icon-check_circle" :class="{'active':isShowNotNullContent}"></span>
      <span class="text">只看有内容的评论</span>
    </div>
    <ul class="commentList">
      <li class="commentListItem" v-for="(item,index) in ratings[0]" :key="index">
        <div class="userInfo">
          <img class="user-avatar" :src="item.avatar" alt>
          <div class="info">
            <div class="left">
              <p class="text">{{item.username}}</p>
              <div class="star">
                <v-star class="starItem" :size="36" :score="item.score"></v-star>
                <p class="text">{{item.deliveryTime}}分钟送达</p>
              </div>
            </div>
            <div class="right">
              <p class="dataTime">{{dateTime[index]}}</p>
            </div>
          </div>
        </div>
        <p class="comment">{{item.text}}</p>
        <div class="signIcon">
          <span
            class="icon icon-thumb_down"
            :class="{'active':item.islike,'icon-thumb_up':item.islike}"
            @click="isOrNoLike(index)"
          ></span>
          <span class="sign" v-for="(item1,index1) in item.recommend" :key="index1">{{item1}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import star from "../star/star";
import pannel from "../slot/pannel";
export default {
  name: "pinglun",
  data() {
    return {
      rating: [],
      isShowNotNullContent: false, // 用于传递给详情页面是否展示没有内容的评论
      rateType: "-1",
      all_comment: 0, // 全部评论
      best_comment: 0, // 推荐评论
      bad_comment: 0, // 吐槽评论
      total: 0, // 评分总和
      deliveryTime: 0, // 配送时间
      rankRate: 0, // 高于周边比率
      serviceScore: 0, // 服务评分
      foodScore: 0 // 食物评分
    };
  },
  components: {
    "v-star": star,
    "v-pannel": pannel
  },
  computed: {
    // 时间戳，转换日期
    dateTime() {
      let times = [];
      function add0(m) {
        return m < 10 ? "0" + m : m;
      }
      this.rating.map((item, index) => {
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
      this.rating.map((item, index) => {
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
      // this.all_comment = allnum;
      // this.best_comment = bestnum;
      // this.bad_comment = badnum;
      if (this.rateType === "0") {
        return [allList, allnum, bestnum, badnum];
      } else if (this.rateType === "1") {
        return [bestList, allnum, bestnum, badnum];
      } else if (this.rateType === "2") {
        return [badList, allnum, bestnum, badnum];
      } else if (!this.isShowNotNullContent) {
        return [this.rating, allnum, bestnum, badnum];
      } else {
        return [list, allnum, bestnum, badnum];
      }
    }
  },
  methods: {
    /**
     * @method isOrNoLike
     * @param {index}评论的索引
     * @returns
     * @desc index等于几就给几点赞
     */
    isOrNoLike(index) {
      let item = this.rating[index];
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
  mounted() {
    this.$http.get("/ratings").then(res => {
      if (res.status === 200) {
        this.rating = res.data;
      }
    });
    let sellers = this.$store.state.sellers;
    this.total = sellers.score;
    this.deliveryTime = sellers.deliveryTime;
    this.rankRate = sellers.rankRate;
    this.serviceScore = sellers.serviceScore;
    this.foodScore = sellers.foodScore;
  }
};
</script>

<style lang="less" scoped>
.pinglun {
  font-size: 0;
  .header {
    margin: 18px 0;
    display: flex;

    .left {
      width: 137px;
      border-right: 1px solid rgba(147, 153, 159, 0.1);
      text-align: center;
      .num {
        font-size: 24px;
        color: rgb(255, 153, 0);
        line-height: 28px;
      }
      .text {
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 12px;
        margin: 6px 0 8px 0;
      }
      .smallText {
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 10px;
        margin-bottom: 6px;
      }
    }
    .right {
      padding: 0 24px;
      p {
        display: flex;
        align-items: center;
        &:nth-child(2) {
          margin: 8px 0;
        }
      }
      .text {
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 18px;
        margin-right: 12px;
      }
      .num {
        font-size: 12px;
        margin-left: 6px;
        color: rgb(255, 153, 0);
        line-height: 18px;
      }
      .time {
        font-size: 12px;
        color: rgb(147, 153, 159);
        line-height: 18px;
      }
    }
  }
  .pinglun-header {
    margin-top: -6px;
  }

  .button {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 1px;
    // margin-top: -6px;
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
    margin-bottom: 47px;
    .commentListItem {
      padding: 16px 0;
      margin: 0 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      &:last-child {
        border-bottom: none;
      }
      .userInfo {
        display: flex;
        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 12px;
        }
        .info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .left {
            .text {
              font-size: 10px;
              color: rgb(7, 17, 27);
              line-height: 12px;
            }
            .star {
              display: flex;
              align-items: center;
              .starItem {
                margin: 4px 0px 6px 0;
              }
              .text {
                font-size: 10px;
                font-weight: 200;
                color: rgb(147, 153, 159);
                line-height: 12px;
              }
            }
          }
          .right {
            font-size: 10px;
            font-weight: 200;
            color: rgb(147, 153, 159);
            line-height: 12px;
          }
        }
      }
      .comment {
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 18px;
        margin-left: 40px;
      }
      .signIcon {
        margin-left: 40px;
        margin-top: 8px;
        display: flex;
        align-items: center;
        .icon {
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 16px;
        }
        .active {
          color: rgb(0, 160, 220);
        }
        .sign {
          display: inline-block;
          padding: 0 6px;
          // width: 87px;
          border: 1px solid rgba(7, 17, 27, 0.1);
          border-radius: 1px;
          background-color: #fff;
          font-size: 9px;
          color: rgb(147, 153, 159);
          line-height: 16px;
          margin-left: 8px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
