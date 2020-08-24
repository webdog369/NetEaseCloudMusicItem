import axios from 'axios'

// 进行全局配置
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = 3000

// 封装请求方法
export default {
  // 利用Promise封装

  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      }).then(function (res) {
        resolve(res)
      }).catch(function (err) {
        reject(err)
      })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data).then(function (res) {
        resolve(res)
      }).catch(function (err) {
        reject(err)
      })
    })
  }

  // 利用async/await封装
  // get: async function (path = '', data = {}) {
  //   return await axios.get(path, { params: data })
  // },
  // post: async function (path = '', data = {}) {
  //   return await axios.post(path, data)
  // }
}
