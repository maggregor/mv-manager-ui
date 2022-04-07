import router from '@/router'
import { notification } from 'ant-design-vue'
import { login, logout, currentAccount } from '@/services/oauth2'
import { trackIdentify } from '@/analyticsHelper'
const getDefaultState = () => {
  return {
    id: '',
    name: '',
    email: '',
    teamName: '',
    firstName: '',
    idToken: '',
    authorized: null,
    loading: false,
  }
}

const state = getDefaultState()

export default {
  state,
  mutations: {
    SET_USER_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
    SET_USER(state, payload) {
      state.id = payload.id
      state.name = payload.name
      state.email = payload.email
      state.firstName = payload.firstName
      state.teamname = payload.teamname
      state.idToken = payload.idToken
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    LOGIN({ commit, dispatch, rootState }) {
      commit('SET_USER_STATE', {
        loading: true,
      })
      login().then(user => {
        if (user) {
          dispatch('LOAD_CURRENT_ACCOUNT')
          notification.success({
            message: 'Logged In',
            description: 'You have successfully logged in!',
          })
        }
        if (!user) {
          commit('SET_USER_STATE', {
            loading: false,
          })
        }
      })
    },
    LOAD_CURRENT_ACCOUNT({ commit }) {
      return currentAccount()
        .then(response => {
          const { id, email, name } = response.data
          const firstName = response.data.first_name
          const teamName = response.data.team_name
          commit('SET_USER_STATE', {
            id,
            name,
            email,
            firstName,
            teamName,
            authorized: true,
          })
          trackIdentify({ id, name, email, teamName })
        })
        .catch(e => {
          commit('SET_USER_STATE', { authorized: false })
          throw e
        })
    },
    LOGOUT({ commit }) {
      logout().then(() => {
        commit('SET_USER_STATE', { authorized: false })
        router.push('/login')
      })
    },
  },
  getters: {
    user: state => state,
    isAuthorized: state => state.authorized,
    idToken: state => state.idToken,
    firstName: state => state.firstName,
    userIsLoaded: state => state.userIsLoaded,
  },
}
