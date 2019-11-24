import Vue from 'vue' 
import Router from 'vue-router' 

const adminDashboard = () => import(/* webpackChunkName: "dashboard" */ '../components/adminDashboard.vue') 
const homeLayout = () => import('../components/homeLayout.vue')
const userDashboard = () => import('../components/userDashboard.vue')

function loadView(view){
    return()=>import(`../components/adminDashboardContents/${view}.vue`)
}

function loadMe(view){
    return() =>import(`../components/homeContents/${view}.vue`)
}

function loadViews(view){
	return()=>import(`../components/userDashboardContents/${view}.vue`)
}

const routes = [
    {
        path:'/',
        component: homeLayout,
        children: [
            {
                name: 'Login',
                path: '',
                component: loadMe('Login')
            },
            {
                name: 'Register',
                path: '/Register',
                component: loadMe('Register')
            },
            {
                name: 'about_us',
                path: '/about_us',
                component: loadMe('about_us')
            },
            {
                name: 'gallery',
                path: '/gallery',
                component: loadMe('gallery')
            },
            {
                name: 'contact',
                path: '/contact',
                component: loadMe('contact')
            },
        ]
    },
 
    {
        path:'/adminDashboard',
        component: adminDashboard,
        beforeEnter(to, from, next) {
            if (localStorage.getItem("token") && localStorage.getItem("type") == 2) {
                next();
            } else {
                next({
                    name: "Login"
                  })
            }
        },
        children: [
            {
                name: 'userController',
                path: '/userController',
                component: loadView('userController')
            },
            {
                name: 'doctorController',
                path: '/doctorController',
                component: loadView('doctorController')
            },
            {
                name: 'rumahSakitController',
                path: '/rumahSakitController',
                component: loadView('rumahSakitController')
            },
            {
                name: 'agreementController',
                path: '/agreementController',
                component: loadView('agreementController')
            },
        ]
    },

	{
        path:'/userDashboard',
        component: userDashboard,
        beforeEnter(to, from, next) {
            if (localStorage.getItem("token") && localStorage.getItem("type") == 1) {
                next();
            } else {
                next({
                    name: "Login"
                  })
            }
        },
        children: [
            {
                name: 'dashController',
                path: '/dashController',
                component: loadViews('dashController')
            },
            {
                name: 'shopController',
                path: '/shopController',
                component: loadViews('shopController')
            },
            {
                name: 'cartController',
                path: '/cartController',
                component: loadViews('cartController')
            },
            {
                name: 'shopBongController',
                path: '/shopBongController',
                component: loadViews('shopBongController')
            },
        ]
    },
	{
        path:'/shopController',
        component: userDashboard,
        children: [
            {
                name: 'Shop',
                path: '',
                component: loadViews('shopController')
            },
            
        ]
    },

]
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes})

export default router