<template>
  <vl-layout v-if="!scanned">
    <vl-grid mod-stacked>
      <vl-column>
        <vl-introduction>
          Voer een documentscan uit om te kijken welke woorden uit de OSLO Knowledge Graph herkent worden in je document
        </vl-introduction>
      </vl-column>
      <vl-column>
        <vl-action-group mod-align-center mod-collapse-s>
          <vl-button class="button" mod-wide @click="scan">Start scan</vl-button>
        </vl-action-group>
      </vl-column>
    </vl-grid>
  </vl-layout>
  <div v-else>
    <vl-layout>
      <vl-grid mod-stacked v-if="results.length > 0 && !onSubResults">
        <vl-column>
          <vl-title tag-name="h3">
            Er werden <span class="vl-u-mark">{{results.length}} definities </span> gevonden in uw document
          </vl-title>
          <hr><br>
        </vl-column>
        <a id="results" v-for="item in results" @click="toSubResults(item)">{{item.text}}</a>
      </vl-grid>
      <vl-grid v-if="onSubResults">
        <vl-column>
          <img id="back" @click="toResults" src="assets/arrow-back-outline.svg" alt="back" width="40" height="40">
          <vl-title tag-name="h5" v-if="subResults.length > 1">
            <span class="vl-u-mark">{{ shownWord.text }}</span> werd {{subResults.length}} keer gevonden
          </vl-title>
          <vl-title tag-name="h5" v-if="subResults.length === 1">
            Gevonden definities voor <span class="vl-u-mark">{{ shownWord.text }}</span>
          </vl-title>
          <vl-action-group mod-space-between v-if="subResults.length > 1" >
            <vl-button mod-icon-before icon="nav-left-light" @click="previous" :mod-disabled="resultIndex === 0">Vorige</vl-button>
            <vl-introduction>
              {{this.resultIndex + 1 }} / {{ subResults.length}}</vl-introduction>
            <vl-button
                mod-icon-after
                icon="nav-right-light"
                @click="next"
                :mod-disabled="resultIndex === subResults.length - 1">
              Volgende
            </vl-button>
          </vl-action-group><br>
        </vl-column>
        <vl-column id="ResultBox">
          <search-result-card
              v-for="(hit, index) of shownWordDefinitions"
              :key="`${hit.reference}-${index}`"
              :value="hit"
              :id="`radio-tile-${index}`"
              :title="hit.label"
              :description="hit.description"
              :url="hit.reference"
              :dictionaryItem="hit.isDictionaryItem"
          />
        </vl-column>
      </vl-grid>
      <vl-grid mod-stacked v-if="results.length === 0">
        <vl-column>
          <vl-introduction>Er werden geen overeenkomsten gevonden in OSLO voor het document.</vl-introduction>
        </vl-column>
        <vl-column v-vl-align:center>
          <vl-button class="button" @click="scan">Opnieuw scannen</vl-button>
        </vl-column>
      </vl-grid>
      <vl-grid mod-stacked v-if="scanned">
        <div id="loader" class="vl-u-align-center">
          <div class="vl-loader" role="status"></div>
          <p>
            Uw pagina wordt gescand.
          </p>
        </div>
      </vl-grid>
    </vl-layout>
    <content-footer v-if="results.length > 0 && onSubResults" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  searchDocument,
  getDefinitions,
  selectWordInDocument,
  searchDocumentForWord,
  selectNothing
} from "../auto-check";
import searchResultCard from "../../../general-components/search-result-card/search-result-card.vue";
import contentFooter from "../components/content-footer-auto-check-pane.vue";
import { IOsloItem } from "src/oslo/IOsloItem";

export default Vue.extend({
  name: "root",
  components: { searchResultCard, contentFooter },
  data: () => {
    return {
      scanned: false,
      resultIndex: 0,
      results: [] as Word.Range[],
      shownWord: {} as Word.Range,
      shownWordDefinitions: [] as IOsloItem[],
      back: false,
      subResults: [] as Word.Range[],
      onSubResults: false
    };
  },
  methods: {
    async scan() {
      this.results = await searchDocument();
      this.scanned = true;
    },
    next() {
      if (this.resultIndex + 1 <= this.subResults.length - 1) {
        this.resultIndex++;
        this.back = false;
        selectWordInDocument(this.subResults[this.resultIndex], this.back);
      }
    },
    previous() {
      if (this.resultIndex - 1 >= 0) {
        this.resultIndex--;
        this.back = true;
        selectWordInDocument(this.subResults[this.resultIndex], this.back);
      }
    },
    async toSubResults(item) {
      this.onSubResults = true;
      this.shownWord = item;
      this.subResults = await searchDocumentForWord(this.shownWord);
      this.shownWordDefinitions = getDefinitions(this.shownWord);
      selectWordInDocument(this.subResults[0], this.back);
      scroll(0, 0);
    },
    toResults(){
      this.onSubResults = false;
      this.resultIndex = 0;
      selectNothing();
      scroll(0,0);
      this.subResults = [] as Word.Range[];
      this.shownWord = {} as Word.Range;
    }
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
#results {
  font-size: 18px;
  font-weight: bold;
  color: #0055cc;
  text-decoration: none;
}
#results:hover {
  text-decoration: underline;
  cursor: pointer;
}
#back{
  cursor: pointer;
}
.button{
  cursor: pointer;
}
#loader{
  margin: auto !important;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
} /* Track */
::-webkit-scrollbar-track {
  background: lightgrey;
  border-radius: 10px;
} /* Handle */
::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
}
</style>
