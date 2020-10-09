<script lang="ts">
// TODO: Look into http://youmightnotneedjs.com/#tabs for tabs
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import uuid1 from "uuid/v1"
import Modal from "@/components/Modal.vue"
import FLButton from "@/components/base/FLButton.vue"
import FLInput from "@/components/base/FLInput.vue"
import { CharacterData, CharacterTalent } from "@/data/character/characterData"
import { allItems } from "@/data/items/items.ts"
import { Item } from "@/data/items/itemTypes"
import { capitalize } from "@/util/util"
import ItemTemplatePicker from "@/components/gear/ItemTemplatePicker.vue"
import FLNumberInput from "@/components/FLNumberInput.vue"
import TabBar from "@/components/base/TabBar.vue"

function defaultItem(): Item {
  return {
    bonus: 0,
    bonusType: null,
    equipped: false,
    name: "",
    weight: 1,
    type: "",
    id: uuid1(),
    features: {},
  }
}

@Component({
  components: {
    FLButton,
    FLInput,
    FLNumberInput,
    ItemTemplatePicker,
    Modal,
    TabBar,
  },
})
export default class AddItem extends Vue {
  @Prop() editItem!: Item | null
  @Prop({ default: "" }) title!: string

  tmpGear: Item = JSON.parse(JSON.stringify(this.editItem || defaultItem()))

  get isWeapon(): boolean {
    return this.tmpGear.type === "weapon"
  }

  pageFor(itemType: string) {
    const loc = this.$i18n.locale
    if (itemType === "weapon") {
      return loc === "se" ? "98+" : "101+"
    }
    if (itemType === "armor") {
      return loc === "se" ? "103" : "106"
    }
    if (itemType === "helmet") {
      return loc === "se" ? "103" : "106"
    }
    if (itemType === "shield") {
      return loc === "se" ? "102" : "106"
    }
    if (itemType === "other") {
      return loc === "se" ? "176+" : "182+"
    }
    return "?"
  }

  save() {
    if (!this.tmpGear.name) {
      this.tmpGear.name = "???"
    }
    this.$emit("add-item", this.tmpGear)
    this.close()
  }

  close() {
    this.$emit("close")
  }

  templateActive = !this.editItem
  newActive = !this.templateActive
  showTemplate() {
    this.newActive = false
    this.templateActive = true
  }
  showNew() {
    this.newActive = true
    this.templateActive = false
  }

