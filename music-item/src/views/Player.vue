<template>
    <div class="player" ref="player">
      <div class="bg" ref="bg"></div>
      <NormalPlayer ref="normal" v-show="LargePlayer"></NormalPlayer>
      <MiniPlayer
        v-show="MiniPlayer"
        @showList="showList"
      ></MiniPlayer>
      <ListPlayer
        v-show="hidden && MiniPlayer"
        @hiddenList="hiddenList"
      ></ListPlayer>
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
  computed: {
    ...mapGetters([
      'LargePlayer',
      'MiniPlayer'
    ])
  },
  data () {
    return {
      hidden: false
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
