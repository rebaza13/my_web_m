import { onAuthStateChanged } from "firebase/auth";
import { createWebHistory, createRouter } from "vue-router";
import { auth } from "./firebase/firebase";

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/Login.vue")
    },
    {
        path: '/add-item',
        name: 'add-item',
        component: () => import("@/views/AddItem.vue")
    },
    {
        path: '/forget-password',
        name: 'forget-password',
        component: () => import("@/views/ForgetPassword.vue")
    },
    {
        path: '/manage-item',
        name: 'manage-item',
        component: () => import("@/views/ManageItem.vue")
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import("@/views/Dashboard.vue")
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("@/views/Register.vue")
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const getUserState = () => {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                resolve(!!user);
            });
        });
    };

    const isLogged = await getUserState();

    if (isLogged) {
        if (to.path === '/login') {
            next({ name: 'dashboard' });
        } else {
            next();
        }
    } else {
        if (to.path !== '/login' && to.path !== '/register' && to.path !== '/forget-password') {
            next({ name: 'login' });
        } else {
            next();
        }
    }
});

export default router;
