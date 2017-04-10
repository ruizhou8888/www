import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import http from './util/http'
import App from './App.vue'
import router from './router/index'

Vue.prototype.$http = http
Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})