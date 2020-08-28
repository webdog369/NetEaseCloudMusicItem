<template>
    <div class="personalized">
      <div class="personalized-top">
        <span></span>
        <h3>{{title}}</h3>
      </div>
      <div class="personalized-list">
        <a class="item" href="#" v-for="data in datas" :key="data.id" @click="getDetail(data.id,title)">
          <img v-lazy="data.picUrl" alt="">
          <p>{{data.name}}</p>
        </a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    datas: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    getDetail (id, title) {
      this.$emit('getDetail', [id, title])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.personalized{
  margin-top: 20px;
  @include bg_sub_color();
  .personalized-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    display: flex;
    justify-content: start;
    border-bottom: 1px solid #ccc;
    span{
      position: relative;
      top:50%;
      transform: translateY(-50%);
      display: inline-block;
      width: 8px;
      height: 80%;
      @include bg_color()
    }
    h3{
      @include font_size($font_large);
      @include font_color();
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .personalized-list{
    width: 100%;
    /*height: 600px;*/
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 20px;
    .item{
      width: 200px;
      /*height: 200px;*/
      margin-bottom: 20px;
        img{
          width:200px;
          height: 200px;
          border-radius: 30px;
        }
      p{
        padding-top: 10px;
        display: inline-block;
        width: 100%;
        height: 60px;
        line-height: 30px;
        overflow: hidden;
        text-align: center;
        @include font_color();
        @include clamp(2);
        @include font_size($font_samll);
      }
    }
  }
}
</style>
