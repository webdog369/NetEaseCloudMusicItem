<template>
    <div class="player-nav">
      <div class="song-data">
        <p>{{currentSong.name}}</p>
        <p>{{currentSong.singer}}</p>
      </div>
      <div class="min-player-btn" @click.stop="ShowMini"></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerNav',
  computed: {
    ...mapGetters([
      'songData',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'toggleLarge',
      'toggleMini'
    ]),
    ShowMini () {
      this.toggleLarge(false)
      this.toggleMini(true)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.player-nav {
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
  transform: translate3d(0,0,0);
  .song-data{
    height: 100%;
    p{
      width: 60%;
      height: 50%;
      text-align: center;
      color: #eee;
      font-size: 28px;
      padding-top: 5px;
      margin: 0 auto;
      @include no-wrap;
      &:nth-child(2){
        font-size: 24px;
        padding-top: 0;
      }
    }
  }
  .min-player-btn {
    position: absolute;
    left: 10px;
    top: 0;
    width: 80px;
    height: 80px;
    @include bg_img("../../assets/images/down")
  }
}
</style>
