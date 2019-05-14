import { GET_TODO } from 'store/modules/moduleName/getterName'
export default {
  namespaced: true,
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    [GET_TODO] (state) {
      return state.todos[1]
    }
  }
}
