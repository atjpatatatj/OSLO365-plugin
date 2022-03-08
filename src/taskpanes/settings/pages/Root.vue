<template>
  <div>
    <vl-layout>
      <vl-grid v-vl-align:center mod-stacked>
        <vl-column v-if="confirmDelete === false">
          <br>
          <vl-button id="deleteEntireDictionary" mod-block @click="areYouSure()">Verwijder alle items in woordenboek</vl-button>
        </vl-column>
        <vl-column v-if="confirmDelete === true">
          <br>
          <vl-button id="deleteEntireDictionary" mod-block @click="deleteEntireDictionary()">Ben je het zeker?</vl-button>
        </vl-column>
        <vl-column>
          <vl-button id="disableDailyDefinition" mod-block @click="disableDailyDefinition()">Definitie van de dag uitschakkelen</vl-button>
        </vl-column>
        <vl-column>
          mooie grafieken
        </vl-column>
      </vl-grid>
    </vl-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {deleteEntireDictionary} from "../../../store/OsloDictionary";

export default Vue.extend({
  name: "root",
  data: () => {
    return {
      confirmDelete: false,
    };
  },
  methods: {
    areYouSure(){
      this.confirmDelete = true;
    },
    deleteEntireDictionary(){
      deleteEntireDictionary();
      this.confirmDelete = false;
    }
  }
});
</script>

<style lang="scss">
@import "../css/style.scss";

#deleteEntireDictionary{
  background-color: red;
}
#deleteEntireDictionary:hover {
  background-color: crimson;
}

</style>
