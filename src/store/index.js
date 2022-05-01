import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'INCAVES_USER' // 独一无二的key
export default new Vuex.Store({
  mutations: {
    setUser(state, data) {
      // 存储token到Vuex中
      state.user = data
      // 存储token到本地存储
      setItem(TOKEN_KEY, state.user)
    }
  },
  state: {
    // 一个对象,存储当前用户登陆用户信息(token等数据)
    user: getItem(TOKEN_KEY) // 从本地存储中获取 token  TOKEN_KEY 标识符
  },
  actions: {},
  modules: {}
})
