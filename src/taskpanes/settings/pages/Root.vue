<template>
  <div>
    <vl-layout>
      <vl-grid v-vl-align:center mod-stacked>
        <vl-column>
          <br>
          <vl-button mod-block @click="deleteEntireDictionary()">Verwijder alle items in woordenboek</vl-button><br>
          <vl-button mod-block @click="disableDailyDefinition()">Definitie van de dag uitschakkelen</vl-button>
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

export default Vue.extend({
  name: "root",
  data: () => {
    return {

    };
  },
});
</script>

<style lang="scss">
@import "../css/style.scss";

</style>
