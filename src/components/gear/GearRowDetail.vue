<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { Item, ItemWeapon, ITEM_TYPE, Range } from "@/data/items/itemTypes"
import SvgIcon from "@/components/SvgIcon.vue"
import { iconFor, iconForType } from "./util"

function getWeaponDetails(vm: Vue, weapon: ItemWeapon) {
  function getRange() {
    return vm.$t(Range[weapon.range])
  }

  function getFeatures() {
    return Object.entries(weapon.features)
      .filter((feature) => {
        return feature[1]
      })
      .map((feature) => String(vm.$t(feature[0])))
  }
  return [`${vm.$t("Range")}: ${getRange()}`, ...getFeatures()].join(", ")
}

@Component({
  components: {
    SvgIcon,
  },
})
export class GearRowDetail extends Vue {
  @Prop({ default: () => {} }) item!: Item
  @Prop({ default: "" }) icon!: string
  @Prop({ default: "" }) type!: ITEM_TYPE
  @Prop({ default: true }) showDetails!: boolean
  @Prop({ default: true }) underline!: boolean
  @Prop({ default: true }) showBonus!: boolean

  get details(): string {
    if (!this.showDetails) return ""
    if (this.item?.type !== "weapon") return ""
    return getWeaponDetails(this, this.item)
  }

  get comment() {
    return this.item?.comment
  }

  get name(): string {
    return this.item?.name || ""
  }

  get mIcon(): string {
    if (this.icon) return this.icon
    if (this.item) return iconFor(this.item)
    if (this.type) return iconForType(this.type)
    return ""
  }

  get artifactDiceSides(): number {
    if (this.item?.artifactDice?.[0]) {
      return this.item.artifactDice[0].sides
    }
    return 0
  }

  get missingCategory(): boolean {
    return this.item?.type === "weapon" && !this.item?.category
  }
}

export default GearRowDetail
</script>

<template>
  <div class="GearRowDetail-Box">
    <div class="info">
      <div class="name-box">
        <SvgIcon v-if="mIcon" :name="mIcon" />
        <div :class="['name', underline && 'underlined']">{{ name }}</div>
      </div>

      <div v-if="missingCategory" class="details info-warning">
        <span>Missing category</span>
      </div>
      <div v-if="details" class="details capitalize">
        {{ details }}
      </div>
      <div v-if="comment" class="details">
        {{ comment }}
      </div>
    </div>

    <div class="dice-stats capitalize">
      <div v-if="showBonus && item && item.bonus" class="details nowrap">
        {{ $t("bonus") + " " + item.bonus }}
      </div>
      <div v-if="item && item.damage" class="details nowrap">
        {{ $t("dmg") + " " + item.damage }}
      </div>
      <div v-if="artifactDiceSides" class="details nowrap">
        {{ $t("D") + artifactDiceSides }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.GearRowDetail-Box {
  text-align: left;
  font-weight: normal;
  font-size: 1rem;
  display: flex;
}

.dice-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.info {
  flex-grow: 1;
}

.name-box {
  display: flex;
  :not(:last-child) {
    margin-right: 5px;
  }

  .underlined {
    text-decoration: underline dotted @color-main;
  }
  .name {
    word-wrap: break-word;
    flex-grow: 1;
    hyphens: auto;
  }
  svg {
    flex-shrink: 0;
  }
}

.details {
  grid-area: details;
  color: #000000a0;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  margin-top: 3px;
}

.nowrap {
  white-space: nowrap;
}

.info-warning {
  color: @color-danger;
  display: flex;
  align-items: center;
}
</style>
