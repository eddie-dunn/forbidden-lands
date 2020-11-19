<script lang="ts">
// TODO: Look into http://youmightnotneedjs.com/#tabs for tabs
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import uuid1 from "uuid/v1"
import FLButton from "@/components/base/FLButton.vue"
import FLInput from "@/components/base/FLInput.vue"
import { CharacterData, CharacterTalent } from "@/data/character/characterData"
import { allItems } from "@/data/items/items.ts"
import { Item } from "@/data/items/itemTypes"
import { capitalize } from "@/util/util"

@Component({
  components: {
    FLButton,
    FLInput,
  },
})
export default class ItemTemplatePicker extends Vue {
  activeFilter = ""

  get filteredItems() {
    return allItems.filter(
      (item) =>
        String(this.$t(item.id)).indexOf(this.activeFilter.toLowerCase()) >= 0
    )
  }
  get rangedWeapons() {
    return this.filteredItems.filter(
      (item) => item.type === "weapon" && item.skill === "marksmanship"
    )
  }
  get meleeWeapons() {
    return this.filteredItems.filter(
      (item) => item.type === "weapon" && item.skill === "melee"
    )
  }
  get armor() {
    return this.filteredItems.filter((item) => item.type === "armor")
  }

  get itemTemplates() {
    return [
      { title: this.$t("melee weapons"), items: this.meleeWeapons },
      { title: this.$t("ranged weapons"), items: this.rangedWeapons },
      {
        title: this.$t("helmets"),
        items: this.filteredItems.filter((item) => item.type === "helmet"),
      },
      { title: this.$t("armor"), items: this.armor },
      {
        title: this.$t("shields"),
        items: this.filteredItems.filter((item) => item.type === "shield"),
      },
      {
        title: this.$t("other"),
        items: this.filteredItems.filter(
          (item) => !["weapon", "shield", "armor", "helmet"].includes(item.type)
        ),
      },
    ]
  }

  selectTemplateItem(id: string) {
    const item = allItems
      .filter((item) => item.id === id)
      .map((item) => {
        return { ...item, name: capitalize(this.$t(item.id) as string) }
      })
      .pop()
    if (item) {
      this.$emit("template-picked", item)
    }
  }
}
</script>

<template>
  <div class="template-itemss">
    <FLInput
      :label="$t('Filter')"
      v-model="activeFilter"
      class="template-filter"
    />
    <section
      v-for="section in itemTemplates"
      :key="section.title"
      class="template-items"
    >
      <h4 v-if="section.items.length" class="capitalize grid-full-width">
        {{ section.title }}
      </h4>
      <FLButton
        type="ghost"
        v-for="item in section.items"
        :key="item.id"
        class="template-item-button capitalize-first"
        @click="selectTemplateItem(item.id)"
      >
        {{ $t(item.id) }}
      </FLButton>
    </section>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
h4 {
  margin: 0.9rem 0 0 0;
}

.template-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15ch, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(15ch, auto));
  grid-gap: 10px;
}

.grid-full-width,
.template-filter {
  width: 100%;
  grid-column-start: 1;
  grid-column-end: -1;
}

.template-item-button {
  font-size: 1rem;
  hyphens: auto;
  text-align: left;
}

.inventory-modal {
  margin: 0 auto;
}
</style>
