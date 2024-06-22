import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import Home from "../views/Home.vue";
import PoetryList from "@/views/PoetryList.vue"
import ShijingList from "@/views/ShijingList.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/poetry",
        name: "poetry",
        component: PoetryList,
        children: [
            {
                path: "/poetry/shijing",
                name: "shijing",
                component: ShijingList
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
