<template>
    <div class="list-player">
      <div class="mode">
      <div class="change-mode">
        <div class="mode-btn"></div>
        <span>列表循环</span>
      </div>
        <div class="close-list"  @click.stop="hiddenList"></div>
      </div>
      <div class="items">
        <div class="song-list">
          <div class="song-name">
            <div class="play"></div>
            <h3>月亮鲸鱼</h3>
          </div>
          <div class="song-btns">
            <div class="favorite"></div>
            <div class="del"></div>
          </div>
        </div>
        <div class="song-list">
          <div class="song-name">
            <div class="play"></div>
            <h3>月亮鲸鱼</h3>
          </div>
          <div class="song-btns">
            <div class="favorite"></div>
            <div class="del"></div>
          </div>
        </div>
        <div class="song-list">
          <div class="song-name">
            <div class="play"></div>
            <h3>月亮鲸鱼</h3>
          </div>
          <div class="song-btns">
            <div class="favorite"></div>
            <div class="del"></div>
          </div>
        </div>
        <div class="song-list">
          <div class="song-name">
            <div class="play"></div>
            <h3>月亮鲸鱼</h3>
          </div>
          <div class="song-btns">
            <div class="favorite"></div>
            <div class="del"></div>
          </div>
        </div>
        <div class="song-list">
          <div class="song-name">
            <div class="play"></div>
            <h3>月亮鲸鱼</h3>
          </div>
          <div class="song-btns">
            <div class="favorite"></div>
            <div class="del"></div>
          </div>
        </div>
        <div class="song-list">
          <div class="song-name">
            <div class="play"></div>
            <h3>月亮鲸鱼</h3>
          </div>
          <div class="song-btns">
            <div class="favorite"></div>
            <div class="del"></div>
          </div>
        </div>
        <div class="song-list">
          <div class="song-name">
            <div class="play"></div>
            <h3>月亮鲸鱼</h3>
          </div>
          <div class="song-btns">
            <div class="favorite"></div>
            <div class="del"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ListPlayer',
  data () {
    return {
    }
  },
  methods: {
    hiddenList () {
      this.$emit('hiddenList')
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
        @include bg_img('../../assets/images/small_loop')
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
      &:last-child{
        margin-bottom: 80px;
      }
      .song-name{
        width: 220px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .play{
          width: 60px;
          height: 60px;
          @include bg_img('../../assets/images/small_play')
        }
        h3{
          font-size: 28px;
          @include font_color_songName;
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
