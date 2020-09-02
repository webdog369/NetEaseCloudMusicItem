<template>
    <div class="play-main">
      <swiper class="swiper" :options="swiperOptions">
        <swiper-slide>
          <div class="content">
            <div :class="['cd',isPlaying?'active':'']">
              <img :src="currentSong.picUrl"  v-show="currentSong.picUrl">
            </div>
            <div class="min-lyric">
              <ul>
                <li v-for="(value, index) in currentSong.lyric" :key="index">{{value}}</li>
              </ul>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <ul class="lyric">
           <li v-for="(value, index) in currentSong.lyric" :key="index">{{value}}</li>
          </ul>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerMain',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOptions: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      lyric: {}
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'songData',
      'currentSong'
    ])
  },
  watch: {
    currentSong (newValue, oldValue) {

    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
.play-main{
  position: absolute;
  width: 100%;
  height: 75%;
  /*background:#ccc;*/
  .swiper{
    width: 100%;
    height: 100%;
    .content{
      width: 100%;
      height: 100%;
      position: relative;
      .cd{
        position: absolute;
        left: 50%;
        top: 10%;
        transform: translateX(-50%);
        width: 600px;
        height: 600px;
        background-image: url("../../assets/images/disc_default.png");
        background-position: center;
        background-size: 109%;
        border: 25px solid rgba(255,255,255,.1);
        border-radius: 50%;
        box-sizing: border-box;
        animation: cd 20s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state:running;
        }
        img{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          width: 380px;
          height: 380px;
          border-radius: 50%;
          border: 12px solid #000;
        }
      }
      .min-lyric{
        position: absolute;
        top:75%;
        width: 100%;
        height:180px;
        z-index: -1;
        font-size: 26px;
        ul{
          width: 100%;
          height: 100%;
          overflow:hidden;
          li{
            width: 80%;
            height: 80px;
            text-align: center;
            margin: 0 auto;
            color: #eee;
            font-size: 30px;
            @include clamp(1)
          }
        }
      }
    }
    .lyric{
        width: 100%;
        height: 90%;
        padding-top: 30px;
        overflow: auto;
        li{
          width: 80%;
          line-height: 50px;
          text-align: center;
          margin: 0 auto;
          color: #eee;
          font-size: 30px;
          @include clamp(2)
        }

    }
  }
  @keyframes cd {
    from{
      transform: translateX(-50%) rotate(0);
    }
    to{
      transform: translateX(-50%) rotate(360deg);
    }

  }
}
</style>
<style>
  .swiper-pagination{
    position: absolute;
    /*bottom: -14%;*/
  }
  .swiper-pagination .swiper-pagination-bullet{
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    transition: all .2s ease-in-out;
  }
  .swiper-pagination .swiper-pagination-bullet-active{
    width: 50px;
    height: 15px;
  }
</style>
