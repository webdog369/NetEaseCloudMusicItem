<template>
  <div id="app">
    <Header></Header>
  </div>
</template>
<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
  }
}
</script>
<style lang="scss">
  @import 'assets/css/variable';
  #app{
    position: relative;
    width: 100%;
    height: 100%;
  }

</style>
