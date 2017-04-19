import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import Home from '../components/home/Home.vue'
import Perfect from '../components/Perfect.vue'
import Info from '../components/company/Info.vue'
import Constant from '../components/sys/Constant.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/Main',
        name: 'Main',
        component: Main,
        children: [{
            path: '/',
            component: Home,
        }, {
            path: '/Company',
            name: 'Company',
            component: Info
        }, {
            path: '/Constant',
            name: 'Constant',
            component: Constant
        }]
    }, {
        path: '/',
        name: 'Login',
        component: Login
    }, {
        path: '/Perfect',
        name: 'Perfect',
        component: Perfect
    }]
})