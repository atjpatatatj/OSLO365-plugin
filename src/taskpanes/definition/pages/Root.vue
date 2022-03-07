<template>
  <div>
    <vl-layout>
      <vl-grid v-vl-align:center mod-stacked>
        <vl-column>
          interessante definitie van de dag
        </vl-column>
        <vl-column>
          {{ randomDefinition.label }}
        </vl-column>
        <vl-column>
          {{ randomDefinition.description }}
        </vl-column>
        <vl-column>
          {{ randomDefinition.reference }}
        </vl-column>
      </vl-grid>
    </vl-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {deleteEntireDictionary} from "../../../store/OsloDictionary";
import {OsloStore} from "../../../store/OsloStore";

const osloStore = OsloStore.getInstance();
const definition = osloStore.getRandomDefinition();

export default Vue.extend({
  name: "root",
  data: () => {
    return {
      randomDefinition: definition
    };
  }
});
</script>

<style lang="scss">
@import "../css/style.scss";

</style>
