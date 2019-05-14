import Vue from 'vue'
import Vuex from 'vuex'
import GL from 'store/modules/GL'
import LWD from 'store/modules/LWD'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    GL,
    LWD
  }
})
