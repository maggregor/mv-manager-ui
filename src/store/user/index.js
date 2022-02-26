import router from '@/router'
import { notification } from 'ant-design-vue'

import * as oauth2 from '@/services/oauth2'

const getDefaultState = () => {
  return {
    id: '',
    name: '',
    email: '',
    firstName: '',
    accessToken: 'qweqwe',
    authorized: false,
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

      const login = mapAuthProviders[rootState.settings.authProvider].login
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
    LOAD_CURRENT_ACCOUNT({ commit, rootState }) {
      commit('SET_STATE', {
        loading: true,
      })
      const currentAccount = mapAuthProviders[rootState.settings.authProvider].currentAccount
      currentAccount().then(response => {
        if (response) {
          const { id, email, name } = response
          const accessToken = response['access_token']
          const firstName = response['first_name']
          commit('SET_STATE', {
            id,
            name,
            email,
            firstName,
            accessToken,
            authorized: true,
          })
        }
        commit('SET_STATE', {
          loading: false,
        })
      })
    },
    LOGOUT({ commit, rootState }) {
      const logout = mapAuthProviders[rootState.settings.authProvider].logout
      logout().then(() => {
        commit('SET_STATE', { authorized: false })
        router.push('/login')
      })
    },
  },
  getters: {
    user: state => state,
    accessToken: state => state.accessToken,
    username: state => state.name.split(' ')[0],
    userIsLoaded: state => state.userIsLoaded,
  },
}
