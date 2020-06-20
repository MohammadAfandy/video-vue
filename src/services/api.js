import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL || 'http://127.0.0.1:8000',
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem('token')
    }
  })
}