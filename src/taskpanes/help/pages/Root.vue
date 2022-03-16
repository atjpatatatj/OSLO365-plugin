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
        <span class="opgelet">Opgelet: Open eerst het zoekvenster en selecteer dan pas uw woord.</span>
        <br><br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/search_select_1.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </vl-tab>
      <vl-tab label="Voetnoot" id="voetnoot" mod-show-title>
        <p>
          Via de knop voetnoot kan u een referentie toevoegen van de geselecteerde definitie.
        </p>
        <p>
          De voetnoot vindt u vanonder op uw document.
        </p>
        <br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/footnote.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </vl-tab>
      <vl-tab label="Eindnoot" id="eindnoot" mod-show-title>
        <p>
          Via de knop eindnoot kan u een referentie toevoegen van de geselecteerde definitie.
        </p>
        <p>
          Uw eindnoot wordt onder uw paragraaf toegevoegd.
        </p>
        <br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/endnote.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </vl-tab>
      <vl-tab label="Document scan" id="document-scan" mod-show-title>
        <p>
          Met de functie document scant u uw volledig document. U krijgt een overzicht met alle matches.
        </p>
        <p>
          U kan makkelijk navigeren naar de definitie die u wilt en vervolgens een voet/eindnoot toevoegen.
        </p>
        <br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/scan.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </vl-tab>
      <vl-tab label="Toevoegen aan woordenboek" id="toevoegen-aan-woordenboek" mod-show-title>
        <p>
          Ook kan u definities die u veel gebruikt toevoegen aan uw woordenboek. Zo vindt u ze makkelijk terug.
        </p>
        <p>
          De definities die in uw woordenboek zitten worden eerst getoond tijdens zoekresultaten.
        </p>
        <br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/dictAdd.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </vl-tab>
      <vl-tab label="Verwijderen van woordenboek" id="verwijderen-van-woordenboek" mod-show-title>
        WIP
      </vl-tab>
      <vl-tab label="Definitie van de dag" id="Definitie-van-de-dag" mod-show-title>
        <p>
        WIP
        </p>
      </vl-tab>
      <vl-tab label="Uw top 5 definities" id="uw-top-5-definities" mod-show-title>
        <p>
          WIP
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
.opgelet{
  font-weight: bold;
}
</style>