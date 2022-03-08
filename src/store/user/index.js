import router from '@/router'
import { notification } from 'ant-design-vue'

import { login, logout, currentAccount, grantAccessBigQuery } from '@/services/oauth2'

const getDefaultState = () => {
  return {
    id: '',
    name: '',
    email: '',
    firstName: '',
    accessToken: '',
    authorized: null,
    insufficientPermissions: false,
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
      state.accessToken = payload.accessToken
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
          const { id, email, name, access_token, first_name } = response.data
          commit('SET_USER_STATE', {
            id,
            name,
            email,
            firstName: first_name,
            accessToken: access_token,
            authorized: true,
          })
        })
        .catch(() => {
          commit('SET_USER_STATE', { authorized: false })
        })
    },
    LOGOUT({ commit }) {
      logout().then(() => {
        commit('SET_USER_STATE', { authorized: false })
        router.push('/login')
      })
    },
    GRANT_BIGQUERY_ACCESS({ commit }) {
      grantAccessBigQuery().then(user => {
        if (user) {
          dispatch('LOAD_CURRENT_ACCOUNT')
          notification.success({
            message: 'Successfully',
            description: 'Granted with success !',
          })
        }
        if (!user) {
          commit('SET_USER_STATE', {
            loading: false,
          })
        }
      })
    },
  },
  getters: {
    user: state => state,
    accessToken: state => state.accessToken,
    firstName: state => state.firstName,
    userIsLoaded: state => state.userIsLoaded,
    hasInsufficientPermissions: state => state.insufficientPermissions,
  },
}
