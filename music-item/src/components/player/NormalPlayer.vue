<template>
  <transition
  :css="false"
  @enter="enter"
  @leave="leave"
  >
    <div class="normal-player" ref="normal">
      <div class="bg"></div>
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
export default {
  name: 'NormalPlayer',
  components: {
    PlayerNav,
    PlayerMain,
    PlayerControls
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
      background-image:url("http://p2.music.126.net/cWt6z6bhPPmQKd-qOzThnA==/109951165252977844.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0");
      background-repeat: no-repeat;
      background-size: cover;
      background-position:center;
      filter: blur(30px);
      transform: scale(1.2);
    }
  }

</style>
