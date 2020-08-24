<template>
<div class="recommend">
  <Banner :banners='bannerData'></Banner>
</div>
</template>

<script>
import Banner from '../components/Banner'
import { getBanner } from '../api'

export default {
  name: 'Recommend',
  created () {
    // 获取banner数据
    getBanner().then(data => {
      this.bannerData = data.data.banners
    }).catch(err => {
      console.log(err)
    })
  },
  data () {
    return {
      bannerData: []
    }
  },
  components: {
    Banner
  }
}
</script>

<style scoped>

</style>
