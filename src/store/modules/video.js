import Api from '@/services/api'
import router from '@/router'

const baseUrl = '/video'

export const state = {
  videos: [],
  video: {}
}

export const getters = {
  getVideos: state => state.videos,
  getVideoDetail: state => state.video
}

export const actions = {
  async fetchVideos({ commit, dispatch }) {
    try {
      let response = await Api().get(baseUrl)
      commit('GET_VIDEOS', response.data.data)
    } catch(e) {
      if (e.response.status === 401) {
        dispatch('logout', (e.response.data.message))
      } else {
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
    }
  },
  async fetchVideoDetail({ commit, dispatch }, payload) {
    try {
      let response = await Api().get(baseUrl + "/" + payload)
      commit('GET_VIDEO_DETAIL', response.data.data)
    } catch(e) {
      if (e.response.status === 401) {
        dispatch('logout', e.response.data.message)
      } else {
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
    }
  },
  async addVideo({ dispatch }, payload) {
    try {
      dispatch('setLoading', true)
      await Api().post(baseUrl, payload)
      setTimeout(() => { 
        dispatch('setSnackbar', { text: "Success Add Video" })
        dispatch('setLoading', false)
        router.push('/video')
      })
    } catch(e) {
      dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      dispatch('setLoading', false)
    }
  }
}

export const mutations = {
  GET_VIDEOS(state, data) {
    state.videos = data
  },
  GET_VIDEO_DETAIL(state, data) {
    state.video = data
  },
  ADD_VIDEO(state, data) {
    state.videos = state.videos.concat(data)
  }
}