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
        <vl-column v-if="setting === true">
          <vl-button id="disableDailyDefinition" mod-block @click="disableDefinition()">Definitie van de dag uitschakelen</vl-button>
        </vl-column>
        <vl-column v-if="setting === false">
          <vl-button id="enableDailyDefinition" mod-block @click="enableDefinition()">Definitie van de dag inschakelen</vl-button>
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
import {
  changeDefinitionODSSetting,
  definitionODSSetting,
} from "../../../store/OsloSettings";
const userSetting = definitionODSSetting();

export default Vue.extend({
  name: "root",
  data: () => {
    return {
      confirmDelete: false,
      setting: userSetting,
    };
  },
  methods: {
    areYouSure(){
      this.confirmDelete = true;
    },
    deleteEntireDictionary(){
      deleteEntireDictionary();
      this.confirmDelete = false;
    },
    enableDefinition(){
      changeDefinitionODSSetting(true);
      this.setting = true;
    },
    disableDefinition(){
      changeDefinitionODSSetting(false);
      this.setting = false;
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
#disableDailyDefinition{
  background-color: red;
}
#disableDailyDefinition:hover {
  background-color: crimson;
}
#enableDailyDefinition{
  background-color: limegreen;
}
#enableDailyDefinition:hover {
  background-color: green;
}

</style>
