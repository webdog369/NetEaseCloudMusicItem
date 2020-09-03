export default {
  // 全屏播放器
  LargePlayer: false,
  // 迷你播放器
  MiniPlayer: false,
  // 播放状态
  isPlaying: false,
  // 播放模式 0:列表循环 | 1:单曲循环 | 2:随机播放
  playMode: 0,
  // 点赞状态
  favorite: false,
  // 播放列表
  songData: [],
  // 当前播放歌曲
  currentSong: {},
  // 当前播放歌曲缩影
  currentIndex: 0,
  // 当前Tips提示信息
  Tips: ['', false],
  currentTime: 0
}
