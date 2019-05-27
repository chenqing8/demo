<template>
  <div class="contorNum">
    <span class="num">
      <span class="icon delete icon-remove_circle_outline" v-if="food.count>0" @click="remove()"></span>
      <span class="text" v-if="food.count">{{food.count}}</span>
      <span class="icon add icon-add_circle" @click="add()"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "contorNum",
  props: ["food"],
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    /**
     * @method add
     * @returns
     * @desc 通过传来的商品，没有count的就添加，有的就++
     */
    add() {
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
      } else {
        this.$set(this.food, this.food.count++);
      }
    },
    /**
     * @method remove
     * @returns
     * @desc 通过传来的商品--
     */
    remove() {
      this.$set(this.food, this.food.count--);
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "../../common/less/common.less";
.contorNum {
  .num {
    display: flex;
    align-items: center;
    .icon {
      font-size: 24px;
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
</style>
