<template>
  <vl-radio-tile
    class="radio-tile"
    name="oslo-search-result-radio"
    v-model="selectedRadioTile"
    :class="{dictionaryItemclass: dictionaryItem}"
    :value="value"
    :id="id"
    :title="title"
    :info="description"
  >
    <a :href="url">{{ url }}</a>
    <span
        :dictionaryItem="dictionaryItem"
        v-if="dictionaryItem === true"
        id="dictionary">
      <br><br>Gevonden in uw woorden
    </span>
  </vl-radio-tile>
</template>

<script lang="ts">
import Vue from "vue";
import EventBus from "../../utils/EventBus";
export default Vue.extend({
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: "radio-tile"
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    dictionaryItem: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      selectedRadioTile: {}
    };
  },
  watch: {
    selectedRadioTile(update) {
      EventBus.$emit("onRadioTileChanged", update);
    }
  }
});
</script>

<style lang="scss">
@import "./style.scss";

.radio-tile a {
  word-wrap: break-word;
}
#dictionary{
  color: #05c;
  font-weight: bold;
}
.dictionaryItemclass label{
  background-color: #ffe615;
}

/** Prevents jumping to top when clicking a radio tile */
input[type="radio"] {
  visibility: hidden;
}
</style>
