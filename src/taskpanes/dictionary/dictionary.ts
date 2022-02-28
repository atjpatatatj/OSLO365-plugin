import Vue from "vue";
import Vuex from "vuex";
import root from "./pages/Root.vue";
import {OsloStore} from "../../store/OsloStore";
import EventBus from "../../utils/EventBus";
import {getDictionaryItems, searchDict} from "../../store/OsloDictionary";
const VlUiVueComponents = require("@govflanders/vl-ui-vue-components");
/*
There are 2 ways to store data like your dictionary.
    o settings from the office javascript API
    o localstorage
After testing localstorage is the best option because the office API settings 'forgets' everything when the session is closed.
 */

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
        const osloStore = OsloStore.getInstance();
        const store = osloStore.getStore();
        var app = new Vue({
            store: store,
            el: "#app",
            render: (h) => h(root)
        });
    }
});
//TODO sort your items
//TODO visual feedback if item is dictionary item
/** Searches a given phrase in the dictionary. */
export function search(searchPhrase: string) {
    console.log(`Looking for "${searchPhrase}"`);

    if (!searchPhrase) {
        return;
    }
    // Search the phrase in the OSLO dictionary
    const osloResult = searchDict(searchPhrase);

    EventBus.$emit("onDictSearchResult", osloResult);
}
// gives back your full dictionary when input is empty
export function emptySearch() {
    console.log("emptySearch");
    const osloResult = getDictionaryItems();

    EventBus.$emit("onDictSearchResult", osloResult);
}