/*
  为解决actions中传递方法名为字符串时无代码提示容易出错的问题
  于是将方法名定义为常量传递
*/

export const CHANGE_LARGE_PLAYER = 'changeLagerPlayer'
export const CHANGE_MINI_PLAYER = 'changeMiniPlayer'
export const CHANGE_PLAY_STATUS = 'changePlayStatus'
export const CHANGE_PLAY_MODE = 'changePlayMode'
export const CHANGE_FAVORITE_STATUS = 'changeFavoriteStatus'
export const GET_SONG_DATA = 'getSongData'
export const DEL_SONG = 'deleteSong'
export const CHANGE_CURRENT_INDEX = 'changeCurrentIndex'
export const CHANGE_CURRENT_SONG = 'changeCurrentSong'
export const CHANGE_TIPS_MSG = 'changeTipsMsg'
export const CHANGE_CURRENT_TIME = 'changeCurrentTime'
