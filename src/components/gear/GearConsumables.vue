<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import ExpandableSection from "@/components/ExpandableSection.vue"
import { FLSelect, Option } from "@/components/base/FLSelect.vue"
import { IconButton } from "@/components/base/IconButton.vue"
import { CharData } from "@/data/character/characterData"
import { PROFESSION } from "@/classes"

@Component({
  components: {
    ExpandableSection,
    FLSelect,
    IconButton,
  },
})
export class GearConsumables extends Vue {
  @Prop({ default: null }) charData!: CharData
  @Prop({ default: false }) viewOnly!: boolean

  get diceOptions(): Option[] {
    return [
      { id: "0" },
      { id: "6", name: String(this.$t("D")) + 6 },
      { id: "8", name: String(this.$t("D")) + 8 },
      { id: "10", name: String(this.$t("D")) + 10 },
      { id: "12", name: String(this.$t("D")) + 12 },
    ]
  }

  // TODO: Add rollers for consumables
  click(name: "food" | "water" | "arrows" | "torches") {
    switch (name) {
      case "food":
        // eslint-disable-next-line no-console
        console.log("roll for food")
        break
      case "water":
        // eslint-disable-next-line no-console
        console.log("roll for water")
        break
      case "arrows":
        // eslint-disable-next-line no-console
        console.log("roll for arrows")
        break
      case "torches":
        // eslint-disable-next-line no-console
        console.log("roll for torches")
        break
    }
  }

  startingConsumable(consumable: string) {
    if (!this.charData.profession) return 0
    return (
      PROFESSION[this.charData.profession].starting_resources[consumable] || 0
    )
  }

  @Watch("charData.profession", { immediate: true })
  setConsumables() {
    if (!this.charData.profession || this.charData.metadata.status !== "new") {
      return
    }
    this.charData.gear.consumables.food = this.startingConsumable("food")
    this.charData.gear.consumables.water = this.startingConsumable("water")
    this.charData.gear.consumables.arrows = this.startingConsumable("arrows")
    this.charData.gear.consumables.torches = this.startingConsumable("torches")
  }
}

export default GearConsumables
</script>

<template>
  <div class="Box-GearConsumables">
    <div class="consumable">
      <FLSelect
        :label="$t('Food')"
        direction="column"
        :options="diceOptions"
        v-model.number="charData.gear.consumables.food"
      />
      <IconButton class="roll" icon="rolling-dices" @click="click('food')" />
    </div>

    <div class="consumable">
      <FLSelect
        :label="$t('Water')"
        direction="column"
        :options="diceOptions"
        v-model.number="charData.gear.consumables.water"
      />
      <IconButton class="roll" icon="rolling-dices" @click="click('water')" />
    </div>

    <div class="consumable">
      <FLSelect
        :label="$t('Arrows')"
        direction="column"
        :options="diceOptions"
        v-model.number="charData.gear.consumables.arrows"
      />
      <IconButton class="roll" icon="rolling-dices" @click="click('arrows')" />
    </div>

    <div class="consumable">
      <FLSelect
        :label="$t('Torches')"
        direction="column"
        :options="diceOptions"
        v-model.number="charData.gear.consumables.torches"
      />
      <IconButton class="roll" icon="rolling-dices" @click="click('torches')" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.Box-GearConsumables {
  display: grid;
  // grid-template-columns: 1fr 1fr;
  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
  grid-gap: 1rem;
  max-width: 450px;
  align-content: end;

  .consumable {
    display: inline-flex;
    margin: auto;
    .roll {
      display: none; // TODO: Add dice rolling functionality for consumables
      margin: 1em 5px 0 5px;
    }
  }
}
</style>
