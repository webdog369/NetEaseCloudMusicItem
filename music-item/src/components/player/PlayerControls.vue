<template>
    <div class="player-controls">
      <div class="progress-bar">
        <span>{{currentSongTime | formartTime}}</span>
        <ul ref="progressBottom" @click="jumpTime">
          <li ref="progress">
            <span @mousedown="startTime"></span>
          </li>
        </ul>
        <span>{{currentSongTotalTime | formartTime}}</span>
      </div>
      <div class="play-btns">
        <div class="mode" @click="mode" ref="modeBtn"></div>
        <div class="pre" @click.stop="pre"></div>
        <div
          :class="['play',isPlaying?'Large-playing':'']"
          @click.stop="play"
        ></div>
        <div class="next" @click.stop="next"></div>
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
      'favorite',
      'songData',
      'currentIndex',
      'currentSong'
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
    },
    currentSongTime (newTime) {
      // 进度条宽度同步
      const totalLength = this.$refs.progressBottom.clientWidth
      this.$refs.progress.style.width = newTime / this.currentSongTotalTime * totalLength + 'px'
      // 播放模式同步
      if (this.currentSongTime === this.currentSongTotalTime) {
        if (this.songData.length > 1) {
          this.next()
        } else {
          // 如果歌曲列表中只有一首歌 则需要重头开始播放
          this.togglePlayStatus(false)
          setTimeout(() => {
            this.togglePlayStatus(true)
          }, 100)
        }
      }
    }
  },
  data () {
    return {
    }
  },
  props: ['currentSongTotalTime', 'currentSongTime'],
  filters: {
    // 格式化歌曲时间
    formartTime: (value) => {
      const minute = parseInt(value / 60) + ''
      const second = parseInt(value % 60) + ''
      return `${minute.padStart(2, '0')}:${second.padStart(2, '0')}`
    }
  },
  methods: {
    ...mapActions([
      'togglePlayStatus',
      'togglePlayMode',
      'toggleFavoriteStatus',
      'changeCurrentIndex',
      'changeTipsMsg',
      'changeCurrentTime'
    ]),
    jumpTime (el) {
      const offsetX = el.offsetX
      const totalWidth = this.$refs.progressBottom.clientWidth
      const value = offsetX / totalWidth
      const time = value * this.currentSongTotalTime
      this.changeCurrentTime(time)
      this.$refs.progress.style.width = offsetX + 'px'
    },
    startTime (e) {
      console.log('aaa')
    },
    play () {
      this.togglePlayStatus(!this.isPlaying)
    },
    mode () {
      this.togglePlayMode()
    },
    pre () {
      const Length = this.songData.length - 1
      // 随机模式播放
      const rand = Math.random() * Length
      if (this.playMode === 2) {
        this.changeCurrentIndex(parseInt(rand))
      }
      // 非随机模式播放
      if (this.currentIndex === 0 && this.playMode !== 2) {
        this.changeCurrentIndex(Length)
      } else if (this.playMode !== 2) {
        this.changeCurrentIndex(this.currentIndex - 1)
      }
      if (Length === 0) {
        this.changeTipsMsg(['歌单中没有其他歌曲了~', true])
      }
      if (this.currentSong.songUrl === null) {
        setTimeout(() => {
          this.changeCurrentIndex(this.currentIndex - 1)
          this.togglePlayStatus(true)
        }, 1000)
      }
      if (!this.isPlaying) {
        this.togglePlayStatus(true)
        setTimeout(() => {
          this.togglePlayStatus(false)
        }, 1)
      }
    },
    next () {
      const Length = this.songData.length - 1
      // 随机模式播放
      const rand = Math.random() * Length
      if (this.playMode === 2) {
        this.changeCurrentIndex(parseInt(rand))
      }
      // 非随机模式播放
      if (this.currentIndex >= Length && this.playMode !== 2) {
        this.changeCurrentIndex(0)
      } else if (this.playMode !== 2) {
        this.changeCurrentIndex(this.currentIndex + 1)
      }
      if (Length === 0) {
        this.changeTipsMsg(['歌单中没有其他歌曲了~', true])
      }
      if (this.currentSong.songUrl === null) {
        setTimeout(() => {
          this.changeCurrentIndex(this.currentIndex + 1)
          this.togglePlayStatus(true)
        }, 1000)
      }
      if (!this.isPlaying) {
        this.togglePlayStatus(true)
        setTimeout(() => {
          this.togglePlayStatus(false)
        }, 1)
      }
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
  // 解决swiper组件导致字体闪烁问题
  transform: translate3d(0,0,0);
  overflow: hidden;
  .progress-bar{
    width: 85%;
    height: 30px;
    /*background: grey;*/
    margin: 5px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &>span{
      font-size: 22px;
      color: #fff;
    }
    ul{
      width: 72%;
      height: 30%;
      background: #fff;
      margin-left: 5px;
      margin-right: 5px;
      li{
        position: relative;
        width:0;
        height: 100%;
        @include bg_color;
        span{
          position: absolute;
          top:50%;
          right:-30px;
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
