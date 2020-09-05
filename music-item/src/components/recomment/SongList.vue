<template>
  <transition>
    <div :class="['song-list',MiniPlayer?'change-padding-bottom':'']">
      <div class="song-list-top">
        <span></span>
        <h3>最新音乐</h3>
      </div>
      <div class="items">
        <div class="song-list-item" v-for="value in songsData" :key="value.id">
         <div class="item-left">
          <p class="song-name">{{value.name}}</p>
          <p class="song-data"><i></i>{{value.song.artists[0].name}}-{{value.song.album.name}}</p>
         </div>
         <div class="item-right" @click.stop="play(value.id)" ></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SongList',
  props: {
    songsData: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'toggleLarge',
      'toggleMini',
      'changeSongData',
      'togglePlayStatus'
    ]),
    play (id) {
      this.toggleLarge(true)
      this.toggleMini(false)
      this.togglePlayStatus(true)
      this.changeSongData([id])
    }
  },
  computed: {
    ...mapGetters([
      'MiniPlayer',
      'songData',
      'currentSong'
    ])
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.song-list{
  margin-top: 20px;
  @include bg_sub_color();
  .song-list-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    display: flex;
    justify-content: start;
    border-bottom: 1px solid #ccc;
    span{
      position: relative;
      top:50%;
      transform: translateY(-50%);
      display: inline-block;
      width: 8px;
      height: 80%;
      @include bg_color()
    }
    h3{
      @include font_size($font_large);
      @include font_color();
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .items{
    .song-list-item{
      width: 100%;
      height: 100px;
      /*background: yellowgreen;*/
      border-bottom: 1px solid #ccc;
      padding: 5px 0 5px 0;
      @include bg_sub_color;
      display: flex;
      justify-content: space-between;
      .item-left{
        width: 80%;
        height: 100%;
        /*background: tomato;*/
        padding-left: 10px;
        p:nth-child(1){
          height: 50%;
          line-height: 50px;
          @include font_size($font_medium);
          @include font_color_songName();
          @include no-wrap();
          @include clamp(1);
        }
        p:nth-child(2){
          height: 50%;
          line-height: 50px;
          @include font_size($font_samll);
          @include font_color;
          @include no-wrap();
          @include clamp(1);
          i{
            display: inline-block;
            width: 33px;
            height: 23px;
            /*background-color: #000;*/
            background-image: url("../../assets/images/index_icon_2x.png");
            background-repeat: no-repeat;
            background-size:450px;
            background-position:0 0;
            margin-right: 10px;
            vertical-align:middle;
          }
        }
      }
      .item-right{
        width: 100px;
        height: 100px;
        background-image: url("../../assets/images/index_icon_2x.png");
        background-repeat: no-repeat;
        background-size:520px;
        background-position: -60px 15px;
      }
    }
  }
}
.change-padding-bottom{
    padding-bottom: 130px;
}
</style>
