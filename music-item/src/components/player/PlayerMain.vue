<template>
    <div class="play-main">
      <swiper class="swiper" :options="swiperOptions">
        <swiper-slide>
          <div class="content">
            <div :class="['cd',isPlaying?'active':'']">
              <img :src="currentSong.picUrl"  v-show="currentSong.picUrl">
            </div>
            <div class="mini-lyric" ref="miniLyric">
              <ul ref="miniLyricBox">
                <li
                  v-for="(value,key, index) in currentSong.lyric"
                  :key="index"
                  :class="{'active': timeLine === key}"
                >{{value}}</li>
              </ul>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="lyric" ref="lyric">
            <ul ref="lyricBox">
             <li
               v-for="(value,key,index) in currentSong.lyric"
               :key="index"
               :class="{'active': timeLine === key}"
             >{{value}}</li>
            </ul>
          </div>
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
      timeLine: '0'
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'songData',
      'currentSong',
      'currentTime'
    ])
  },
  props: ['currentSongTime', 'currentSongTotalTime'],
  watch: {
    currentSongTime (time) {
      // 歌词高亮同步
      const timeLine = parseInt(time)
      this.timeLine = this.getActiveTimeLine(timeLine)
      try {
        this.lyricScroll('.mini-lyric', this.$refs.miniLyric, this.$refs.miniLyricBox)
        this.lyricScroll('.lyric', this.$refs.lyric, this.$refs.lyricBox)
      } catch (e) {}
      // // 单曲循环或列表只有一首歌时 在歌曲播完后强制回到顶部
      if (time === 0) {
        this.$refs.lyricBox.style.top = 0
        this.$refs.miniLyricBox.style.top = 0
      }
    },
    // 歌曲发生变化时 歌词回滚到顶部
    currentSong () {
      this.$nextTick(() => {
        this.$refs.lyricBox.style.top = 0
        this.$refs.miniLyricBox.style.top = 0
      })
    }
  },
  methods: {
    // 歌词滚动同步方法
    lyricScroll (lyricClassName, lyricRef, lyricBoxRef) {
      // 大屏歌词滚动同步
      const offsetTop = document.querySelector(`${lyricClassName} li.active`).offsetTop
      // console.log(offsetTop)
      const value = lyricRef.clientHeight / 2
      const lyricItemHeight = document.querySelector(`${lyricClassName} li.active`).clientHeight / 2
      const step = -offsetTop - lyricItemHeight + value
      if (offsetTop > value) {
        lyricBoxRef.style.top = step + 'px'
      }
    },
    // 歌词立即同步方法
    getActiveTimeLine (timeLine) {
      if (timeLine < 0) {
        return timeLine
      }
      const res = this.currentSong.lyric[timeLine]
      if (res === undefined || res === '') {
        timeLine--
        return this.getActiveTimeLine(timeLine)
      } else {
        return timeLine + ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
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
      .mini-lyric{
        position: absolute;
        top:75%;
        width: 100%;
        height:180px;
        z-index: -1;
        overflow: hidden;
        ul{
          position: relative;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transition: all .3s linear;
          li{
            width: 80%;
            line-height: 55px;
            text-align: center;
            margin: 0 auto;
            color: #eee;
            font-size: 30px;
            @include clamp(1);
            transition: all .3s linear;
            &.active {
              font-size: 35px;
              @include font_active_color;
            }
          }
        }
      }
    }
    .lyric{
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 90%;
        padding-top: 30px;
        /*overflow: auto;*/
        overflow: hidden;
      ul{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        transition: all .3s linear;
        li{
          width: 80%;
          line-height: 80px;
          text-align: center;
          margin: 0 auto;
          color: #eee;
          font-size: 30px;
          @include clamp(2);
          transition: all .3s linear;
          &.active {
            font-size: 35px;
            @include font_active_color;
          }
      }
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
