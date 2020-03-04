import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth"
import items from "./modules/items";
import lists from "./modules/lists";
import stores from "./modules/stores";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        items,
        lists,
        stores
    }
});