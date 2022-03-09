//TODO definition of the day + setting to disable
//TODO graph with most used words by user
import Vue from "vue";
import Vuex from "vuex";
import root from "./pages/Root.vue";
import {OsloStore} from "../../store/OsloStore";
import {initSettings} from "../../store/OsloSettings";
const VlUiVueComponents = require("@govflanders/vl-ui-vue-components");
/*
Due to a lot of issues with the diagram API it's currently set as a taskpane
 */

/// configuration of the built-in validator
const validatorConfig = {
    inject: true,
    locale: "nl",
};

Vue.use(VlUiVueComponents, {
    validation: validatorConfig,
});
Vue.use(Vuex);
initSettings(); // check the setting in localstorage before opening it
Office.onReady((info) => {
    if (info.host === Office.HostType.Word) {
        const osloStore = OsloStore.getInstance();
        var app = new Vue({
            el: "#app",
            render: (h) => h(root),
        });
    }
});

