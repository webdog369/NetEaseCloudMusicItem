export default {
  LargePlayer (state) {
    return state.LargePlayer
  },
  MiniPlayer (state) {
    return state.MiniPlayer
  },
  isPlaying (state) {
    return state.isPlaying
  },
  playMode (state) {
    return state.playMode
  },
  favorite (state) {
    return state.favorite
  },
  songData (state) {
    return state.songData
  },
  currentSong (state) {
    const obj = {
      name: '暂无歌曲',
      singer: '暂无歌手',
      picUrl: '../../assets/images/disc.png'
    }
    if (state.songData.length === 0) {
      return obj
    }
    return state.songData[state.currentIndex]
  }
}
