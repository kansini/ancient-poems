import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import Home from "../views/Home.vue";
import PoetryList from "@/views/PoetryList.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/poetry",
        name: "poetry",
        component: PoetryList
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
