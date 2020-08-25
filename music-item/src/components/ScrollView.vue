<template>
<div id="wrapper" ref="wrapper">
  <slot></slot>
</div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mousewheel: false,
      scrollbar: true,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })

    // 通过MutationObserver监听页面加载完成
    new MutationObserver(mutations => this.iscroll.refresh())
      .observe(this.$refs.wrapper, {
        childList: true, // 观察子节点变化 新增/修改/删除
        subtree: true, // 观察后代节点 默认为false
        attributeFilter: ['height', 'offsetHeight'] // 观察什么属性的变化
      })
    /*    setTimeout(() => {
      console.log(this.iscroll.maxScrollY)
      this.iscroll.refresh()
      console.log(this.iscroll.maxScrollY)
    }, 50) */
  }
}
</script>

<style scoped lang="scss">
#wrapper{
  width: 100%;
  height: 100%;
}
</style>
