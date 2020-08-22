<template>
<div class="header" @click="changeTheme">
  <div class="header-left"></div>
  <p class="header-title" ref="headerTitle">网易云音乐</p>
  <div class="header-right"></div>
</div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      theme: [['theme', '网易云音乐'], ['theme1', 'QQ音乐'], ['theme2', '知渔音乐']],
      num: 0
    }
  },
  methods: {
    changeTheme () {
      this.num++
      if (this.num > 2) {
        this.num = 0
      }
      // 切换主题
      document.documentElement.setAttribute('data-theme', this.theme[this.num][0])
      this.$refs.headerTitle.innerHTML = this.theme[this.num][1]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
  .header{
    width: 100%;
    height: 100px;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    .header-left,.header-right{
      width: 84px;
      height: 84px;
      margin-top: 8px;
    }
    .header-left{
      @include bg_img('../assets/images/logo')
    }
    .header-right{
      @include bg_img('../assets/images/account')
    }
    .header-title{
      text-align: center;
      line-height: 100px;
      color:#fff;
      font-weight: bold;
      @include font_size($font_medium)
    }
  }

</style>
