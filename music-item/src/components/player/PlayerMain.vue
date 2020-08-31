<template>
    <div class="play-main">
      <swiper class="swiper" :options="swiperOptions">
        <swiper-slide>
          <div class="content">
            <div :class="['cd',this.isPlaying?'active':'']">
              <img src="http://p2.music.126.net/cWt6z6bhPPmQKd-qOzThnA==/109951165252977844.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0" alt="">
            </div>
            <div class="min-lyric">
              <ul>
                <li>我是歌词</li>
                <li>我是歌词</li>
                <li>我是歌词</li>
                <li>我是歌词</li>
                <li>我是歌词</li>
                <li>我是歌词</li>
                <li>我是歌词</li>
              </ul>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <ul class="lyric">
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
            <li>我是歌词呀呀呀</li>
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying'
    ])
  }
}
</script>

<style scoped lang="scss">
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
        background-image: url("../../assets/images/disc.png");
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
          overflow: hidden;
          li{
            text-align: center;
            color: #eee;
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
          width: 100%;
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: #eee;
          font-size: 26px;
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
