<template>
    <div class="player-nav">
      <div class="song-data">
        <p>月亮鲸鱼</p>
        <p>房东的猫-/陆宇鹏</p>
      </div>
      <div class="min-player-btn" @click="toggleMin"></div>
    </div>
</template>

<script>
export default {
  name: 'PlayerNav',
  methods: {
    toggleMin () {
      this.$emit('toggleMin')
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
  .song-data{
    height: 100%;
    p{
      width: 100%;
      height: 50%;
      text-align: center;
      color: #eee;
      font-size: 28px;
      padding-top: 5px;
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
