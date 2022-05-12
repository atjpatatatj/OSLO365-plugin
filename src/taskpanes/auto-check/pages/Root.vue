<template>
  <vl-layout v-if="!scanning">
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
      <vl-grid mod-stacked v-if="results.length > 0 && !onSubResults || sorting === true">
        <vl-column>
          <vl-title tag-name="h4">
            Er werden <span class="vl-u-mark">{{results.length}}</span>  overeenkomsten gevonden in uw document
          </vl-title>
          <hr>
          <a id="alphabet" v-for="item in alphabet" @click="sort(item)">{{item}}</a>
          <hr>
        </vl-column>
        <a id="results" v-for="item in results" @click="toSubResults(item)">{{item.text}}</a>
      </vl-grid>
      <vl-grid v-if="onSubResults">
        <vl-column>
          <img v-if="!loading" id="back" @click="toResults" src="assets/arrow-back-outline.svg" alt="back" width="40" height="40">
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
      <vl-grid mod-stacked v-if="!scanning && results.length === 0">
        <vl-column>
          <vl-introduction>Er werden geen overeenkomsten gevonden in OSLO voor het document.</vl-introduction>
        </vl-column>
        <vl-column v-vl-align:center>
          <vl-button class="button" @click="scan">Opnieuw scannen</vl-button>
        </vl-column>
      </vl-grid>
      <vl-grid v-if="loading">
        <div id="loader" class="vl-u-align-center">
          <div class="vl-loader" role="status"></div><br>
          <p>
            Uw document wordt gescand
          </p><br>
          <p>
            {{ counter }} overeenkomsten gevonden
          </p><br>
          <p>
            <progress id="loader" :value="progress" max="100"> </progress>
          </p>
        </div>
      </vl-grid>
    </vl-layout>
    <content-footer v-if="onSubResults" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {getDefinitions, searchDocument, selectNothing, selectWordInDocument} from "../auto-check";
import searchResultCard from "../../../general-components/search-result-card/search-result-card.vue";
import contentFooter from "../components/content-footer-auto-check-pane.vue";
import {IOsloItem} from "src/oslo/IOsloItem";
import EventBus from "../../../utils/EventBus";

export default Vue.extend({
  name: "root",
  components: { searchResultCard, contentFooter },
  data: () => {
    return {
      scanning: false,
      loading: false,
      resultIndex: 0,
      results: [] as Word.Range[],
      savedResults: [] as Word.Range[],
      resultMap: null,
      shownWord: {} as Word.Range,
      shownWordDefinitions: [] as IOsloItem[],
      back: false,
      subResults: [] as Word.Range[],
      onSubResults: false,
      counter: 0,
      alphabet: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","ALLE"],
      sorting: false,
      progress: 0
    };
  },
  methods: {
    async scan() {
      this.scanning = true;
      this.results = await searchDocument();
      this.savedResults = this.results;
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
    toSubResults(item) {
      this.sorting = false;
      this.counter = 0;
      this.onSubResults = true;
      this.shownWord = item;
      this.subResults = this.resultMap.get(this.shownWord.text.toLowerCase());
      this.shownWordDefinitions = getDefinitions(this.shownWord);
      selectWordInDocument(this.subResults[0], this.back);
      scroll(0, 0);
    },
    toResults(){
      this.counter = 0;
      this.onSubResults = false;
      this.resultIndex = 0;
      selectNothing();
      scroll(0,0);
      this.subResults = [] as Word.Range[];
      this.shownWord = {} as Word.Range;
      this.shownWordDefinitions = [] as IOsloItem[];
    },
    sort(character){
      this.sorting = true;
      const filtered = [];
      if (character === "ALLE"){
        this.results = this.savedResults;
      }
      else{
        for (let word of this.savedResults){
          if (word.text.charAt(0).toLowerCase() === character.toLowerCase()){
            filtered.push(word);
          }
        }
        this.results = filtered;
      }
    }
  },
  mounted() {
    EventBus.$on("loading", (data: boolean) => {
      this.loading = data;
    });
    EventBus.$on("counter", (data: number) => {
      this.counter = data;
    });
    EventBus.$on("map", (data: any) => {
      this.resultMap = data;
    });
    EventBus.$on("progress", (data: number) => {
      this.progress = data;
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
#alphabet {
  color: black;
  padding-right: 2px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
}
#alphabet:hover {
  text-decoration: underline;
  cursor: pointer;
}
hr {
  border: 1px solid black !important;
}
#back{
  cursor: pointer;
}
.button{
  cursor: pointer;
}
#loader{
  padding-top: 15% ;
  margin: auto ;
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
