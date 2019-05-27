<template>
  <div class="contorNum">
     <span class="num">
                    <span
                      class="icon delete icon-remove_circle_outline"
                      v-if="num[index][id]>0"
                      @click="remove(index,id)"
                    >
                    </span>
                    <span class="text" v-if="num[index][id]>0">{{num[index][id]}}</span>
                    <span class="icon add icon-add_circle" @click="add(index,id)"></span>
                  </span>
  </div>
</template>

<script>
export default {
  name: "contorNum",
  props:["num","ids","goods","shopCardList","shopcardsId"],
  data() {
    return {
        
    };
  },
  components: {
  },
  computed: {
      index(){
          return this.ids.split("-")[0];
      },
            id(){
          return this.ids.split("-")[1];
      }
  },
  methods: {

    /**
     * @method add
     * @param {index}:menu的索引
     * @param {id}:foods的索引
     * @returns
     * @desc 找到当前索引的foods，把它添加在shopCardList,并且改变num中的数量
     */
    add(index, id) {
      // 改变数组的值，不会渲染页面刷新，只有通过这两种方式才可以：
      // this.$set(this.num[index],id,this.num[index][id]+1);
      this.num[index].splice(id,1, this.num[index][id]+1);
      let ids=this.shopcardsId.indexOf(index+""+id);      
      if(ids>=0){
        this.shopCardList[ids].count++;
      }else{
         this.shopcardsId.push(index+""+id);
         this.shopCardList.push({
           id:index+"-"+id,
          count: this.num[index][id],
          price: this.goods[index]["foods"][id]["price"],
          name: this.goods[index]["foods"][id]["name"]
        });
      }
      this.$emit("getshopCardList",this.shopCardList,this.shopcardsId)
    },
    remove(index, id) {
      // 改变数组的值，不会渲染页面刷新，只有通过这两种方式才可以：
      // this.$set(this.num[index],id,this.num[index][id]+1);
      let ids=this.shopcardsId.indexOf(index+""+id);  
      if(Number(this.shopCardList[ids].count)>1){
          this.shopCardList[ids].count--;
          this.num[index].splice(id,1, this.num[index][id]-1);
      }else{
          this.shopcardsId.splice(ids,1);
          this.shopCardList.splice(ids,1);
          this.num[index].splice(id,1, 0);
      }
      this.$emit("getshopCardList",this.shopCardList,this.shopcardsId)
    }
  },
  mounted() {
      
  }
};
</script>

<style lang="less" scoped>
@import "../../common/less/common.less";
.contorNum{
      .num {
                  display: flex;
                  align-items: center;
                  .icon {
                    font-size: 14px;
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
