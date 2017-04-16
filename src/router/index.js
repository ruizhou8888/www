import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import Home from '../components/home/Home.vue'
import Perfect from '../components/Perfect.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/Main',
        name: 'Main',
        component: Main,
        children: [{
            path: '/',
            name: 'Home',
            component: Home,
        }, ]
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