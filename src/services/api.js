import axios from 'axios'

export default () => {
  console.log(process.env.VUE_APP_BASEURL)
  return axios.create({
    baseURL: process.env.VUE_APP_BASEURL || 'http://127.0.0.1:8000',
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem('token')
    }
  })
}