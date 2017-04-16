import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { Message } from 'element-ui';

Vue.component(Message);

axios.defaults.baseURL = '/hlbb/';

export default {
    get(url, params, func) {
        return axios.get(url, { params: params })
            .then(function(res) {
                if (res.data.code == 0) {
                    func && func(res.data);
                } else {
                    Message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
    },
    post(url, params, func) {
        return axios.post(url, qs.stringify(params))
            .then(function(res) {
                if (res.data.code == 0) {
                    func && func(res.data);
                } else {
                    Message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
    }
}