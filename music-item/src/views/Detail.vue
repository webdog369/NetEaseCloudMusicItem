<template>
<div class="detail">
  <ScrollView>
    <div>
  <div class="header">
    <div class="top" >
      <div class="mask" ref="mask"></div>
      <p class="title">{{playList.name}}</p>
      <div class="imgs">
        <img v-lazy="playList.coverImgUrl" alt="">
        <span>歌单</span>
        <i>{{playCount}}</i>
      </div>
      <div class="author">
        <img v-lazy="playListUserData.avatarUrl" alt="">
        <span>{{playListUserData.nickname}}</span>
      </div>
    </div>
    <div class="bottom">
      <div class="tag">
        <span>标签:</span>
        <span v-for="tag in playList.tags" :key="tag">{{tag}}</span>
      </div>
      <div class="description" ref="des">
        <span v-for="(v,i) in description" :key="i">
          <i>{{v}}</i><br>
        </span>
      </div>
    </div>
  </div>
   <h3>歌曲列表</h3>
  <div class="song-list-item" v-for="(song, i) in songsDetailList" :key="song.id">
    <div class="item-left">
      <div class="num">{{i+1}}</div>
      <div class="song-title">
        <p class="song-name">{{song.name}}</p>
        <p class="song-data"><i></i>{{song.ar[0].name}}-{{song.al.name}}</p>
      </div>
    </div>
    <div class="item-right"></div>
  </div>
    </div>
  </ScrollView>
</div>
</template>

<script>
import { getPlayList, getPlayListUser, getSongDetail } from '../api'
import ScrollView from '../components/ScrollView'

export default {
  name: 'Detail',
  components: {
    ScrollView
  },
  created () {
    getPlayList(this.$route.params.id).then(data => {
      this.playList = data.playlist
    })
  },
  computed: {
    playCount () {
      return (this.playList.playCount / 10000).toFixed(1) + '万'
    }
  },
  watch: {
    playList () {
      // 获取歌单提者信息
      getPlayListUser(this.playList.userId).then(data => {
        this.playListUserData = data.profile
      })
      this.$refs.mask.style.backgroundImage = `url(${this.playList.coverImgUrl})`
      this.description = this.playList.description.split('\n').slice(0, 3)

      const songDataList = this.playList.trackIds.slice(0, 20)
      const SongIds = []
      for (const key of songDataList) {
        SongIds.push(key.id)
      }
      const ids = SongIds.toString()
      getSongDetail(ids).then(data => {
        this.songsDetailList = data.songs
      })
    }
  },
  data () {
    return {
      playList: {},
      playListUserData: {},
      description: [],
      songsDetailList: []
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
.detail{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color;
  overflow: hidden;
  .header{
    width: 100%;
    /*background: yellowgreen;*/
    .top{
      position: relative;
      width: 100%;
      height: 350px;
      background: rgba(0,0,0,.4);
      overflow: hidden;
      .mask{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        filter: blur(40px);
        transform: scale(1.2);
        background-position:50%;
        z-index: -1;
      }
      p{
        color: #fff;
        display: inline-block;
        position: absolute;
        left: 320px;
        top: 40px;
        font-size: 30px;
        padding-right: 30px;
      }
      .imgs{
        position: absolute;
        left: 40px;
        top: 40px;
        width: 250px;
        height: 250px;
        border: 1px solid #aaa;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
        span{
          position: absolute;
          left: -10px;
          top: 25px;
          width: 80px;
          height: 30px;
          background:rgb(192,54,51);
          font-size: 22px;
          color: #fff;
          border-radius: 30px;
          text-align: center;
        }
        i{
          position: absolute;
          top: 0;
          right: 0;
          display: inline-block;
          height: 30px;
          width: 100px;
          color: #fff;
          font-style: normal;
          font-size: 22px;
          text-align: right;
          background: url("../assets/images/ej.png") no-repeat ;
          background-size: 30px 30px;
        }
      }
      .author{
        position: absolute;
        left: 320px;
        top: 150px;
        width: 200px;
        height: 80px;
        /*background: yellowgreen;*/
        img{
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        span{
          line-height: 60px;
          color: #eee;
          font-size: 25px;
          margin-left: 5px;
        }
      }
    }
    .bottom{
      width: 100%;
      /*height: 230px;*/
      @include bg_sub_color;
      /*background: orange;*/
      padding-left: 15px;
      overflow: hidden;
      .tag{
        width: 100%;
        height: 70px;
        border-bottom: 1px solid #ccc;
        span{
          margin-right: 15px;
          font-size: 23px;
          color: #666;
          line-height: 70px;
          &:nth-child(1){
          font-size: 28px;
        }
        }
      }
      .description{
        width: 100%;
        height: 85px;
        padding-top: 15px;
        padding-bottom: 30px;
        overflow: auto;
        span{
         i{
           display: inline-block;
           width: 100%;
           font-size: 28px;
           color: #666;
           font-style: normal;
           //@include no-wrap;
         }
        }
      }
    }
  }
  h3{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #eee;
    padding-left: 20px;
    font-size: 25px;
  }
  .song-list-item{
    width: 100%;
    height: 100px;
    /*background: yellowgreen;*/
    border-bottom: 1px solid #ccc;
    padding: 5px 0 5px 0;
    @include bg_sub_color;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .item-left{
      width: 80%;
      height: 100%;
      /*background: tomato;*/
      padding-left: 10px;
      .num{
        display: inline-block;
        width: 10%;
        height: 100%;
        line-height: 100px;
        text-align: center;
        color: #666;
        float: left;
        &:after{
          content: "";
          height: 100%;
          clear: both;
        }
      }
      .song-title{
        width: 80%;
        height: 100%;
        display: inline-block;
        p:nth-child(1){
          width: 100%;
          height: 50%;
          line-height: 50px;
          @include font_size($font_large);
          @include font_color_songName();
          @include no-wrap();
          @include clamp(1);
        }
        p:nth-child(2){
          width: 80%;
          height: 50%;
          line-height: 50px;
          @include font_size($font_samll);
          @include font_color;
          @include no-wrap();
          @include clamp(1);
        }
      }
    }
    .item-right{
      width: 100px;
      height: 100px;
      background-image: url("../assets/images/small_play_qq@2x.png");
      background-repeat: no-repeat;
      background-size:80px 80px;
      background-position: center center;
      &:after{
        content: '';
        display: block;
        width: 84px;
        height: 84px;
        background: rgba(255,255,255,.8);
        margin: 8px auto;
        border-radius: 50%;
      }
    }
  }
}
</style>
