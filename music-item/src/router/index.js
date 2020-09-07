import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件 (全部加载)
// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'

// 导入组件 (按需加载)
// const Recommend = (resolve) => {
//   import('../views/Recommend').then((module) => {
//     resolve(module)
//   })
// }
const Recommend = () => {
  return new Promise((resolve, reject) => {
    import('../views/Recommend').then((data) => {
      resolve(data)
    }).catch((err) => {
      reject(err)
    })
  })
}

// (resolve, reject) => {
//   import('../views/Recommend').then((module) => {
//     resolve(module)
//   })
// }
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}

// 调用vue-router插件
Vue.use(VueRouter)

// 定义路由规则
const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      { path: 'detail/:id', component: Detail }
    ]
  },

  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search }
]

// 创建vue-router实例对象
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 导出vue-router
export default router
