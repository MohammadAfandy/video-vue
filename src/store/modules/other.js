export const state = {
  loading: false,
  snackbar: {
    text: "",
    show: false,
    timeout: 3000
  }
}

export const getters = {
  getLoading: state => state.loading,
  getSnackbar: state => state.snackbar,
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
    state.snackbar = data
  }
}