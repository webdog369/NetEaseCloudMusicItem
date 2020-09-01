
<template>
  <swiper class="banner" :options="swiperOptions" v-if="banners.length > 0">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Banner',
  data () {
    return {
      swiperOptions: {
        loop: true, // 循环模式选项
        // 自动轮播
        autoplay: {
          delay: 1000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  methods: {
  },
  // 以数组方式快捷接收
  // props:['banners'],

  // 以对象形式接收数据
  props: {
    // 以对象形式详细配置接收的数据
    banners: {
      // 数据类型
      type: Array,
      // 默认值 (通过函数传递)
      default: () => [],
      // 是否必须传递
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
<style scoped lang="scss">
    .banner{
      overflow:hidden;
      .item{
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
</style>

<!--自定义激活状态的样式-->
<style lang="scss">
  @import "../../assets/css/mixin";
  .swiper-pagination-bullet{
    width: 16px;
    height: 16px;
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active{
    @include bg_color();
  }
</style>
