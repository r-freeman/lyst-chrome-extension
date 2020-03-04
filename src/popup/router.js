import VueRouter from "vue-router"

import SetupPage1 from "./views/SetupPage1";
import SetupPage2 from "./views/SetupPage2";
import SetupPage3 from "./views/SetupPage3";

import Items from './views/Items';

import Lists from './views/Lists';
import List from "./views/List";

import Login from "./views/Login";
import Register from "./views/Register";
import User from "./views/User";
import tokenService from "./services/token";


const routes = [
    {
        path: '/items',
        name: 'items',
        component: Items,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/lists',
        name: 'lists',
        component: Lists,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/list/:id',
        name: 'list',
        component: List,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user',
        name: 'user',
        component: User,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    // {
    //     path: '/setup-page-1',
    //     name: 'setup-page-1',
    //     component: SetupPage1,
    //     meta: {
    //         requiresAuth: false
    //     }
    // },
    // {
    //     path: '/setup-page-2',
    //     name: 'setup-page-2',
    //     component: SetupPage2,
    //     meta: {
    //         requiresAuth: false
    //     }
    // },
    // {
    //     path: '/setup-page-3',
    //     name: 'setup-page-3',
    //     component: SetupPage3
    // }
];

const router = new VueRouter({
    history: true,
    routes,
});

// navigation guard
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = tokenService.getToken();
        if (!token) {
            next({
                path: '/login'
            })
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
