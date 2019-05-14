import { CHANGE_CONUNT } from 'store/modules/moduleName/mutationName'
import { OUTPUT_COUNT } from 'store/modules/moduleName/getterName'
import { ACTION_CHANGE_COUNT } from 'store/modules/moduleName/actionName'

export default {
  namespaced: true,
  state: { // 公共state
    count: 1
  },
  mutations: {
    [CHANGE_CONUNT] (state, payload = 1) {
      state.count += payload
    }
  },
  actions: {
    [ACTION_CHANGE_COUNT] ({ commit }, payload) {
      commit(CHANGE_CONUNT, payload)
    }
  },
  getters: {
    [OUTPUT_COUNT] (state) {
      return state.count * 2
    }
  }
}
