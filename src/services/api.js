import axios from 'axios'

let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMdW1lbiIsInN1YiI6bnVsbCwiaWF0IjoxNTY5NzU5MTA2LCJuYmYiOjE1Njk3NTkxMTEsImV4cCI6MTU2OTg0NTUxMSwiZGF0YSI6eyJ1c2VybmFtZSI6ImFkbWluIiwibmFtYSI6bnVsbCwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJsZXZlbCI6MX19.wXnimbFpJuTPFZo9symrEtN7oX_1bxgDQBABC-lAMDA"

export default () => {
  return axios.create({
    baseURL: "http://192.168.0.113:8000/api",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
}