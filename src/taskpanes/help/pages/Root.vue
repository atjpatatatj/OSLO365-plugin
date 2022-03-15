<template>
  <div>
    <div data-vl-tabs data-vl-tabs-responsive-label="Navigatie">
      <div class="vl-tabs__wrapper">
        <div class="vl-tabs " data-vl-tabs-list role="tablist"><a class="vl-tab vl-tab--active" id="vl-tab-nummer-1" role="tab" data-vl-tab aria-controls="vl-tab-nummer-1-pane" href="#vl-tab-nummer-1">
          Trein
        </a><a class="vl-tab" id="vl-tab-nummer-2" role="tab" data-vl-tab aria-controls="vl-tab-nummer-2-pane" href="#vl-tab-nummer-2">
          Metro, tram en bus
        </a><a class="vl-tab" id="vl-tab-nummer-3" role="tab" data-vl-tab aria-controls="vl-tab-nummer-3-pane" href="#vl-tab-nummer-3">
          Fiets
        </a>
        </div>
        <button type="button" data-vl-tabs-toggle aria-expanded="false" class="vl-tabs__toggle" data-vl-close="false"><span>Navigatie</span></button>
      </div>
      <section class="vl-col--1-1 vl-tab__pane" data-vl-tab-pane tabindex="0" role="tabpanel" id="vl-tab-nummer-1-pane" hidden="hidden" aria-labelledby="vl-tab-nummer-1" data-vl-show="true">
        <div class="vl-title-wrapper vl-title-wrapper--cta">
          <h3 class="vl-title vl-title--h3 vl-title-wrapper__title vl-title-wrapper--cta__title">Trein</h3>
        </div>
        <div class="vl-typography">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </section>
      <section class="vl-col--1-1 vl-tab__pane" data-vl-tab-pane tabindex="0" role="tabpanel" id="vl-tab-nummer-2-pane" hidden="hidden" aria-labelledby="vl-tab-nummer-2">
        <div class="vl-title-wrapper vl-title-wrapper--cta">
          <h3 class="vl-title vl-title--h3 vl-title-wrapper__title vl-title-wrapper--cta__title">Metro, tram en bus</h3>
        </div>
        <div class="vl-typography">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </section>
      <section class="vl-col--1-1 vl-tab__pane" data-vl-tab-pane tabindex="0" role="tabpanel" id="vl-tab-nummer-3-pane" hidden="hidden" aria-labelledby="vl-tab-nummer-3">
        <div class="vl-title-wrapper vl-title-wrapper--cta">
          <h3 class="vl-title vl-title--h3 vl-title-wrapper__title vl-title-wrapper--cta__title">Fiets</h3>
        </div>
        <div class="vl-typography">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </section>
    </div>
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
@import "~@govflanders/vl-ui-tabs/src/scss/tabs";
</style>