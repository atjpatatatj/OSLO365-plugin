import Vue from "vue";
import root from "./pages/Root.vue";
import {OsloStore} from "../../store/OsloStore";
import EventBus from "../../utils/EventBus";
import {getDictionaryItems, searchDict} from "../../store/OsloDictionary";
const VlUiVueComponents = require("@govflanders/vl-ui-vue-components");
/*
There are 2 ways to store data like your dictionary.
    o settings from the office javascript API
    o localstorage
After testing localstorage is the best option because the office API saves only on one document and not all your documents
 */

// configuration of the built-in validator
const validatorConfig = {
    inject: true,
    locale: "nl",
};

Vue.use(VlUiVueComponents, {
    validation: validatorConfig,
});

Office.onReady((info) => {
    if (info.host === Office.HostType.Word) {
        const osloStore = OsloStore.getInstance();
        var app = new Vue({
            el: "#app",
            render: (h) => h(root)
        });
    }
});
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
// Gives back your full dictionary when input is empty
export function emptySearch() {
    console.log("emptySearch");
    const osloResult = getDictionaryItems();

    EventBus.$emit("onDictSearchResult", osloResult.sort());
}
