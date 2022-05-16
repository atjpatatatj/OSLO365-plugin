<template>
  <vl-content-footer id="content-footer">
    <vl-layout>
      <vl-grid v-vl-align:center mod-stacked>
        <vl-column width="6" v-if="!options">
          <vl-button class="nopadding" mod-block @click="toOptions('footnote')">Voetnoot</vl-button>
        </vl-column>
        <vl-column width="6" v-if="!options">
          <vl-button class="nopadding" mod-block @click="toOptions('endnote')">Eindnoot</vl-button>
        </vl-column>
        <vl-column width="6" v-if="options">
          <vl-button class="nopadding" mod-block @click="insertNote('footnote')">Enkel</vl-button>
        </vl-column>
        <vl-column width="6" v-if="options">
          <vl-button class="nopadding" mod-block @click="insertNote('endnote')">Overal</vl-button>
        </vl-column>
        <vl-column>
          <vl-button class="nopadding" id="button" mod-block @click="addToDictionary()">Toevoegen aan uw woorden</vl-button>
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-content-footer>
</template>

<script lang="ts">
import Vue from "vue";
import {onInsertNoteClicked} from "../../../utils/Utils";
import EventBus from "../../../utils/EventBus";
import { IOsloItem } from "src/oslo/IOsloItem";
import {addToDictionary} from "../../../store/OsloDictionary";
import {increaseCounter} from "../../../store/OsloSettings";

export default Vue.extend({
  data: () => {
    return {
      radioTile: {} as IOsloItem,
      options: false,
      note: null
    };
  },
  methods: {
    async insertNote() {
      await onInsertNoteClicked(this.radioTile, this.note);
      increaseCounter(this.radioTile);
      this.options = false;
    },
    toOptions(which) {
      if (Object.keys(this.radioTile).length > 0) {
        this.options = true;
        this.note = which;
      }
    },
    addToDictionary(){
      if (Object.keys(this.radioTile).length > 0) {
        addToDictionary(this.radioTile);
      }
    }
  },
  mounted() {
    EventBus.$on("onRadioTileChanged", (data: IOsloItem) => {
      this.radioTile = data;
    });
  }
});
</script>

<style lang="scss">
@import "../css/style.scss";

#content-footer {
  z-index: 1;
  position: fixed;
  bottom: 0;
}

#content-footer div {
  background: #ffe615 !important;
}

#content-footer a {
  cursor: grab;
}
.nopadding{
  cursor: pointer !important;
  padding: 0 !important;
}
</style>
