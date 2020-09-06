import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.gif')
})
// 真机调试插件
// import VConsole from 'vconsole'
// const Vconsole = new VConsole()
// Vue.use(Vconsole)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
