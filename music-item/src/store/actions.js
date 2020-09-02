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
import { getSongDetail, getSongUrl, getSongLyric } from '../api'
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
  },
  async changeSongData ({ commit }, payload) {
    const res = await getSongDetail(payload)
    const songUrls = await getSongUrl(payload)
    // const songLyric = await getSongLyric(payload)
    const list = []
    // 遍历加入歌曲信息
    res.songs.forEach(function (value) {
      const obj = {}
      obj.name = value.name
      obj.singer = value.ar[0].name
      obj.picUrl = value.al.picUrl
      obj.id = value.id

      // 遍历加入歌曲播放地址 因为获取到的url不是按顺序的 所以要筛选后再加入obj
      for (const key of songUrls.data) {
        if (key.id === value.id) {
          obj.songUrl = key.url
        }
      }
      // 格式化歌词的方法
      getSongLyric(value.id).then(data => {
        const lyrics = data.lrc.lyric.split('\n')
        // [00:00.000] 作曲 : 林俊杰
        // 1.定义正则表达式提取[00:00.000]
        const reg1 = /\[\d*:\d*\.\d*\]/g
        // 2.定义正则表达式提取 [00
        // const reg2 = /\[\d*!/i
        // 3.定义正则表达式提取 :00
        const reg3 = /\:\d*/i
        // 4.定义对象保存处理好的歌词
        const lyricObj = {}
        lyrics.forEach(function (lyric) {
          // 1.提取时间
          let timeStr = lyric.match(reg1)
          if (!timeStr) { return }
          timeStr = timeStr[0]
          // 2.提取分钟
          const minStr = timeStr.match(/\[\d*/i)[0].substr(1)
          // 3.提取秒钟
          const secondStr = timeStr.match(reg3)[0].substr(1)
          // 4.合并时间, 将分钟和秒钟都合并为秒钟
          const time = parseInt(minStr) * 60 + parseInt(secondStr)
          // 5.处理歌词
          const text = lyric.replace(reg1, '').trim()
          // 6.保存数据
          lyricObj[time] = text
        })
        // 加入当前歌曲的歌词
        obj.lyric = lyricObj
        list.push(obj)
      })

      // console.log(list)
    })

    commit(GET_SONG_DATA, list)
  },

  delSong ({ commit }, index) {
    commit(DEL_SONG, index)
  },
  changeCurrentIndex ({ commit }, index) {
    commit(CHANGE_CURRENT_INDEX, index)
  },
  changeTipsMsg ({ commit }, msg) {
    commit(CHANGE_TIPS_MSG, msg)
  }

}
