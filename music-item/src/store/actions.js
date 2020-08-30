import { CHANGE_LARGE_PLAYER, CHANGE_MINI_PLAYER } from './mutations-type'
export default {
  toggleLarge ({ commit }, flag) {
    commit(CHANGE_LARGE_PLAYER, flag)
  },
  toggleMini ({ commit }, flag) {
    commit(CHANGE_MINI_PLAYER, flag)
  }
}
