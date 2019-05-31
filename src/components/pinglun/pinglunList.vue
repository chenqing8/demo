<template>
  <div class="pinglunList">
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
            <span class="icon icon-thumb_up" :class="{'like':foods.ratings[index].islike}" @click="isOrNoLike(index)"></span>
            <span class="text">{{item.text}}</span>
          </div>
        </li>
      </ul>

  </div>
</template>

<script>
export default {
  name: "pinglunList",
  data() {
    return {

    };
  },
  components: {

  },
  computed: {

  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
.pinglunList{

}
</style>
