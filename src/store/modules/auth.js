import Api from '@/services/api'

const baseUrl = '/auth'

export const state = {
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
  role: localStorage.getItem('role') || null,
}

export const getters = {
  getToken: state => state.token,
  getUsername: state => state.username,
  getRole: state => state.role
}

export const actions = {
  async login({ commit }, payload) {
    try {
      let response = await Api().post(`${baseUrl}/login`, payload)
      commit('SET_TOKEN', response.data.data.token)
      return response
    } catch(e) {
      localStorage.clear()
      commit('DELETE_USER_INFO')
      commit('DELETE_TOKEN')
      return e.response
    }
  },
  async fetchUserInfo({ commit }) {
    try {
      let response = await Api().get(`${baseUrl}/info`)
      commit('SET_USER_INFO', response.data.data.info)
      return response
    } catch(e) {
      localStorage.clear()
      commit('DELETE_USER_INFO')
      commit('DELETE_TOKEN')
      return e.response
    }
  },
  logout({ commit }) {
    localStorage.clear()
    commit('DELETE_USER_INFO')
    commit('DELETE_TOKEN')
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
  SET_USER_INFO(state, data) {
    localStorage.setItem('username', data.username)
    localStorage.setItem('role', data.role)
    state.username = data.username
    state.role = data.role
  },
  SET_TOKEN(state, data) {
    localStorage.setItem('token', data)
    state.token = data
  },
  DELETE_TOKEN(state) {
    state.token = null
  },
  DELETE_USER_INFO(state) {
    state.username = null
    state.role = null
  }
}