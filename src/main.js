import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import http from './util/http'
import App from './App.vue'

Vue.prototype.$http = http
Vue.use(ElementUI)

new Vue({
    el: '#app',
    render: h => h(App)
})