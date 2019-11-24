import Api from '@/services/api'
import router from '@/router'

const baseUrl = '/video'

export const state = {
  videos: [],
  videoTotal: 0,
  video: {}
}

export const getters = {
  getVideos: state => state.videos,
  getVideoDetail: state => state.video,
  getVideoTotal: state => state.videoTotal
}

export const actions = {
  async fetchVideos({ commit, dispatch }, payload) {
    try {
      let response = await Api().get(baseUrl + '?page=' + payload.page + '&limit=' + payload.limit)
      commit('SET_VIDEOS', response.data.data)
    } catch (e) {
      if (e.response.status === 401) {
        // dispatch('logout', (e.response.data.message))
        dispatch('logout')
      } else {
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
    }
  },
  async fetchVideoDetail({ commit, dispatch }, payload) {
    try {
      let response = await Api().get(`${baseUrl}/${payload}`)
      commit('SET_VIDEO_DETAIL', response.data.data)
    } catch (e) {
      if (e.response.status === 401) {
        // dispatch('logout', e.response.data.message)
        dispatch('logout')
      } else {
        dispatch('setFormError', [])
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
    } catch (e) {
      if (e.response.status === 422) {
        dispatch('setFormError', e.response.data.data)
      } else {
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
      dispatch('setLoading', false)
    }
  },
  async updateVideo({ dispatch }, payload) {
    try {
      dispatch('setLoading', true)
      await Api().put(`${baseUrl}/${payload.id}`, payload)
      setTimeout(() => {
        dispatch('setSnackbar', { text: "Success Update Video" })
        dispatch('setLoading', false)
        router.push('/video')
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
  async deleteVideo({ dispatch }, payload) {
    try {
      dispatch('setLoading', true)
      await Api().delete(`${baseUrl}/${payload.id}`)
      setTimeout(() => {
        dispatch('setSnackbar', { text: "Success Delete Video" })
        dispatch('setLoading', false)
        dispatch('fetchVideos')
      })
    } catch (e) {
      dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      dispatch('setLoading', false)
    }
  }
}

export const mutations = {
  SET_VIDEOS(state, data) {
    state.videos = data.data,
    state.videoTotal = data.total
  },
  SET_VIDEO_DETAIL(state, data) {
    state.video = data
  }
}