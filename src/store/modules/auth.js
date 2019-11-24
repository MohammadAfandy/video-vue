import Api from '@/services/api'
import router from '@/router'

const baseUrl = '/auth'

export const state = {
  token: localStorage.getItem('token') || null,
  // username: localStorage.getItem('username') || null,
  // role: localStorage.getItem('role') || null,
}

export const getters = {
  getToken: state => state.token,
  // getUsername: state => state.username,
  // getRole: state => state.role
}

export const actions = {
  async login({ commit, dispatch }, payload) {
    try {
      dispatch('setLoading', true)
      let response = await Api().post(`${baseUrl}/login`, payload)
      commit('SET_TOKEN', response.data.data.token)
      setTimeout(() => { 
        dispatch('setSnackbar', { text: "Login Success" })
        dispatch('setLoading', false)
        router.push('/')
      }, 1000)
    } catch(e) {
      if (e.response.status === 422) {
        dispatch('setFormError', e.response.data.data)
      } else {
        dispatch('setFormError', [])
        dispatch('setSnackbar', { text: e.response.data.message, color: "error" })
      }
      dispatch('setLoading', false)
    }
  },
  // async fetchUserInfo({ commit, dispatch }) {
  //   try {
  //     let response = await Api().get(`${baseUrl}/info`)
  //     commit('SET_USER_INFO', response.data.data.info)
  //   } catch(e) {
  //     // dispatch('logout', e.response.data.message)
  //     dispatch('logout')
  //   }
  // },
  logout({ commit, dispatch }, logoutInfo) {
    localStorage.clear()
    logoutInfo = logoutInfo ? " - " + logoutInfo : ""
    commit('DELETE_PROFILE')
    router.push('/login')
    dispatch('setSnackbar', { text: "You've been logged out" + logoutInfo , color: "error" })
  }
}

// export const actions = {
//   async login({ commit }, payload) {
//     return new Promise((resolve, reject) => {
//       Api()
//         .post(`${baseUrl}/login`, payload)
//         .then((data) => {
//           if (data) {
//             if (
//               data.status === 200 ||
//               data.status === 201 ||
//               data.status === 202 ||
//               data.status === 204
//             ) {
//               resolve(data)
//               commit('SET_TOKEN', data.data.data.token)
//             }
//           }
//           reject(data)
//         })
//         .catch((response) => {
//           // localStorage.clear()
//           // commit('DELETE_USER_INFO')
//           // commit('DELETE_TOKEN')
//           reject(response)
//         })
//     })
//   },
//   async fetchUserInfo({ commit }) {
//     return new Promise((resolve, reject) => {
//       Api()
//         .get(`${baseUrl}/info`)
//         .then((data) => {
//           if (data) {
//             if (
//               data.status === 200 ||
//               data.status === 201 ||
//               data.status === 202 ||
//               data.status === 204
//             ) {
//               resolve(data)
//               commit('SET_USER_INFO', data.data.data.info)
//             }
//           }
//           reject(data)
//         })
//         .catch((response) => {
//           localStorage.clear()
//           commit('DELETE_USER_INFO')
//           commit('DELETE_TOKEN')
//           reject(response)
//         })
//     })
//   },
//   logout({ commit }) {
//     localStorage.clear()
//     commit('DELETE_USER_INFO')
//     commit('DELETE_TOKEN')
//   }
// }

export const mutations = {
  // SET_USER_INFO(state, data) {
  //   state.username = data.username
  //   state.role = data.role
  // },
  SET_TOKEN(state, data) {
    localStorage.setItem('token', data)
    state.token = data
  },
  // DELETE_USER_INFO(state) {
  //   localStorage.clear()
  //   state.token = null
  //   state.username = null
  //   state.role = null
  // }
}