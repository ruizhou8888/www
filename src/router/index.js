import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import Home from '../components/home/Home.vue'
import Perfect from '../components/Perfect.vue'
import Info from '../components/company/Info.vue'
import Constant from '../components/sys/Constant.vue'
import Notice from '../components/sys/Notice.vue'
import NewWall from '../components/company/NewWall.vue'
import Wall from '../components/company/Wall.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/Main',
        component: Main,
        children: [{
            path: '/',
            name: 'Home',
            component: Home,
        }, {
            path: '/Company',
            name: 'Company',
            component: Info
        }, {
            path: '/Constant',
            name: 'Constant',
            component: Constant
        }, {
            path: '/Notice',
            name: 'Notice',
            component: Notice
        }, {
            path: '/NewWall',
            name: 'NewWall',
            component: NewWall
        }, {
            path: '/Wall',
            name: 'Wall',
            component: Wall
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