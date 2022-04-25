<template>
  <div>
    <vl-tabs :hash-change="true" @tab-change="onTabChange">
      <vl-tab label="Algemeen" id="algemeen" mod-show-title>
        <vl-layout>
          <vl-grid v-vl-align:center mod-stacked>
            <vl-column v-if="confirmDelete === false">
              <br>
              <vl-button id="deleteEntireDictionary" mod-block @click="areYouSure()">Verwijder alle items in uw woorden</vl-button>
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
      <vl-tab label="Oslo updaten" id="UpdateOslo" mod-show-title>
        <vl-layout>
          <vl-grid v-vl-align:center mod-stacked>
            <p>De laatste update was op</p>
            <p>{{timeStamp}}</p>
            <vl-button id="update" mod-block @click="updateOsloStore()">Oslo definities updaten</vl-button>
          </vl-grid>
        </vl-layout>
      </vl-tab>
    </vl-tabs>
  </div>
</template>

<script lang="ts">

import Vue from "vue";
import {
  changeDefinitionODSSetting,
  definitionODSSetting, findTop5MostUsedDefinitions
} from "../../../store/OsloSettings";
import {deleteEntireDictionary} from "../../../store/OsloDictionary";
import {OsloStore} from "../../../store/OsloStore";
const userSetting = definitionODSSetting();
const top5object = findTop5MostUsedDefinitions();
const store = OsloStore.getInstance();
const timeStampStore = store.getLatestUpdateMoment();


export default Vue.extend({
  name: "root",
  data: () => {
    return {
      confirmDelete: false,
      setting: userSetting,
      top5 : top5object,
      timeStamp: timeStampStore
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
    },
    updateOsloStore(){
      store.updateStore();
      this.timeStamp = store.getLatestUpdateMoment();
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
