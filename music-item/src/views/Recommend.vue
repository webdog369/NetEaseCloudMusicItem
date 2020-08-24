<template>
<div class="recommend">
  <Banner :banners='bannerData'></Banner>
  <personalized :personalized='personalizedData'></personalized>
</div>
</template>

<script>
import Banner from '../components/Banner'
import Personalized from '../components/Personalized'
import { getPersonalized, getBanner } from '../api'

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
  },
  data () {
    return {
      bannerData: [],
      personalizedData: []
    }
  },
  components: {
    Banner,
    Personalized
  }
}
</script>

<style scoped>

</style>
