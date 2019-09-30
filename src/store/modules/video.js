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
  async fetchVideos({ commit }) {
    try {
      let response = await Api().get(baseUrl)
      commit('GET_VIDEOS', response.data.data)
    } catch (e) {
      alert(e.response.data.message)
    }
  },
  async fetchVideoDetail({ commit }, payload) {
    let response = await Api().get(baseUrl + "/" + payload)
    commit('GET_VIDEO_DETAIL', response.data.data)
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