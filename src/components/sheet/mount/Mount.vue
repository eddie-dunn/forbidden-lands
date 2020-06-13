<script lang="ts">
import Modal from "@/components/Modal.vue"
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { CharacterData, CharacterTalent } from "@/characterData"
import { Item } from "@/data/items/itemTypes"

import ModalAddItem from "@/components/gear/ModalAddItem.vue"
import FLNumberInput from "@/components/FLNumberInput.vue"
import FLButton from "@/components/base/FLButton.vue"

import MountStats from "@/components/sheet/mount/MountStats.vue"
import MountSkills from "@/components/sheet/mount/MountSkills.vue"
import MountInventory from "@/components/sheet/mount/MountInventory.vue"

@Component({
  components: {
    FLButton,
    FLNumberInput,
    Modal,
    ModalAddItem,
    MountInventory,
    MountSkills,
    MountStats,
  },
})
export default class Mount extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  get hasMount() {
    return this.charData.mount.strength
  }
}
</script>

<template>
  <div class="other-gear">
    <div class="mount-stats">
      <MountStats :charData="charData" :viewOnly="viewOnly" />
      <MountSkills :charData="charData" :viewOnly="viewOnly" />
    </div>

    <div v-if="hasMount">
      <MountInventory :charData="charData" />
    </div>

    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.mount-stats {
  // Keeping the flex solution for to see how cumbersome that would be :)
  // display: flex;
  // flex-wrap: wrap;
  // --margin-hack: 0.5rem;
  // margin: 0 calc(-1 * var(--margin-hack));
  // & > * {
  //   min-width: 349px;
  //   flex: 1 1 calc(50% - 5rem);
  //   margin: 0 var(--margin-hack);
  //   border: 1px solid black; // TODO: Remove
  // }
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
}
</style>
