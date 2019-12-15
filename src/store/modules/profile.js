import Api from '@/services/api'
import router from '@/router'

const baseUrl = '/profile'

export const state = {
  profile: {},
  name: localStorage.getItem('profile') || null,
  images: localStorage.getItem('profile') || null
}

export const getters = {
  getProfile: state => state.profile,
  getName: state => state.name,
  getImages: state => state.images
}

export const actions = {
  async fetchProfile({ commit, dispatch }) {
    try {
      let response = await Api().get(baseUrl)
      commit('SET_PROFILE', response.data.data)
    } catch (e) {
      dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      dispatch('logout')
    }
  },
  async saveProfile({ dispatch }, payload) {
    try {
      dispatch('setLoading', true)
      await Api().put(baseUrl, payload)
      setTimeout(() => {
        dispatch('setSnackbar', { text: "Success Updated Profile" })
        dispatch('setLoading', false)
        router.push('/')
      })
    } catch (e) {
      if (e.response.status === 422) {
        dispatch('setFormError', e.response.data.data)
      } else {
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
      dispatch('setLoading', false)
    }
  }
}

export const mutations = {
  SET_PROFILE(state, data) {
    localStorage.setItem('name', data.name)
    localStorage.setItem('images', data.images)
    state.name = data.name
    state.images = data.images
    state.profile = data
  },
  DELETE_PROFILE(state) {
    localStorage.clear()
    state.name = state.images = state.profile = null
  }
}