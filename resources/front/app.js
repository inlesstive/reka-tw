import "./assets/style/main.scss";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from 'pinia'
import App from "@/App.vue";
import router from "./router";

const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(pinia)
app.mount("#app");
