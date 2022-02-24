import Vue from "vue";
import Vuex from "vuex";
import root from "./pages/Root.vue";
import {OsloStore} from "../../store/OsloStore";
import EventBus from "../../utils/EventBus";
const VlUiVueComponents = require("@govflanders/vl-ui-vue-components");
//FIXME footer obstructs last item
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
        var app = new Vue({
            el: "#app",
            render: (h) => h(root)
        });
    }
});
//TODO sort your items
//TODO remind them it's stored already
/** Searches a given phrase in the OSLO data set. */
//TODO search in own Dictionary instead of full dataset
export function searchDict(searchPhrase: string) {
    console.log(`Looking for "${searchPhrase}"`);

    if (!searchPhrase) {
        return;
    }

    // If the search phrase begins with an equals char, perform an exact match (otherwise a "contains" match)
    const exactMatch = searchPhrase.charAt(0) == "=";

    if (exactMatch) {
        // Remove the equals char from the search phrase
        searchPhrase = searchPhrase.slice(1);
    }

    // Search the phrase in the OSLO database
    const store = OsloStore.getInstance()
    const osloResult = store.osloStoreLookup(searchPhrase, exactMatch);

    EventBus.$emit("onDictSearchResult", osloResult);
}
