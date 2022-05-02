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
          <vl-button mod-wide @click="scan">Start scan</vl-button>
        </vl-action-group>
      </vl-column>
    </vl-grid>
  </vl-layout>
  <div v-else>
    <vl-layout>
      <vl-grid mod-stacked v-if="scanned && results.length > 0 && !onSubResults">
        <vl-column>
          <vl-title tag-name="h3">
            Er werden <span class="vl-u-mark">{{results.length}} definities </span> gevonden in uw document.
          </vl-title>
          <hr><br>
        </vl-column>
        <a v-for="item in results" @click="toSubResults">{{item.text}}</a>
      </vl-grid>
      <vl-grid v-if="onSubResults">
        <vl-column>
          <a @click="toResults">Terug naar alle resultaten</a>
        </vl-column>
      </vl-grid>
<!--        <vl-column>-->
<!--          <vl-title tag-name="h5">-->
<!--            Gevonden definities voor <span class="vl-u-mark">{{ shownWord.text }}</span>-->
<!--          </vl-title>-->
<!--        </vl-column>-->
<!--        <vl-column>-->
<!--          <vl-action-group mod-space-between>-->
<!--            <vl-button mod-icon-before icon="nav-left-light" @click="previous" :mod-disabled="resultIndex === 0"-->
<!--              >Vorige</vl-button-->
<!--            >-->
<!--            <vl-introduction>-->
<!--              <vl-input-field-->
<!--                  id="search-input"-->
<!--                  mod-block-->
<!--                  v-model="input"-->
<!--                  @input="navigation"-->
<!--                  :placeholder="[[ resultIndex + 1 ]]"-->
<!--                  style="width: 25px; height: 35px; font-size: 16px;"-->
<!--              />-->
<!--               / {{ results.length }}</vl-introduction>-->
<!--            <vl-button-->
<!--              mod-icon-after-->
<!--              icon="nav-right-light"-->
<!--              @click="next"-->
<!--              :mod-disabled="resultIndex === results.length - 1"-->
<!--              >Volgende</vl-button-->
<!--            >-->
<!--          </vl-action-group>-->
<!--        </vl-column>-->
<!--        <vl-column id="ResultBox">-->
<!--          <search-result-card-->
<!--            v-for="(hit, index) of shownWordDefinitions"-->
<!--            :key="`${hit.reference}-${index}`"-->
<!--            :value="hit"-->
<!--            :id="`radio-tile-${index}`"-->
<!--            :title="hit.label"-->
<!--            :description="hit.description"-->
<!--            :url="hit.reference"-->
<!--            :dictionaryItem="hit.isDictionaryItem"-->
<!--          />-->
<!--        </vl-column>-->
      <vl-grid mod-stacked v-if="scanned && results.length === 0">
        <vl-column>
          <vl-introduction>Er werden geen overeenkomsten gevonden in OSLO voor het document.</vl-introduction>
        </vl-column>
        <vl-column v-vl-align:center>
          <vl-button @click="scan">Opnieuw scannen</vl-button>
        </vl-column>
      </vl-grid>
    </vl-layout>
    <content-footer v-if="scanned && results.length > 0 && onSubResults" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {searchDocument, getDefinitions, selectWordInDocument, searchDocumentForWord} from "../auto-check";
import searchResultCard from "../../../general-components/search-result-card/search-result-card.vue";
import contentFooter from "../components/content-footer-auto-check-pane.vue";
import { IOsloItem } from "src/oslo/IOsloItem";

export default Vue.extend({
  name: "root",
  components: { searchResultCard, contentFooter },
  data: () => {
    return {
      scanned: false,
      searching: false,
      resultIndex: 0,
      results: [] as Word.Range[],
      shownWord: {} as Word.Range,
      shownWordDefinitions: [] as IOsloItem[],
      selectedDefinition: {} as IOsloItem,
      back: false,
      subResults: [] as Word.Range[],
      onSubResults: false
    };
  },
  methods: {
    async scan() {
      this.searching = true;
      this.scanned = true;

      this.results = await searchDocument();
      this.shownWord = this.results[this.resultIndex];
      this.shownWordDefinitions = getDefinitions(this.shownWord);
      this.subResults = await searchDocumentForWord(this.shownWord);

      this.searching = false;
    },
    next() {
      if (this.resultIndex + 1 <= this.results.length - 1) {
        this.resultIndex++;
        this.updateDisplayedWord();
        this.back = false;
      }
    },
    previous() {
      if (this.resultIndex - 1 >= 0) {
        this.resultIndex--;
        this.updateDisplayedWord();
        this.back = true;
      }
    },
    navigation() {
      this.resultIndex = this.input - 1;
      this.updateDisplayedWord();
    },
    async updateDisplayedWord() {
      this.shownWord = this.results[this.resultIndex];
      this.shownWordDefinitions = getDefinitions(this.shownWord);
      this.subResults = await searchDocumentForWord(this.shownWord);
      selectWordInDocument(this.shownWord, this.back);
    },
    toSubResults() {
      this.onSubResults = true;
    },
    toResults(){
      this.onSubResults = false;
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
a {
  font-size: 18px;
  font-weight: bold;
  color: #0055cc;
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
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
