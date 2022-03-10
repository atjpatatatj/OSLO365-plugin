<!--
Het oorspronkelijk idee was om een pie chart te gebruiken voor de TOP5.
Jammer genoeg zijn de meeste data visualisatie frameworks voor Vue2 en niet Vue3. Of ging niet door onze framework combinaties
-->
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
          <hr>
          <h5 class="vl-title vl-title--h5">Uw top 5 meest gebruikte definities</h5>
          <table class="vl-data-table vl-data-table--zebra">
            <thead>
            <tr>
              <th>Definitie</th>
              <th>Keren gebruikt</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in top5">
              <td data-title="Definitie">{{ item.label }}</td>
              <td id ="count" data-title="Keren gebruikt">{{item.useCount}}</td>
            </tr>
            </tbody>
          </table>
        </vl-column>
      </vl-grid>
    </vl-layout>
  </div>
</template>

<script lang="ts">
import { Datatable } from '@govflanders/vl-ui-data-table';
import Vue from "vue";
import {deleteEntireDictionary} from "../../../store/OsloDictionary";
import {
  changeDefinitionODSSetting,
  definitionODSSetting, findTop5MostUsedDefinitions,
} from "../../../store/OsloSettings";
const userSetting = definitionODSSetting();
const top5data = findTop5MostUsedDefinitions();

export default Vue.extend({
  name: "root",
  data: () => {
    return {
      confirmDelete: false,
      setting: userSetting,
      top5 : top5data
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
@import "~@govflanders/vl-ui-data-table/src/scss/data-table";

#deleteEntireDictionary{
  background-color: red;
}
#deleteEntireDictionary:hover {
  background-color: crimson;
}
#enableDailyDefinition{
  background-color: limegreen;
}
#enableDailyDefinition:hover {
  background-color: mediumseagreen;
}
h5{
  text-decoration: underline;
}
#count{
  text-align: center;
}
</style>
