<template>
  <div class>
    <ul>
      <li v-for="(item,index) in title" :key="index">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      title: []
    };
  },
  components: {},
  computed: {},
  methods: {},
  mounted() {
    this.$http.get("/posts").then(res => {
      console.log(res);
      this.title = res.data.dataList;
    });
  }
};
</script>

<style lang="" scoped>
</style>
