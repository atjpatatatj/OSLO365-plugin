<template>
  <div>
    <vl-tabs :hash-change="true" @tab-change="onTabChange">
      <vl-tab label="Zoeken" id="zoeken" mod-show-title>
        <p>
          Met de zoek functie kan u definities opzoeken. Indien er geen resultaten zijn zal de plugin u dit melden.
        </p>
        <br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/search.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </vl-tab>
      <vl-tab label="Selectie zoeken" id="selectie-zoeken" mod-show-title>
        <p>
          U kan ook definities opzoeken door een woord te selecteren in uw document.
        </p>
        <span id="opgelet">Opgelet: Open eerst het zoekvenster en selecteer dan pas uw woord.</span>
        <br><br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/search_select_1.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
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
#opgelet{
  font-weight: bold;
}
</style>