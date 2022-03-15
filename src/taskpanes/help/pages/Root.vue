<template>
  <div>
    <vl-tabs :hash-change="true" @tab-change="onTabChange">
      <vl-tab label="Zoeken" id="zoeken" mod-show-title>
        <p>
          Lorem ipsum dolor sit amet,
          consectetur adipisicing elit.
        </p>
      </vl-tab>
      <vl-tab label="Selectie zoeken" id="selectie-zoeken" mod-show-title>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </vl-tab>
      <vl-tab label="Voetnoot" id="voetnoot" mod-show-title>
        <p>
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </vl-tab>
      <vl-tab label="Eindnoot" id="eindnoot" mod-show-title>
        <p>
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </vl-tab>
      <vl-tab label="Document scan" id="document-scan" mod-show-title>
        <p>
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </vl-tab>
      <vl-tab label="Toevoegen aan woordenboek" id="toevoegen-aan-woordenboek" mod-show-title>
        <p>
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </vl-tab>
      <vl-tab label="Verwijderen van woordenboek" id="verwijderen-van-woordenboek" mod-show-title>
        <p>
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </vl-tab>
      <vl-tab label="Definitie van de dag" id="Definitie-van-de-dag" mod-show-title>
        <p>
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </vl-tab>
      <vl-tab label="Uw top 5 definities" id="uw-top-5-definities" mod-show-title>
        <p>
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </vl-tab>
    </vl-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "root",
  data: () => {
    return {
    };
  }
});
</script>

<style lang="scss">
@import "../css/style.scss";
@import "~@govflanders/vl-ui-tabs/src/scss/tabs";
a:visited{
  color: #05c;
}
.vl-tab__pane{
  padding-left: 10px;
}
</style>