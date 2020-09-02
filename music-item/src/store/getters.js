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
      lyric: '暂无歌词',
      songUrl: ''
    }
    if (state.songData.length === 0) {
      return obj
    } else {
      return state.songData[state.currentIndex]
    }
  },
  currentIndex (state) {
    return state.currentIndex
  },
  Tips (state) {
    return state.Tips
  }
}
