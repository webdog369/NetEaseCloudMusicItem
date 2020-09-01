<template>
  <transition
  :css="false"
  @enter="enter"
  @leave="leave"
  >
    <div class="normal-player" ref="normal">
      <div class="bg" ref="bg"></div>
      <div class="mask"></div>
       <PlayerNav></PlayerNav>
      <PlayerMain></PlayerMain>
      <player-controls></player-controls>
    </div>
  </transition>
</template>

<script>
import PlayerNav from './PlayerNav'
import PlayerMain from './PlayerMain'
import PlayerControls from './PlayerControls'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters } from 'vuex'
export default {
  name: 'NormalPlayer',
  components: {
    PlayerNav,
    PlayerMain,
    PlayerControls
  },
  computed: {
    ...mapGetters([
      'songData',
      'currentSong'
    ])
  },
  watch: {
    currentSong () {
      this.$refs.bg.style.backgroundImage = `url(${this.currentSong.picUrl})`
    }
  },
  methods: {
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 300 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 300 }, function () {
        done()
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .normal-player{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    .bg{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #999;
      background-repeat: no-repeat;
      background-size: cover;
      background-position:center;
      filter: blur(30px);
      transform: scale(1.2);
    }
    .mask{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
    }
  }

</style>
