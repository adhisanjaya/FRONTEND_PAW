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
                name: 'dashController',
                path: '/',
                component: loadViews('dashController')
            },
            {
                name: 'Login',
                path: '/Login',
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
            if (localStorage.getItem("token") && localStorage.getItem("type") == 1 && localStorage.getItem("verif") == 1) {
                next();
            } else {
                next({
                    name: "Login"
                  })
            }
        },
        children: [
            {
                name: 'dashController1',
                path: '/dashController1',
                component: loadViews('dashController1')
            },
            {
                name: 'profileUserController',
                path: '/profileUserController',
                component: loadViews('profileUserController')
            },
            {
                name: 'makeAgreementController',
                path: '/makeAgreementController',
                component: loadViews('makeAgreementController')
            },
            {
                name: 'agreementForm',
                path: '/agreementForm',
                component: loadViews('agreementForm')
            },
            {
                name: 'contact1',
                path: '/contact1',
                component: loadMe('contact1')
            },
            {
                name: 'about_us1',
                path: '/about_us1',
                component: loadMe('about_us1')
            },
        ]
    },
	{
        path:'/makeAgreementController',
        component: userDashboard,
        children: [
            {
                name: 'Make Agreement',
                path: '',
                component: loadViews('makeAgreementController')
            },
            
        ]
    },

]
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes})

export default router