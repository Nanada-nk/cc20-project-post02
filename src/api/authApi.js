import axios from "axios"

const authApi = {}

const BASEURL = "https://api-post-ts.onrender.com/api/v1"

authApi.register = (input) => {
  return axios.post(`${BASEURL}/auth/register`,input)
}

authApi.login = (input) => {
  return axios.post(`${BASEURL}/auth/login`,input)
}
               
authApi.getMe = () => {
  return axios.post(`${BASEURL}/auth/me`)
}

export default authApi