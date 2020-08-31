<template>
    <div class="player-controls">
      <div class="progress-bar">
        <span>00:00</span>
        <ul>
          <li>
            <span></span>
          </li>
        </ul>
        <span>00:00</span>
      </div>
      <div class="play-btns">
        <div class="mode" @click="mode" ref="modeBtn"></div>
        <div class="pre"></div>
        <div
          :class="['play', this.isPlaying?'Large-playing':'']"
          @click.stop="play"
        ></div>
        <div class="next"></div>
        <div :class="['favorite',favorite?'active':'']" @click="favoriteIt"></div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PlayerControls',
  computed: {
    ...mapGetters([
      'isPlaying',
      'playMode',
      'favorite'
    ])
  },
  watch: {
    playMode () {
      if (this.playMode === 0) {
        this.$refs.modeBtn.classList.replace('mode2', 'mode0')
      } else if (this.playMode === 1) {
        this.$refs.modeBtn.classList.add('mode1')
      } else if (this.playMode === 2) {
        this.$refs.modeBtn.classList.replace('mode1', 'mode2')
      }
    }
  },
  methods: {
    ...mapActions([
      'togglePlayStatus',
      'togglePlayMode',
      'toggleFavoriteStatus'
    ]),
    play () {
      this.togglePlayStatus(!this.isPlaying)
    },
    mode () {
      this.togglePlayMode()
      console.log(this.playMode)
    },
    favoriteIt () {
      this.toggleFavoriteStatus(!this.favorite)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.player-controls{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 13%;
  /*background: orange;*/
  .progress-bar{
    width: 80%;
    height: 30px;
    /*background: grey;*/
    margin: 5px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>span{
      font-size: 22px;
      color: #fff;
    }
    ul{
      width: 80%;
      height: 30%;
      background: #fff;
      margin-left: 5px;
      margin-right: 5px;
      li{
        position: relative;
        width: 70%;
        height: 100%;
        @include bg_color;
        span{
          position: absolute;
          top:50%;
          right:0;
          transform: translateY(-50%);
          display: inline-block;
          width: 30px;
          height: 30px;
          background: #ffffff;
          border: 1px solid #333;
          border-radius: 50%;
        }
      }
    }
  }
  .play-btns{
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    width: 90%;
    height:120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div{
      width: 90px;
      height: 90px;
      /*background: grey;*/
    }
    .mode{
      @include bg_img('../../assets/images/loop');
      &.mode0{
        @include bg_img('../../assets/images/loop');
      }
      &.mode1{
        @include bg_img('../../assets/images/one');
      }
      &.mode2{
        @include bg_img('../../assets/images/shuffle');
      }
    }
    .pre{
      @include bg_img('../../assets/images/prev')
    }
    .play{
      @include bg_img('../../assets/images/play')
    }
    // 播放状态
    & .Large-playing{
      @include bg_img('../../assets/images/pause')
    }
    .next{
      @include bg_img('../../assets/images/next')
    }
    .favorite{
      @include bg_img('../../assets/images/un_favorite');
      &.active{
        @include bg_img('../../assets/images/favorite');
      }
    }
  }
}
</style>
