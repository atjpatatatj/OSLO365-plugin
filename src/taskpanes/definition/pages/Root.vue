<template>
  <div>
    <vl-layout>
      <vl-grid v-vl-align:center mod-stacked>
        <vl-column>
          <br><h2 class="vl-title vl-title--h2" id="title">
            interessante definitie van de dag
          </h2>
        </vl-column>
        <vl-column id="content">
          <h4 class="vl-title vl-title--h4">
            {{ randomDefinition.label }}
          </h4><br>
          {{ randomDefinition.description }}
          <br>
          <br><br><a href="#" class="vl-link">
            {{ randomDefinition.reference }}
          </a>
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
#title {
  background-color: #ffe615;
}
h3{
  text-decoration: underline;
}




</style>
