// 管理各种请求接口地址
import Network from './network'

// 获取banner数据
export const getBanner = () => Network.get('banner?type=2')
// 获取推荐歌单数据
export const getPersonalized = () => Network.get('personalized?limit=9')
