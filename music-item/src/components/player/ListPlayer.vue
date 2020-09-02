<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="list-player">
      <div class="mode">
      <div class="change-mode">
        <div class="mode-btn" @click="mode" ref="modeBtn"></div>
        <span ref="modeName">列表循环</span>
      </div>
        <div class="close-list"  @click.stop="hiddenList"></div>
      </div>
      <div class="items">
        <div
          ref="listItem"
          v-for="(item, index) in songData"
          :key="item.id"
          :class="['song-list',songData.length>3?'active':'']">
          <div class="song-name">
            <div class="play" @click.stop="play(index)"></div>
            <h3>{{item.name}}</h3>
          </div>
          <div class="song-btns">
            <div class="favorite"></div>
            <div class="del" @click.stop="del(index)"></div>
          </div>
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
  name: 'ListPlayer',
  data () {
    return {
      songList: []
    }
  },
  watch: {
    playMode () {
      if (this.playMode === 0) {
        this.$refs.modeBtn.classList.replace('mode2', 'mode0')
        this.$refs.modeName.innerHTML = '列表循环'
      } else if (this.playMode === 1) {
        this.$refs.modeBtn.classList.add('mode1')
        this.$refs.modeName.innerHTML = '单曲循环'
      } else if (this.playMode === 2) {
        this.$refs.modeBtn.classList.replace('mode1', 'mode2')
        this.$refs.modeName.innerHTML = '随机播放'
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'playMode',
      'currentSong',
      'songData',
      'currentIndex'
    ])
  },
  methods: {
    ...mapActions([
      'toggleLarge',
      'toggleMini',
      'togglePlayStatus',
      'togglePlayMode',
      'changeSongData',
      'delSong',
      'changeCurrentIndex'
    ]),
    hiddenList () {
      this.$emit('hiddenList')
    },
    play (index) {
      this.toggleLarge(true)
      this.toggleMini(false)
      this.togglePlayStatus(true)
      this.changeCurrentIndex(index)
    },
    mode () {
      this.togglePlayMode()
      console.log(this.playMode)
    },
    del (index) {
      this.delSong(index)
    },
    enter (el, done) {
      Velocity(el, 'transition.perspectiveUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.perspectiveUpOut', { duration: 500 }, function () {
        done()
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.list-player{
  width: 100%;
  max-height: 500px;
  position: fixed;
  left: 0;
  bottom: 130px;
  border-top: 2px solid #ccc;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  [data-theme=theme2] & {
    background: #333;
  }
  .mode{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .change-mode{
      width: 200px;
      height: 80px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .mode-btn{
        width: 50px;
        height: 50px;
        @include bg_img('../../assets/images/small_loop');
        &.mode0{
          @include bg_img('../../assets/images/small_loop');
        }
        &.mode1{
          @include bg_img('../../assets/images/small_one');
        }
        &.mode2{
          @include bg_img('../../assets/images/small_shuffle');
        }
      }
      span{
        font-size: 28px;
        @include font_color;
      }
    }
    .close-list{
      width: 50px;
      height: 50px;
      transform: translateX(-20px);
      @include bg_img('../../assets/images/small_close')
    }
  }
  .items{
    width: 100%;
    max-height: 500px;
    overflow: auto;
    .song-list{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #ccc;
      box-sizing: border-box;
      &.active{
        &:last-child{
          margin-bottom: 80px;
        }
      }
      .song-name{
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .play{
          width: 60px;
          height: 60px;
          @include bg_img('../../assets/images/small_play');
          &.active{
            @include bg_img('../../assets/images/small_pause');
          }
        }
        h3{
          width: 80%;
          font-size: 28px;
          @include font_color_songName;
          @include clamp(1)
        }
      }
      .song-btns{
        width: 150px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .favorite{
          width: 50px;
          height: 50px;
          @include bg_img('../../assets/images/small_un_favorite')
        }
        .del{
          width: 80px;
          height: 80px;
          @include bg_img('../../assets/images/small_del')
        }
      }
    }
  }
}
</style>
