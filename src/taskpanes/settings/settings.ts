
import Vue from "vue";
import Vuex from "vuex";
import root from "./pages/Root.vue";
import {getSettingsData} from "../../store/OsloSettings";
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
Office.onReady((info) => {
    if (info.host === Office.HostType.Word) {
        var app = new Vue({
            el: "#app",
            render: (h) => h(root),
        });
        const userSetting = getSettingsData();
        let message = {messageType: "settings", info: userSetting};
        Office.context.ui.messageParent(JSON.stringify(message));
    }
});

