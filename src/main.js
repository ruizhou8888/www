import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import wangEditor from 'wangeditor'
import http from './util/http'
import cookie from './util/cookie'
import App from './App.vue'
import router from './router/index'

const menus = [
    'source',
    '|',
    'bold',
    'quote',
    'fontfamily',
    'fontsize',
    '|',
    'underline',
    'italic',
    'strikethrough',
    'eraser',
    'forecolor',
    'bgcolor',
    'alignleft',
    'aligncenter',
    'alignright',
    'img',
    'video',
    'emotion'
]
wangEditor.config.menus = menus;

Vue.prototype.$cookie = cookie
Vue.prototype.$http = http
Vue.prototype.$editor = wangEditor

Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})