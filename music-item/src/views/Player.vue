<template>
    <div class="player" ref="player">
      <NormalPlayer ref="normal" v-show="LargePlayer"></NormalPlayer>
      <MiniPlayer
        v-show="MiniPlayer"
        @showList="showList"
      ></MiniPlayer>
      <ListPlayer
        v-show="hidden && MiniPlayer"
        @hiddenList="hiddenList"
      ></ListPlayer>
      <audio :src="currentSong.songUrl" autoplay ref="audio" :loop="loopFlag"></audio>
    </div>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'
import { mapGetters } from 'vuex'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  mounted () {
    // setInterval(function () {
    //   console.log(this.$refs.audio.duration)
    //   console.log(this.$refs.audio.currentTime)
    // }, 1000)
  },
  computed: {
    ...mapGetters([
      'LargePlayer',
      'MiniPlayer',
      'currentSong',
      'isPlaying',
      'playMode'
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
        console.error('该歌曲暂无播放链接')
      }
    }
  },
  data () {
    return {
      hidden: false,
      loopFlag: false
    }
  },
  methods: {
    showList () {
      this.hidden = !this.hidden
    },
    hiddenList () {
      this.hidden = false
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
