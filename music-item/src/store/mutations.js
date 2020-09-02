
import {
  CHANGE_LARGE_PLAYER,
  CHANGE_MINI_PLAYER,
  CHANGE_PLAY_STATUS,
  CHANGE_PLAY_MODE,
  CHANGE_FAVORITE_STATUS,
  GET_SONG_DATA,
  DEL_SONG,
  CHANGE_CURRENT_INDEX,
  CHANGE_TIPS_MSG
} from './mutations-type'

export default {
  // 若要使用常量作为方法名称需要用[]括起来
  [CHANGE_LARGE_PLAYER] (state, payload) {
    state.LargePlayer = payload
  },
  [CHANGE_MINI_PLAYER] (state, payload) {
    state.MiniPlayer = payload
  },
  [CHANGE_PLAY_STATUS] (state, payload) {
    state.isPlaying = payload
  },
  [CHANGE_PLAY_MODE] (state, payload) {
    state.playMode += 1
    if (state.playMode > 2) {
      state.playMode = 0
    }
  },
  [CHANGE_FAVORITE_STATUS] (state, payload) {
    state.favorite = payload
  },
  [GET_SONG_DATA] (state, payload) {
    state.songData = payload
  },
  [DEL_SONG] (state, index) {
    state.songData.splice(index, 1)
    if (state.songData.length === 0) {
      state.LargePlayer = false
      state.MiniPlayer = false
      state.isPlaying = false
    }
  },
  [CHANGE_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [CHANGE_TIPS_MSG] (state, msg) {
    state.Tips = msg
    setTimeout(function () {
      state.Tips = ['', false]
    }, 2000)
  }
}
