//TODO definition of the day + setting to disable
//TODO graph with most used words by user
import Vue from "vue";
import Vuex from "vuex";
import root from "./pages/Root.vue";
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
    }
});
export function enableDefintionOTD(){
    console.log('Current value for mySetting: ' + Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument'));
    Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", true);
    Office.context.document.settings.saveAsync();
    console.log('set');
    console.log('Current value for mySetting: ' + Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument'));
}
export function disableDefinitionOTD(){
    console.log('Current value for mySetting: ' + Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument'));
    Office.context.document.settings.remove("Office.AutoShowTaskpaneWithDocument");
    Office.context.document.settings.saveAsync();
    console.log('removed');
    console.log('Current value for mySetting: ' + Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument'));
}
export function defintionOTDSetting(){
    return Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument');
}
