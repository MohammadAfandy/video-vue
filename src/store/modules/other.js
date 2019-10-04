export const state = {
  loading: false,
  // snackbar: {
  //   text: "",
  //   show: false,
  //   timeout: 3000,
  //   color: "success"
  // }
  snackbars: []
}

export const getters = {
  getLoading: state => state.loading,
  getSnackbars: state => state.snackbars,
}

export const actions = {
  setLoading({ commit }, isLoad) {
    commit('SET_LOADING', isLoad)
  },
  setSnackbar({ commit }, snackbar) {
    commit('SET_SNACKBAR', snackbar)
  }
}

export const mutations = {
  SET_LOADING(state, data) {
    state.loading = data
  },
  SET_SNACKBAR(state, data) {
    data.show = true
    data.color = data.color || "success"
    data.timeout = data.timeout || 3000
    state.snackbars = state.snackbars.concat(data)
  }
}