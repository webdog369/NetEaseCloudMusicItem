<template>
    <div class="player">
      <div class="bg"></div>
      <PlayerNav @toggleMin="toggleMin"></PlayerNav>
      <PlayerMain ></PlayerMain>
      <PlayerControls></PlayerControls>
    </div>
</template>

<script>
import PlayerNav from '../components/player/PlayerNav'
import PlayerMain from '../components/player/PlayerMain'
import PlayerControls from '../components/player/PlayerControls'
export default {
  name: 'Player',
  components: {
    PlayerNav,
    PlayerMain,
    PlayerControls
  },
  data () {
    return {
    }
  },
  methods: {
    toggleMin () {
      this.$emit('toggleMin')
    }
  }
}
</script>

<style scoped lang="scss">
.player{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
