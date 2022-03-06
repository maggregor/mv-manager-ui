import router from '@/router'
import { notification } from 'ant-design-vue'

import * as oauth2 from '@/services/oauth2'

const getDefaultState = () => {
  return {
    id: '',
    name: '',
    email: '',
    firstName: '',
    accessToken: '',
    authorized: null,
    loading: false,
  }
}

const state = getDefaultState()

const mapAuthProviders = {
  oauth2: {
    login: oauth2.login,
    currentAccount: oauth2.currentAccount,
    logout: oauth2.logout,
  },
}

export default {
  state,
  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
    SET_USER(state, payload) {
      state.id = payload.id
      state.name = payload.name
      state.email = payload.email
      state.firstName = payload.firstName
      state.accessToken = payload.accessToken
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    LOGIN({ commit, dispatch, rootState }) {
      commit('SET_STATE', {
        loading: true,
      })

      const login = mapAuthProviders['oauth2'].login
      login().then(user => {
        if (user) {
          dispatch('LOAD_CURRENT_ACCOUNT')
          notification.success({
            message: 'Logged In',
            description: 'You have successfully logged in!',
          })
        }
        if (!user) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    LOAD_CURRENT_ACCOUNT({ commit }) {
      const currentAccount = mapAuthProviders['oauth2'].currentAccount
      return currentAccount()
        .then(response => {
          const { id, email, name, access_token, first_name } = response.data
          commit('SET_STATE', {
            id,
            name,
            email,
            firstName: first_name,
            accessToken: access_token,
            authorized: true,
          })
        })
        .catch(() => {
          commit('SET_STATE', { authorized: false })
        })
    },
    LOGOUT({ commit }) {
      const logout = mapAuthProviders['oauth2'].logout
      logout().then(() => {
        commit('SET_STATE', { authorized: false })
        router.push('/login')
      })
    },
  },
  getters: {
    user: state => state,
    accessToken: state => state.accessToken,
    firstName: state => state.firstName,
    userIsLoaded: state => state.userIsLoaded,
  },
}
