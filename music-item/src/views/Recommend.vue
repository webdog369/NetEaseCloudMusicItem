<template>
<div class="recommend">
    <ScrollView ref="scrollView">
      <div>
        <Banner :banners='bannerData'></Banner>
        <personalized :datas='personalizedData' :title="'推荐歌单'" @getDetail="getDetail"></personalized>
        <personalized :datas='topAlbum' :title="'最新专辑'" @getDetail="getDetail"></personalized>
        <song-list :songsData="songs"></song-list>
      </div>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
</div>
</template>

<script>
import Banner from '../components/recomment/Banner'
import Personalized from '../components/recomment/Personalized'
import SongList from '../components/recomment/SongList'
import ScrollView from './ScrollView'
import { mapGetters } from 'vuex'
import { getPersonalized, getBanner, getTopAlbum, getNewSong } from '../api'

export default {
  name: 'Recommend',
  created () {
    // 获取banner数据
    getBanner()
      .then(data => { this.bannerData = data.banners })
      .catch(err => console.log(err))

    // 获取推荐歌单的数据
    getPersonalized()
      .then(data => { this.personalizedData = data.result })
      .catch(err => console.log(err))

    // 获取新碟上架数据
    getTopAlbum().then(data => {
      this.topAlbum = data.albums.splice(0, 6)
    }).catch(err => console.log(err))

    // 获取最新歌曲
    getNewSong().then(data => {
      this.songs = data.result
    }).catch(err => console.log(err))
  },
  data () {
    return {
      bannerData: [],
      personalizedData: [],
      topAlbum: [],
      songs: []
    }
  },
  methods: {
    getDetail (data) {
      this.$router.push({
        path: `/recommend/detail/${data[0]}?type=${data[1]}`
      })
    }
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  computed: {
    ...mapGetters([
      'MiniPlayer'
    ])
  },
  watch: {
    // 监测页面歌曲列表加载完成后延迟100ms刷新ScrollView
    songs () {
      setTimeout(() => {
        this.$refs.scrollView.iscroll.refresh()
      }, 100)
    },
    // 监测到迷你播放器出现后延迟100ms刷新ScrollView
    MiniPlayer () {
      setTimeout(() => {
        this.$refs.scrollView.iscroll.refresh()
      }, 100)
    }
  }
}
</script>

<style scoped lang="scss">
.recommend{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  /*bottom: 130px;*/
  bottom: 0;
  overflow: hidden;
  .v-enter{
    transform:translateX(100%);
    opacity: 0;
  }
  .v-enter-active{
    transition: all 500ms ease-in-out;
  }
  .v-enter-to{
    transform:translateX(0);
    opacity: 1;
  }
  .v-leave{
    transform:translateX(0);
    opacity: 1;
  }
  .v-leave-active{
    transition: all 500ms ease-in-out;
  }
  .v-leave-to{
    transform:translateX(100%);
    opacity: 0;
  }
}
</style>
