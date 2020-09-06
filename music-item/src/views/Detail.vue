<template>
<div class="detail">
  <ScrollView ref="scrollView">
    <div :class="['box',MiniPlayer?'ch-pd-btm':'']">
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
      <div class="back" @click="backPage">返回 >></div>
    </div>
    <div class="bottom">
      <div class="tag">
        <span>标签:</span>
        <span v-for="tag in tags" :key="tag">{{tag}}</span>
      </div>
      <div class="description" ref="des">
        <span v-for="(v,i) in description" :key="i">
          <i>{{v}}</i><br>
        </span>
      </div>
    </div>
  </div>
      <div class="play-all">
        <h3>歌曲列表</h3>
        <span @click="playAll(ids)">播放全部</span>
      </div>
      <div class="song-list">
       <div class="song-list-item" v-for="(song, i) in songsDetailList" :key="song.id">
    <div class="item-left">
      <div class="num">{{i+1}}</div>
      <div class="song-title">
        <p class="song-name">{{song.name}}</p>
        <p class="song-data"><i></i>{{song.ar[0].name}}-{{song.al.name}}</p>
      </div>
    </div>
    <div class="item-right" @click="play(song.id)"></div>
  </div>
      </div>
    </div>
  </ScrollView>
</div>
</template>

<script>
import { getPlayList, getPlayListUser, getSongDetail, getAlbumDetail } from '../api'
import ScrollView from './ScrollView'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Detail',
  created () {
    // 判断歌单类型 请求不同的数据
    if (this.$route.query.type === '推荐歌单') {
      getPlayList(this.$route.params.id).then(data => {
        this.playList = data.playlist
      })
    } else if (this.$route.query.type === '最新专辑') {
      getAlbumDetail(this.$route.params.id).then(data => {
        // 为适应模板数据格式 主动定义一个正确的模板
        this.playList = {
          name: data.album.name,
          coverImgUrl: data.album.picUrl,
          playCount: data.album.info.shareCount,
          tags: data.album.tags,
          description: data.album.description,
          songs: data.songs
        }
        // 专辑作者和头像
        this.playListUserData = {
          nickname: data.album.artist.name,
          avatarUrl: data.album.artist.picUrl
        }
      })
    }
  },
  components: {
    ScrollView
  },
  computed: {
    ...mapGetters([
      'MiniPlayer',
      'isPlaying'
    ]),
    // 处理歌单播放
    playCount () {
      return (this.playList.playCount / 10000).toFixed(1) + '万'
    },
    // 处理标签
    tags () {
      return (this.playList.tags !== '' ? this.playList.tags : ['暂无标签'])
    }
  },
  watch: {
    // 为防止部分数据添加失败 监测在playList由 [] 到有数据的时候再添加数据
    playList () {
      // 给歌单顶部添加背景图片
      this.$refs.mask.style.backgroundImage = `url(${this.playList.coverImgUrl})`
      // 定义一个数组接收歌单id
      const SongIds = []
      // 判断歌单类型 请求不同的数据
      if (this.$route.query.type === '推荐歌单') {
        // 获取歌单提者信息
        getPlayListUser(this.playList.userId).then(data => {
          this.playListUserData = data.profile
        })
        // 提取歌单中前20条歌曲并获取到歌曲id 放入数组中
        const songDataList = this.playList.trackIds.slice(0, 20)
        for (const key of songDataList) {
          SongIds.push(key.id)
        }
      } else if (this.$route.query.type === '最新专辑') {
        const songDataList = this.playList.songs.slice(0, 20)
        for (const key of songDataList) {
          SongIds.push(key.id)
        }
      }
      const ids = SongIds.toString()
      getSongDetail(ids).then(data => {
        this.songsDetailList = data.songs
      })
      this.ids = ids
      this.description = this.playList.description.split('\n').slice(0, 3)
    },
    // 监测到迷你播放器出现后延迟100ms刷新ScrollView
    MiniPlayer () {
      setTimeout(() => {
        this.$refs.scrollView.iscroll.refresh()
      }, 100)
    }
  },
  data () {
    return {
      playList: {},
      playListUserData: {},
      description: [],
      songsDetailList: [],
      ids: ''
    }
  },
  methods: {
    ...mapActions([
      'toggleLarge',
      'toggleMini',
      'changeSongData',
      'togglePlayStatus',
      'changeCurrentIndex'
    ]),
    backPage () {
      // 因为使用了push跳转 此处需要退回两次
      window.history.go(-2)
    },
    playAll (ids) {
      this.changeSongData(ids)
      this.toggleLarge(true)
      this.toggleMini(false)
      this.togglePlayStatus(true)
    },
    play (id) {
      this.toggleLarge(true)
      this.toggleMini(false)
      this.togglePlayStatus(true)
      this.changeCurrentIndex(0)
      this.changeSongData(id)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
.detail{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom:0;
  @include bg_sub_color;
  overflow: hidden;
  .box{
    /*padding-bottom: 130px;*/
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
            width: 120px;
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
          width: 100%;
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
        .back{
          position: absolute;
          bottom: 60px;
          right: 0;
          width: 110px;
          height: 50px;
          line-height: 50px;
          text-align: right;
          color: #eee;
          border-top-left-radius:20px;
          border-bottom-left-radius:20px;
          border: 1px solid #eee;
          font-size: 25px;
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
          @include clamp(3);
          span{
            i{
              font-size: 28px;
              color: #666;
              font-style: normal;
              //@include no-wrap;
            }
          }
        }
      }
    }
    .play-all{
      width: 100%;
      height: 100px;
      background:#eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3{
        margin-left: 15px;
        font-size: 28px;
        color: #333;
      }
      span{
        display: inline-block;
        width: 150px;
        height: 60px;
        line-height: 60px;
        background: #eee;
        font-size: 28px;
        text-align: center;
        border-radius: 30px;
        color: #fff;
        @include bg_color;
      }
    }
    .song-list{
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
            font-size: 26px;
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
              //@include font_size($font_medium);
              font-size: 28px;
              @include font_color_songName();
              @include no-wrap();
              @include clamp(1);
            }
            p:nth-child(2){
              width: 80%;
              height: 50%;
              line-height: 50px;
              //@include font_size($font_samll);
              font-size: 24px;
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
  }
  & .ch-pd-btm{
    padding-bottom: 130px;
  }
}
</style>
