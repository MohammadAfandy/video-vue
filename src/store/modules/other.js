export const state = {
  loading: false,
  snackbar: {
    text: "",
    show: false,
    timeout: 3000,
    color: "success"
  },
  // snackbars: "",
  formError: []
}

export const getters = {
  getLoading: state => state.loading,
  getSnackbar: state => state.snackbar,
  getFormError: state => state.formError,
}

export const actions = {
  setLoading({ commit }, isLoad) {
    commit('SET_LOADING', isLoad)
  },
  setSnackbar({ commit }, snackbar) {
    commit('SET_SNACKBAR', snackbar)
  },
  setFormError({ commit }, formError) {
    commit('SET_FORM_ERROR', formError)
  }
}

export const mutations = {
  SET_LOADING(state, data) {
    state.loading = data
  },
  SET_SNACKBAR(state, data) {
    data.show = true
    data.text = data.text || "Unknown Error"
    data.color = data.color || "success"
    data.timeout = data.timeout || 3000
    state.snackbar = data
  },
  SET_FORM_ERROR(state, data) {
    state.formError = data
  }
}