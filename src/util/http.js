import axios from 'axios'
import qs from 'qs'

export default {
    get(url, params) {
        return axios.get(url, { params: params })
    },
    post(url, params) {
        return axios.post(url, qs.stringify(params))
    }
}