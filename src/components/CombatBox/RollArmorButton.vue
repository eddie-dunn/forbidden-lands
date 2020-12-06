<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

import { CharData } from "@/data/character/characterData"
import IconButton from "@/components/base/IconButton.vue"
import { Item } from "@/data/items/itemTypes"

@Component({
  components: {
    IconButton,
  },
})
export class RollArmorButton extends Vue {
  @Prop({ required: true }) charData!: CharData

  get equippedArmor(): Item | undefined {
    return this.charData.gear.inventory.find(
      (i) => i.type === "armor" && i.equipped
    )
  }
  get equippedHelmet(): Item | undefined {
    return this.charData.gear.inventory.find(
      (i) => i.type === "helmet" && i.equipped
    )
  }
  get isArmorEquipped(): boolean {
    return Boolean(this.equippedArmor || this.equippedHelmet)
  }

  armorClicked() {
    if (!this.equippedArmor && !this.equippedHelmet) return
    const black =
      (this.equippedHelmet || { bonus: 0 }).bonus +
      (this.equippedArmor || { bonus: 0 }).bonus
    this.$root.$emit("open-dice-modal", {
      title: this.$t("armor"),
      dice: { black },
      disablePush: true,
    })
  }
}
export default RollArmorButton
</script>

<template>
  <IconButton
    icon="rolling-dices"
    @click="armorClicked"
    :disabled="!isArmorEquipped"
  >
    {{ $t("Armor") }}
  </IconButton>
</template>

<style scoped lang="less">
// @import "~Style/colors.less";
</style>
