import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // vant
import 'vant/lib/index.css' // vant样式
import '@/styles/index.less' // global css
import 'amfe-flexible' // 动态设置rem基准值(html)
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
