<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <router-view></router-view>
       <Player></Player>
  </div>
</template>
<script>
import Header from './components/Header'
import Tabbar from './components/Tabbar'
// import Player from './views/Player'
const Player = (resolve) => {
  import('./views/Player').then((data) => {
    resolve(data)
  }).catch((err) => {
    console.error(err)
  })
}
export default {
  name: 'App',
  components: {
    Header,
    Tabbar,
    Player
  }
}
</script>
<style lang="scss">
  @import 'assets/css/variable';
  @import "~animate.css";
  #app{
    position: relative;
    width: 100%;
    height: 100%;
  }

</style>
