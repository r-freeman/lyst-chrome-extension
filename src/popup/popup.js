import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import router from "./router";
import store from "./store";
import "./vee-validate";
import "./tailwind.css";
import "typeface-nunito";

const VueTruncate = require("vue-truncate-filter");

// Set Vue router
Vue.router = router;

// plugins
Vue.use(VueRouter);
Vue.use(VueTruncate);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
