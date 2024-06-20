import {createApp} from "vue"
import App from "./App.vue";
import router from "./router";
import {MotionPlugin} from "@vueuse/motion";
import {createPinia} from "pinia";

const app = createApp(App);
const pinia = createPinia();
app.use(router).use(MotionPlugin).use(pinia).mount("#app")
