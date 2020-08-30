<template>
    <div class="player-controls">
      <div class="progress-bar">
        <span>00:00</span>
        <ul>
          <li>
            <span></span>
          </li>
        </ul>
        <span>00:00</span>
      </div>
      <div class="play-btns">
        <div class="mode"></div>
        <div class="pre"></div>
        <div class="play"></div>
        <div class="next"></div>
        <div class="favorite"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PlayerControls'
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
  .progress-bar{
    width: 80%;
    height: 30px;
    /*background: grey;*/
    margin: 5px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>span{
      font-size: 22px;
      color: #fff;
    }
    ul{
      width: 80%;
      height: 30%;
      background: #fff;
      margin-left: 5px;
      margin-right: 5px;
      li{
        position: relative;
        width: 70%;
        height: 100%;
        @include bg_color;
        span{
          position: absolute;
          top:50%;
          right:0;
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
      @include bg_img('../../assets/images/loop')
    }
    .pre{
      @include bg_img('../../assets/images/prev')
    }
    .play{
      @include bg_img('../../assets/images/play')
    }
    .next{
      @include bg_img('../../assets/images/next')
    }
    .favorite{
      @include bg_img('../../assets/images/un_favorite')
    }
  }
}
</style>
