<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { CharacterData, CharacterTalent } from "@/characterData"
import { Item } from "@/data/items/itemTypes"

import FLNumberInput from "@/components/FLNumberInput.vue"

@Component({
  components: {
    FLNumberInput,
  },
})
export default class MountStats extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean
  tempMovementRate = 0 // FIXME: store on chardata
}
</script>

<template>
  <div>
    <div class="mount-name">
      <label for="mount-name" class="block"> {{ $t("Name") }}</label>
      <input
        id="mount-name"
        type="text"
        v-model="charData.mount.name"
        :disabled="viewOnly"
      />
    </div>

    <div class="mount-attrib-row">
      <div>
        <label for="mount-strength" class="capitalize block">
          {{ $t("strength") }}
        </label>
        <FLNumberInput
          id="mount-strength"
          fontSize="1.7rem"
          v-model.number="charData.mount.strength"
          :disabled="viewOnly"
        />
      </div>
      <div>
        <label for="mount-agility" class="capitalize block">
          {{ $t("agility") }}
        </label>
        <FLNumberInput
          id="mount-agility"
          fontSize="1.7rem"
          v-model.number="charData.mount.agility"
          :disabled="viewOnly"
        />
      </div>
      <div>
        <label for="movement-rate" class="capitalize block">
          {{ $t("movement rate") }}
        </label>
        <FLNumberInput
          id="movement-rate"
          fontSize="1.7rem"
          v-model.number="charData.mount.movementRate"
          :disabled="viewOnly"
        />
      </div>
    </div>

    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.mount-name {
  & > input {
    width: 100%;
  }
  margin-bottom: 1rem;
}

.mount-attrib-row {
  // display: inline-grid;
  // grid-template-columns: auto auto auto;
  // grid-gap: 1rem;
  & > div {
    display: inline-block;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
