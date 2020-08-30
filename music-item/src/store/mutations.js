import { CHANGE_LARGE_PLAYER, CHANGE_MINI_PLAYER } from './mutations-type'

export default {
  // 若要使用常量作为方法名称需要用[]括起来
  [CHANGE_LARGE_PLAYER] (state, flag) {
    state.LargePlayer = flag
  },
  [CHANGE_MINI_PLAYER] (state, flag) {
    state.MiniPlayer = flag
  }
}
