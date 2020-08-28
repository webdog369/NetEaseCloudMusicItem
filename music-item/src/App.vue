<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <router-view></router-view>
    <Player v-show="false"></Player>
  </div>
</template>
<script>
import Header from './components/Header'
import Tabbar from './components/Tabbar'
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    Header,
    Tabbar,
    Player
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
