<template>
  <div>
    <vl-layout>
      <vl-grid mod-stacked>
        <vl-column>
          <vl-input-field
              id="search-input"
              mod-block
              v-model="input"
              @input="searchDict"
              placeholder="Doorzoek uw woorden"
          />
        </vl-column>
        <vl-column id="ResultBox" v-if="allitems.length > 0">
          <transition-group appear name="slide-fade">
            <search-result-card
                v-for="(hit, index) of allitems"
                :key="`${hit.reference}-${index}`"
                :value="hit"
                :id="`radio-tile-${index}`"
                :title="hit.label"
                :description="hit.description"
                :url="hit.reference"
            />
          </transition-group>
        </vl-column>
      </vl-grid>
    </vl-layout>
    <content-footer v-if="allitems.length > 0" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import searchResultCard from "../../../general-components/search-result-card/search-result-card.vue";
import contentFooter from "../components/content-footer-dictionary-pane.vue";
import EventBus from "../../../utils/EventBus";
import {IOsloItem} from "../../../oslo/IOsloItem";
import {emptySearch, search} from "../dictionary";
import {getDictionaryItems} from "../../../store/OsloDictionary";
const items = getDictionaryItems();

export default Vue.extend({
  components: { searchResultCard, contentFooter },
  name: "root",
  data: () => {
    return {
      input: "",
      allitems: items
    };
  },
  methods: {
    searchDict() {
      if (this.input.length > 2) {
        search(this.input);
      }
      else if(this.input.length == 0) {
        emptySearch();
      }
  }
},
  mounted() {
    EventBus.$on("onDictSearchResult", (data: IOsloItem[]) => {
      this.allitems = data;
    });
  }
});
</script>

<style lang="scss">
@import "../css/style.scss";

body {
  overflow-x: hidden;
}

#ResultBox {
  margin-bottom: 135px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
} /* Track */
::-webkit-scrollbar-track {
  background: lightgrey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