  activeFilter = ""
  get filteredItems() {
    return allItems.filter(
      (item) =>
        (this.$t(item.name) as string).indexOf(
          this.activeFilter.toLowerCase()
        ) >= 0
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
  get armorTemplates() {
    return this.filteredItems.filter((item) => item.type === "armor")
  }
  selectTemplateItem(id: string) {
    const item = allItems
      .filter((item) => item.id === id)
      .map((item) => {
        return {
          ...item,
          id: uuid1(),
          name: capitalize(this.$t(item.name) as string),
        }
      })
      .pop()
    if (item) {
      this.tmpGear = item
      this.showNew()
    }
  }

  onTemplatePicked(item: any) {
    this.tmpGear = item
    this.showNew()
    this.tabIndex = 1
  }

  tabIndex = 0
  onTabClicked(index: number) {
    this.tabIndex = index
  }

  get tabButtons() {
    return [
      {
        name: this.$t("Template"),
        onClick: () => {
          this.showTemplate()
        },
      },
      {
        name: this.$t("Details"),
        onClick: () => {
          this.showNew()
        },
      },
    ]
  }
}
</script>

<template>
  <Modal
    class="inventory-modal"
    @close="close"
    :maximized="true"
    :title="title"
  >
    <div v-if="!editItem" slot="header" class="item-modal-header">
      <TabBar
        v-if="true"
        :buttons="tabButtons"
        @tab-active="onTabClicked"
        :currentTabIndex="tabIndex"
      />
    </div>
    <div slot="body" class="modal-body">
      <!-- Template view -->
      <ItemTemplatePicker
        v-if="templateActive"
        @template-picked="onTemplatePicked"
      />

      <!-- Item detail view -->
      <div v-if="newActive" class="new-item-form">
        <label for="gear-name">{{ $t("Name") }}</label>
        <input
          id="gear-name"
          type="text"
          v-model="tmpGear.name"
          placeholder="???"
        />

        <label for="gear-type">{{ $t("Type") }}</label>
        <select id="gear-type" v-model="tmpGear.type">
          <option disabled value="">{{ $t("Choose") }}</option>
          <option value="armor">{{ $t("Armor") }}</option>
          <option value="helmet">{{ $t("Helmet") }}</option>
          <option value="shield">{{ $t("Shield") }}</option>
          <option value="weapon">{{ $t("Weapon") }}</option>
          <option value="other">{{ $t("Other") }}</option>
        </select>

        <label for="gear-weight">{{ $t("Weight") }}</label>
        <select v-model.number="tmpGear.weight">
          <option disabled value="">{{ $t("Choose") }}</option>
          <option :value="0">{{ $t("Tiny") }}</option>
          <option :value="0.5">{{ $t("Light") }}</option>
          <option :value="1">Normal</option>
          <option :value="2">{{ $t("Heavy") }}</option>
        </select>

        <label for="gear-bonus">Bonus</label>
        <FLNumberInput
          v-model.number="tmpGear.bonus"
          min="0"
          max="99"
          fontSize="1.7rem"
        />

        <label v-if="isWeapon" for="gear-damage">{{ $t("Damage") }}</label>
        <FLNumberInput
          v-if="isWeapon"
          v-model.number="tmpGear.damage"
          fontSize="1.7rem"
          min="0"
          max="99"
        />

        <label v-if="isWeapon" for="gear-range">{{ $t("Range") }}</label>
        <select
          v-model.number="tmpGear.range"
          v-if="isWeapon"
          class="capitalize"
        >
          <option disabled value="">{{ $t("Choose") }}</option>
          <option class="capitalize" value="0">
            {{ $t("Armslength") }}
          </option>
          <option class="capitalize" value="1">{{ $t("Near") }}</option>
          <option class="capitalize" value="2">{{ $t("Short") }}</option>
          <option class="capitalize" value="3">{{ $t("Long") }}</option>
        </select>

        <label for="gear-comment">{{ $t("Comment") }}</label>
        <input type="text" v-model="tmpGear.comment" />

        <label v-if="isWeapon" for="weapon-features">
          {{ $t("Features") }}
        </label>
        <div v-if="isWeapon" id="weapon-features" class="grid-features">
          <div class="flex">
            <input
              v-model="tmpGear.features.blunt"
              type="checkbox"
              name="blunt"
              id="blunt"
            />
            <label class="capitalize" for="blunt">{{ $t("blunt") }}</label>
          </div>
          <div class="flex">
            <input
              type="checkbox"
              name="pointed"
              id="pointed"
              v-model="tmpGear.features.pointed"
            />
            <label class="capitalize" for="pointed">{{ $t("pointed") }}</label>
          </div>
          <div class="flex">
            <input
              type="checkbox"
              name="edged"
              id="edged"
              v-model="tmpGear.features.edged"
            />
            <label class="capitalize" for="edged">{{ $t("edged") }}</label>
          </div>
          <div class="flex">
            <input
              type="checkbox"
              name="parrying"
              id="parrying"
              v-model="tmpGear.features.parrying"
            />
            <label class="capitalize" for="parrying">
              {{ $t("parrying") }}
            </label>
          </div>
          <div class="flex">
            <input
              type="checkbox"
              name="hook"
              id="hook"
              v-model="tmpGear.features.hook"
            />
            <label class="capitalize" for="hook">{{ $t("hook") }}</label>
          </div>
          <div class="flex">
            <input
              type="checkbox"
              name="slow_loading"
              id="slow_loading"
              v-model="tmpGear.features.slow_loading"
            />
            <label class="capitalize" for="slow_loading">
              {{ $t("slow_loading") }}
            </label>
          </div>
        </div>

        <div v-if="tmpGear.type" class="grid-row-full">
          <h4>Info</h4>
          <div>
            {{ $t("PHB_ref", { page: pageFor(tmpGear.type) }) }}
          </div>
        </div>

        <!-- End Item View -->
      </div>
    </div>

    <div class="modal-button-row" slot="footer">
      <FLButton @click="close" type="cancel">
        {{ $t("Cancel") }}
      </FLButton>
      <FLButton @click="save">OK</FLButton>
    </div>

    <!-- spacer -->
  </Modal>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.flex {
  display: flex;
}

.grid-features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13ch, 1fr));
}
.grid-row-full {
  grid-column-start: 1;
  grid-column-end: -1;
}

.modal-body {
  overflow: auto;
  text-align: left;
  max-width: 70rem;
  padding: 1rem;
  margin: 1rem auto;
}

.new-item-form {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  align-items: center;
}

.modal-button-row {
  border-top: solid @pastel-green 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.inventory-modal {
  margin: 0 auto;
}
</style>
