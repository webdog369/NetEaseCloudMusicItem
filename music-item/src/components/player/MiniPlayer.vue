<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div>
      <div class="mini-player">
        <div class="song-msg">
          <img :class="[this.isPlaying?'active':'']" @click="ShowLarge" src="http://p2.music.126.net/cWt6z6bhPPmQKd-qOzThnA==/109951165252977844.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0" alt="">
          <div class="song-name">
            <p>月亮鲸鱼</p>
            <p>房东的猫</p>
          </div>
        </div>
        <div class="other-btn">
          <div :class="['play-btn',this.isPlaying?'mini-playing':'']" @click.stop="play"></div>
          <div class="list-btn" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'MiniPlayer',
  computed: {
    ...mapGetters([
      'isPlaying'
    ])
  },
  methods: {
    ...mapActions([
      'toggleLarge',
      'toggleMini',
      'togglePlayStatus'
    ]),
    ShowLarge () {
      this.toggleMini(false)
      this.toggleLarge(true)
    },
    showList () {
      this.$emit('showList')
    },
    play () {
      this.togglePlayStatus(!this.isPlaying)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 300 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 300 }, function () {
        done()
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.mini-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 130px;
  @include bg_color;
  @include font_color;
  display: flex;
  justify-content:space-between;
  z-index: 9;
  .song-msg{
    width: 240px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid #eee;
      box-sizing: border-box;
      animation: cd 10s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state:running;
      }
    }

    .song-name{
      color: #fff;
      font-size:25px;
      text-align: center;
      p:nth-child(2){
        margin-top: 5px;
        font-size:23px;
      }
    }
  }
  .other-btn{
    width: 210px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .play-btn{
      width: 80px;
      height: 80px;
      @include bg_img('../../assets/images/play');
    }
    // 播放状态
    & .mini-playing{
      @include bg_img('../../assets/images/pause')
    }
    .list-btn{
      width: 120px;
      height: 120px;
      @include bg_img('../../assets/images/list');
    }
  }
}
  @keyframes cd {
    from{
      transform:rotate(0);
    }
    to{
      transform:rotate(360deg);
    }

  }
</style>
