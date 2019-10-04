import Api from '@/services/api'

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
        if (e.response.data.message === "Token has expired") {
          dispatch('refreshToken')
        } else {
          dispatch('logout', e.response.data.message)
        }
      } else {
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
    }
  }
}

export const mutations = {
  GET_VIDEOS(state, data) {
    state.videos = data
  },
  GET_VIDEO_DETAIL(state, data) {
    state.video = data
  }
}