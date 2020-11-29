<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator"

import { IDiceConfigLogEntry } from "@/dice/diceTypes"
import { DiceImg } from "src/components/diceRoller/DiceImg.vue"

@Component({
  components: {
    DiceImg,
  },
})
export class DiceModifier extends Vue {
  @Prop({ required: true }) entry!: IDiceConfigLogEntry
  dice = this.entry.dice
  name = this.entry.name
  rank = this.entry.rank

  //   modifier = this.entry.modifier
  get modifier() {
    // return this.entry.modifier
    if (this.entry.modifier < 0) {
      return this.entry.modifier
    }
    return `+${this.entry.modifier}`
  }

  get id() {
    if (this.entry.id === "weapon") {
      return ""
    }
    return this.$t(this.entry.id)
  }

  get suffix() {
    const suffix = []
    if (this.entry.name) {
      suffix.push(this.entry.name)
    }
    if (this.entry.rank) {
      suffix.push(this.entry.rank)
    }
    return suffix.join(" ")
  }
}

export default DiceModifier
</script>

<template>
  <div class="Box-DiceModifier">
    <DiceImg :diceType="dice" :nbrDice="modifier" />
    <span class="capitalize expl">{{ id }} {{ suffix }}</span>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.Box-DiceModifier {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  text-align: left;
  align-items: center;
}

.expl {
  font-size: 1.3rem;
  font-family: monospace;
}
</style>
