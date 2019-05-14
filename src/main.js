import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import axios from '@/axios'
import setRem from 'common/js/rem'

Vue.config.productionTip = false
;[
  axios
].map(item => Vue.use(item))
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = () => {
  setRem()
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
