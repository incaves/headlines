/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基础路径
})
request.interceptors.request.use(
  (config) => {
    const { user } = store.state // 结构出来user
    // 有user 或者user是有效的
    if (user && user.data.token) {
      // 给每个请求头挂载token
      config.headers.Authorization = `Bearer ${user.data.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default request
