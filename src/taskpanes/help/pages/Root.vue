<template>
  <div>
    <vl-tabs :hash-change="true" @tab-change="onTabChange">
      <vl-tab label="Definitie zoeken" id="zoeken" mod-show-title>
        <p>
          Met de zoek functie kan u definities opzoeken. Indien er geen resultaten zijn zal de plugin u dit melden.
        </p>
        <p>'*' kan gebruikt worden om alles op te vragen.</p>
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
      <vl-tab label="document controle" id="document-scan" mod-show-title>
        <p>
          Met deze functie wordt uw volledig document gecontroleerd. U krijgt een overzicht met alle overeenkomsten.
        </p>
        <p>
          U kan makkelijk navigeren door de overeenkomsten en vervolgens een voet/eindnoot toevoegen.
        </p>
        <br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/scan.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </vl-tab>
      <vl-tab label="Toevoegen aan uw woorden" id="toevoegen-aan-woorden" mod-show-title>
        <p>
          Ook kan u definities die u veel gebruikt toevoegen aan uw woorden. Zo vindt u ze makkelijk terug.
        </p>
        <p>
          De definities die in uw woorden zitten worden eerst getoond tijdens zoekresultaten.
        </p>
        <br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/dictAdd.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </vl-tab>
      <vl-tab label="Verwijderen van uw woorden" id="verwijderen-van-woorden" mod-show-title>
        <p>
          Als u een definitie niet meer gebruikt kan u deze natuurlijk gemakkelijk verwijderen.
        </p>
        <br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/dictDelete.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </vl-tab>
      <vl-tab label="Uw top 5 definities" id="uw-top-5-definities" mod-show-title>
        <p>
          De oslo plugin houdt lokaal uw top 5 bij.
        </p>
        <br>
        <video width="600" controls autoplay loop>
          <source src="assets/videos/Top5.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
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
 padding-left: 15px;
}
.opgelet{
  font-weight: bold;
}
</style>