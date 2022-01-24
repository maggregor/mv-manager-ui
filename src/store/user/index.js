import router from '@/router'
import { notification } from 'ant-design-vue'
import store from 'store'

import * as oauth2 from '@/services/oauth2'

const getDefaultState = () => {
  return {
    state: {
      id: '',
      name: '',
      email: '',
      avatar: '',
      accessToken: '',
      authorized: false,
      loading: false,
      accountFetchIsTouched: false,
      userLoaded: false,
    },
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
  namespaced: true,
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
      state.avatar = payload.avatar
      state.accessToken = payload.accessToken
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    LOGIN({ commit, dispatch, rootState }) {
      console.log(rootState.settings.authProvider)
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
      // commit('SET_STATE', {
      //   loading: true,
      // })
      // const currentAccount = mapAuthProviders[rootState.settings.authProvider].currentAccount
      // currentAccount().then(response => {
      //   if (response) {
      //     const { id, email, name, avatar, accessToken } = response
      //     commit('SET_STATE', {
      //       id,
      //       name,
      //       email,
      //       avatar,
      //       accessToken,
      //       authorized: true,
      //     })
      //   }
      //   commit('SET_STATE', {
      //     loading: false,
      //   })
      // })
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
    username: state => state.name.split(' ')[0],
    userIsLoaded: state => state.userIsLoaded,
  },
}
