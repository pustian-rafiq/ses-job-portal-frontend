import axios from 'axios'
import { getToken, destroyToken } from './auth/token'

class publicApi {
  constructor() {
    axios.defaults.baseURL = 'http://52.68.248.212:8001/api/'
    // axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
    axios.defaults.headers.common['Accept'] = `application/json`
  }

  async get(slug = '') {
    try {
      const response = await axios.get(`${slug}`)

      return response
    } catch (error) {
      // if (error.response.status == 401) {
      //   // destroyToken()
      // }

      return error.response
    }
  }

  async post(slug, params)  {
    try {
      const response = await axios.post(`${slug}`, params)

      return response
    } catch (error) {
      // if (error.response.status == 401) {
      //   destroyToken()
      // }

      return error.response
    }
  }

  async update(slug, params) {
    try {
      const response = await axios.put(`${slug}`, params)

      return response
    } catch (error) {
      // if (error.response.status == 401) {
      //   destroyToken()
      // }

      return error.response
    }
  }

  async delete(slug) {
    try {
      const response = await axios.delete(`${slug}`)

      return response
    } catch (error) {
      // if (error.response.status == 401) {
      //   destroyToken()
      // }

      return error.response
    }
  }
}

export default new publicApi()
