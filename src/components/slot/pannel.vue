<template>
  <div class="pannel">
    <div class="pannel-margin"></div>
    <div class="pannel-slot">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "pannel",
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.pannel {
  .pannel-slot {
    padding: 18px;
    background-color: #fff;
    .header {
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 6px;
    }
  }
  .pannel-margin {
    height: 16px;
    background-color: #f3f5f7;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
}
</style>
