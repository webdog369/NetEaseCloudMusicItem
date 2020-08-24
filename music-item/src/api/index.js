// 管理各种请求接口地址
import Network from './network'
export const getBanner = () => Network.get('banner?type=2')
