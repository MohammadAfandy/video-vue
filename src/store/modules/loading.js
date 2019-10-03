export const state = {
  loading: false
}

export const getters = {
  getLoading: state => state.loading,
}

export const actions = {
  setLoading({ commit }, isLoad) {
    commit('SET_LOADING', isLoad)
  }
}

export const mutations = {
  SET_LOADING(state, data) {
    state.loading = data
  }
}