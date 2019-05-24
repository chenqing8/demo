<template>
  <div class="star">
    <span :class="starType">
      <span class="star-item" :class="[item]" v-for="(item,index) in classList" :key="index"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "star",
  props: ["size", "score"],
  data() {
    return {};
  },
  components: {},
  computed: {
    /**
     * @method starType
     * @param no
     * @returns 字符串
     * @desc 根据返回的尺寸方便匹配star的状态
     */
    starType: function() {
      return "star_" + this.size;
    },
    /**
     * @method classList
     * @param no
     * @returns 数组
     * @desc 根据分数组成star状态的的样式
     */
    classList: function() {
      // 定义常量方便日后修改
      let length = 5;
      let CLS_ON = "on";
      let CLS_OFF = "off";
      let CLS_HALF = "half";
      let result = [];
      //   let score = Math.floor(this.score * 2) / 2;这是另一种算法
      // 当接口还未请求成功的时候就已经开始在渲染这个star页面了，，所以导致结果undefined
      if (this.score === undefined || this.score === "undefined") {
        return false;
      }
      let score = this.score.toString();
      let two, one; // one代表整数部分，two代表小数部分
      // 判断带小数和不带小数的情况
      if (score.indexOf(".") === -1) {
        two = 0;
        one = Number(score);
      } else {
        two = Number(score.split(".")[1]);
        one = Number(score.split(".")[0]);
      }
      // one等于几就push几个“on”
      let i = 1;
      while (one >= i) {
        result.push(CLS_ON);
        i++;
      }
      // two等于几就push几个“half”
      if (two >= 5 && result.length < length) {
        result.push(CLS_HALF);
      }
      // 最后长度不足5的补“off”
      while (result.length < length) {
        result.push(CLS_OFF);
      }
      return result;
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "../../common/less/common.less";
.star {
  font-size: 0;
  text-align: center;
  margin: 16px 0 26px 0;
  .star-item {
    display: inline-block;
  }
  .star_48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
    }
    .on {
      .bg-image("../../assets/img/star48_on");
    }
    .off {
      .bg-image("../../assets/img/star48_off");
    }
    .half {
      .bg-image("../../assets/img/star48_half");
    }
  }
  .star_36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 16px;
      background-size: 15px 15px;
    }
    .on {
      .bg-image("../../assets/img/star36_on");
    }
    .off {
      .bg-image("../../assets/img/star36_off");
    }
    .half {
      .bg-image("../../assets/img/star36_half");
    }
  }
  .star_24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
    }
    .on {
      .bg-image("../../assets/img/star24_on");
    }
    .off {
      .bg-image("../../assets/img/star24_off");
    }
    .half {
      .bg-image("../../assets/img/star24_half");
    }
  }
}
</style>
