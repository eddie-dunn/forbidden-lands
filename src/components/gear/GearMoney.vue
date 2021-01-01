<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import { CharData } from "@/data/character/characterData"
import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    FLNumberInput,
    SvgIcon,
  },
})
export class GearMoney extends Vue {
  @Prop({ default: null }) charData!: CharData
  @Prop({ default: false }) viewOnly!: boolean
}

export default GearMoney
</script>

<template>
  <div class="Box-GearMoney">
    <div class="money-item">
      <SvgIcon class="coin copper" name="two-coins" title="copper" />
      <FLNumberInput
        id="copper"
        fontSize="1.4rem"
        min="0"
        max="999"
        v-model="charData.gear.money.copper"
        :disabled="viewOnly"
      />
    </div>
    <div class="money-item">
      <SvgIcon class="coin silver" name="two-coins" title="silver" />
      <FLNumberInput
        id="silver"
        fontSize="1.4rem"
        min="0"
        max="999"
        v-model="charData.gear.money.silver"
        :disabled="viewOnly"
      />
    </div>
    <div class="money-item">
      <SvgIcon class="coin gold" name="two-coins" title="gold" />
      <FLNumberInput
        id="gold"
        fontSize="1.4rem"
        min="0"
        max="999"
        v-model="charData.gear.money.gold"
        :disabled="viewOnly"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.Box-GearMoney {
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
}

.coin {
  height: 40px;
  width: 40px;
}
.gold {
  fill: gold;
}
.copper {
  fill: #93523e;
}
.silver {
  fill: silver;
}

.money-item {
  flex: 0 0 30%;
  margin: 0 5px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
}
</style>
