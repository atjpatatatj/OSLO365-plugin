import Vue from "vue";
import Vuex from "vuex";
import root from "./pages/Root.vue";
import {OsloStore} from "../../store/OsloStore";
const VlUiVueComponents = require("@govflanders/vl-ui-vue-components");

// configuration of the built-in validator
const validatorConfig = {
    inject: true,
    locale: "nl",
};

Vue.use(VlUiVueComponents, {
    validation: validatorConfig,
});
Vue.use(Vuex);

Office.onReady((info) => {
    if (info.host === Office.HostType.Word) {
        var app = new Vue({
            el: "#app",
            render: (h) => h(root)
        });
    }
});
//TODO function to get items from dictionary - how will it be stored?
//TODO function to add item to dictionary - from all panes?
//TODO delete item from dictionary
//TODO sort your items
//TODO search in your items
