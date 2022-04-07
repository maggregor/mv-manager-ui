const getDefaultState = () => {
  return {
    unreachableBackendServer: false,
  }
}

const state = getDefaultState()

export default {
  state,
  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    UNREACHABLE_BACKEND_SERVER({ commit }) {
      commit('SET_STATE', { unreachableBackendServer: true })
    },
  },
  getters: {
    isUnreachable: (state, getters) => getters.isBackendServerUnreachable,
    isBackendServerUnreachable: state => state.unreachableBackendServer,
  },
}
