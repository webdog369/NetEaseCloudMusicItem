import {
  CHANGE_LARGE_PLAYER,
  CHANGE_MINI_PLAYER,
  CHANGE_PLAY_STATUS,
  CHANGE_PLAY_MODE,
  CHANGE_FAVORITE_STATUS
} from './mutations-type'
export default {
  toggleLarge ({ commit }, payload) {
    commit(CHANGE_LARGE_PLAYER, payload)
  },
  toggleMini ({ commit }, payload) {
    commit(CHANGE_MINI_PLAYER, payload)
  },
  togglePlayStatus ({ commit }, payload) {
    commit(CHANGE_PLAY_STATUS, payload)
  },
  togglePlayMode ({ commit }, payload) {
    commit(CHANGE_PLAY_MODE, payload)
  },
  toggleFavoriteStatus ({ commit }, payload) {
    commit(CHANGE_FAVORITE_STATUS, payload)
  }
}
