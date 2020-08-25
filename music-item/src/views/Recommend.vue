<template>
<div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners='bannerData'></Banner>
        <personalized :datas='personalizedData' :title="'推荐歌单'" @getDetail="getDetail"></personalized>
        <personalized :datas='topAlbum' :title="'最新专辑'"></personalized>
        <song-list :songsData="songs"></song-list>
      </div>
    </ScrollView>
    <router-view></router-view>
</div>
</template>

<script>
import Banner from '../components/Banner'
import Personalized from '../components/Personalized'
import SongList from '../components/SongList'
import ScrollView from '../components/ScrollView'
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
    getDetail (id) {
      this.$router.push({
        path: `/recommend/detail/${id}`
      })
    }
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  }
}
</script>

<style scoped>
.recommend{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
