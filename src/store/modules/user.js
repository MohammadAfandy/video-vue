import Api from '@/services/api'
import router from '@/router'

const baseUrl = '/user'

export const state = {
  users: [],
  userTotal: 0,
  user: {}
}

export const getters = {
  getUsers: state => state.users,
  getUserDetail: state => state.user,
  getUserTotal: state => state.userTotal
}

export const actions = {
  async fetchUsers({ commit, dispatch }, payload) {
    try {
      let response = await Api().get(baseUrl + '?page=' + payload.page + '&limit=' + payload.limit + '&sort=' + payload.sort)
      commit('SET_USERS', response.data.data)
    } catch (e) {
      if (e.response.status === 401) {
        dispatch('logout')
      } else {
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
    }
  },
  async fetchUserDetail({ commit, dispatch }, payload) {
    try {
      let response = await Api().get(`${baseUrl}/${payload}`)
      commit('SET_USER_DETAIL', response.data.data)
    } catch (e) {
      if (e.response.status === 401) {
        dispatch('logout')
      } else {
        dispatch('setFormError', [])
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
    }
  },
  async addUser({ dispatch }, payload) {
    try {
      dispatch('setLoading', true)
      await Api().post(baseUrl, payload)
      setTimeout(() => {
        dispatch('setSnackbar', { text: "Success Add User" })
        dispatch('setLoading', false)
        router.push({ name: 'user'})
      })
    } catch (e) {
      if (e.response.status === 422) {
        dispatch('setFormError', e.response.data.data)
      } else {
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
      dispatch('setLoading', false)
    }
  },
  async updateUser({ dispatch }, payload) {
    try {
      dispatch('setLoading', true)
      await Api().put(`${baseUrl}/${payload.id}`, payload)
      setTimeout(() => {
        dispatch('setSnackbar', { text: "Success Update User" })
        dispatch('setLoading', false)
        router.push({ name: 'user'})
      })
    } catch (e) {
      if (e.response.status === 422) {
        dispatch('setFormError', e.response.data.data)
      } else {
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
      dispatch('setLoading', false)
    }
  },
  async deleteUser({ dispatch }, payload) {
    try {
      dispatch('setLoading', true)
      await Api().delete(`${baseUrl}/${payload.id}`)
      setTimeout(() => {
        dispatch('setSnackbar', { text: "Success Delete User" })
        dispatch('setLoading', false)
        dispatch('fetchUsers')
      })
    } catch (e) {
      dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      dispatch('setLoading', false)
    }
  }
}

export const mutations = {
  SET_USERS(state, data) {
    state.users = data.data,
    state.userTotal = data.total
  },
  SET_USER_DETAIL(state, data) {
    state.user = data
  }
}