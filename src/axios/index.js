import axios from 'axios'
import QS from 'qs'
import router from '@/router'

const Axios = axios.create({
  timeout: 8000, // 请求超时时间
  responseType: 'json', // 返回数据格式
  withCredentials: true, // 是否允许带cookie这些
  headers: { // 请求头
    common: {
      'Authorization': 'AUTH_TOKEN',
      'aaa': 'bbb'
    }
  }
})

// 通过环境去选择地址
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://www.baidu.com'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'https://www.ceshi.com'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://www.production.com'
}

// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(config => {
  console.log(`axios请求前拦截器`)
  // 利用qs模块序列化参数，避免string方法将符号转义
  config.method === 'post' && (config.data = QS.stringify(config.data))
  // 若是有做鉴权token , 就给头部带上token
  // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
  // 这里localStorage一般是请求成功后我们自行写入到本地的,因为你放在vuex刷新就没了
  // 一些必要的数据写入本地,优先从本地读取
  localStorage.token && (config.headers.Authorization = localStorage.token)
  return config
}, err => {
  console.log(`数据请求出现错误！请稍后再试！出错信息为${err}`)
})

// 返回数据处理(添加响应拦截器)
Axios.interceptors.response.use(res => {
  console.log(`axios请求获取数据后拦截器`)
  if (res.status && res.data) {
    // 在返回数据之前可以提取数据源中的部分有用信息
    // 例如：token、用户名、过期时间戳等
    // 直接使用localStorage、sessionStorage存储

    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!window.localStorage.getItem('loginUserBaseInfo')) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
      router.push({
        path: '/' // 此处没有配置login页面 暂时使用首页代替
      })
    } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
      let lifeTime = JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime * 1000
      let nowTime = new Date().getTime() // 当前时间的时间戳

      if (nowTime > lifeTime) {
        console.log(`登录状态信息过期,请重新登录`)
        router.push({
          path: '/' // 此处没有配置login页面 暂时使用首页代替
        })
      }
    }
    return res
  } else {
    // 不同的status跳转不同的页面
    switch (res.status) {
      case 404:
        router.push({
          path: '/error/404'
        })
        break
      case 500:
        router.push({
          path: '/error/500'
        })
        break
      default:
        router.push({
          path: '/error/404'
        })
        break
    }
  }
}, err => console.log(`数据请求出现错误！请稍后再试！出错信息为${err}`))

export default {
  install (Vue, option) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: Axios
    })
  }
}
