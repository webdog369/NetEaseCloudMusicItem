import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  // 存储共享数据
  state,
  // 改变共享数据的方法
  mutations,
  // 触发方法
  actions,
  // 提供获取共享数据的方法
  getters
})
