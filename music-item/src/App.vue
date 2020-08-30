<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <router-view></router-view>
      <transition>
       <Player></Player>
      </transition>
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
    .v-enter{
      transform:translateY(100%);
    }
    .v-enter-active{
      transition: all 500ms ease-in-out;
    }
    .v-enter-to{
      transform:translateY(0);;
    }
    .v-leave{
      transform:translateY(0);;
    }
    .v-leave-active{
      transition: all 500ms ease-in-out;
    }
    .v-leave-to{
      transform:translateY(100%);
    }
  }

</style>
