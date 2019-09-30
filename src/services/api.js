import axios from 'axios'

let token = localStorage.getItem('token')

export default () => {
  return axios.create({
    baseURL: "/api",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
}