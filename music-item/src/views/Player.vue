<template>
    <div class="player" ref="player">
      <NormalPlayer
        ref="normal" v-show="LargePlayer"
        :currentSongTotalTime="currentSongTotalTime"
        :currentSongTime="currentSongTime"
      ></NormalPlayer>
      <MiniPlayer
        v-show="MiniPlayer"
        @showList="showList"
      ></MiniPlayer>
      <ListPlayer
        v-show="hidden && MiniPlayer"
        @hiddenList="hiddenList"
      ></ListPlayer>
      <audio :src="songUrl" autoplay ref="audio" :loop="loopFlag" @timeupdate="timeupdate"></audio>
      <Tips></Tips>
    </div>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'
import Tips from '../components/Tips'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer,
    Tips
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      this.currentSongTotalTime = this.$refs.audio.duration
    }
  },
  computed: {
    ...mapGetters([
      'LargePlayer',
      'MiniPlayer',
      'currentSong',
      'isPlaying',
      'playMode',
      'songData',
      'currentIndex',
      'currentTime'
    ])
  },
  watch: {
    isPlaying (n, o) {
      if (n) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    playMode (n, o) {
      n === 1 ? this.loopFlag = true : this.loopFlag = false
    },
    currentSong (n) {
      if (n.songUrl === null) {
        this.changeTipsMsg(['sorry,该歌曲暂无版权~', true])
        this.togglePlayStatus(false)
      } else {
        this.songUrl = n.songUrl
      }
    },
    currentTime (n) {
      this.$refs.audio.currentTime = n
    }
  },
  data () {
    return {
      hidden: false,
      loopFlag: false,
      songUrl: '',
      currentSongTime: 0,
      currentSongTotalTime: 0
    }
  },
  methods: {
    ...mapActions([
      'changeTipsMsg',
      'changeCurrentIndex',
      'togglePlayStatus'
    ]),
    showList () {
      this.hidden = !this.hidden
    },
    hiddenList () {
      this.hidden = false
    },
    timeupdate (e) {
      this.currentSongTime = e.target.currentTime
    }
  }
}
</script>

<style scoped lang="scss">
.player{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
</style>
