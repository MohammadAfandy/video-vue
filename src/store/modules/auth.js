import Api from '@/services/api'

const baseUrl = '/auth'

export const state = {
  userInfo: {}
}

export const getters = {
  getUserInfo: state => state.userInfo
}

export const actions = {
  async login({ commit }, payload) {
    try {
      let response = await Api().post(`${baseUrl}/login`, payload)
      commit('SET_USER_INFO', response.data.data.user)
      localStorage.setItem('token', response.data.data.token)
      return response
    } catch (e) {
      return e.response
    }
  },
  async logout({ commit }) {
    await commit('DELETE_USER_INFO')
    localStorage.removeItem('token')
  }
}

export const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data
  },
  DELETE_USER_INFO(state) {
    state.userInfo = {}
  }
}