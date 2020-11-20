<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharData } from "@/data/character/characterData"
import { PROFESSION } from "@/classes"

@Component({
  components: {},
})
export class GearStarting extends Vue {
  @Prop({ default: null }) charData!: CharData

  PROFESSION = PROFESSION
}

export default GearStarting
</script>

<template>
  <div v-if="charData.metadata.status === 'new'" class="Box-GearStarting">
    <h4>{{ $t("Starting gear") }}</h4>
    <div v-if="charData.metadata.startingItems">
      <p
        v-for="item in charData.metadata.startingItems.split('\n')"
        v-bind:key="item"
      >
        ✣ {{ item }}
      </p>
    </div>
    <div v-else>
      {{ $t(PROFESSION[charData.profession].gear_description) }}
    </div>
    <p>
      Silver:
      {{
        $t("D") +
          PROFESSION[charData.profession].starting_resources.silver +
          " (" +
          $t("Roll dice before session starts") +
          ")"
      }}
    </p>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.Box-GearStarting {
  display: block;
}
</style>
