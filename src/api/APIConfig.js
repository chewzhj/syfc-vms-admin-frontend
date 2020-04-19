import axios from 'axios'

export default axios.create({
  baseURL: "http://localhost:4243/",
  responseType: "json",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'X-Authorization': sessionStorage.getItem('sessionKey'),
    // 'Authorization': sessionStorage.getItem('username'),
  }
})
