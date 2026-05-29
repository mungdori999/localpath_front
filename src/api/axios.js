import axios from 'axios'
import { URL } from '../data/url'

const api = axios.create({
  baseURL: URL.API_BASE,
  withCredentials: true,
})

export default api
