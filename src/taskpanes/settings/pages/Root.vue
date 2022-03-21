<template>
  <div>
    <!--
    <vl-tabs :hash-change="true" @tab-change="onTabChange">
      <vl-tab label="Algemeen" id="algemeen" mod-show-title>
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
              <br>
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-tab>
      <vl-tab label="Meest gebruikte definities" id="top5" mod-show-title>
        <vl-layout>
          <vl-grid v-vl-align:center mod-stacked>
            <vl-column v-if="top5.length === 0">
              <p id="empty">U heeft nog geen voetnoot/eindnoot gebruikt. Hier zal u zien welke definities u het meeste gebruikt.</p>
            </vl-column>
            <vl-column v-if="top5.length  > 0">
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
                  <td id="count" data-title="Keren gebruikt">{{item.useCount}}</td>
                </tr>
                </tbody>
              </table>
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-tab>
    </vl-tabs>
    -->
    <button onclick="function myFunction() {
        Office.context.ui.messageParent('test');
    }
    myFunction()">Click me</button>
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
      top5 : []
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
@import "~@govflanders/vl-ui-tabs/src/scss/tabs";

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
#empty{
  color: #05c;
  font-weight: bold;
}
a:visited{
  color: #05c;
}
.vl-tab__pane{
  padding-left: 15px;
}
</style>
