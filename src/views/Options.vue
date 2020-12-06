<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import { SET_PAGE_TITLE } from "@/store/store-types"
import Backup from "@/components/Backup.vue"
import LocaleChanger from "@/components/LocaleChanger.vue"
import { FLButton } from "src/components/base/FLButton.vue"
import { FLCheckbox } from "src/components/base/FLCheckbox.vue"
import { COMBAT_BOX_KEY } from "src/util/const"

@Component({
  components: {
    Backup,
    FLButton,
    FLCheckbox,
    LocaleChanger,
  },
})
export default class DiceView extends Vue {
  mounted() {
    this.$store?.commit(SET_PAGE_TITLE, "Options")
  }

  update() {
    // window.location.replace("/")
    window.location.reload()
  }

  get combatBoxEnabled() {
    return !!localStorage.getItem(COMBAT_BOX_KEY)
  }
  setCombatBox(val: boolean) {
    if (val) {
      localStorage.setItem(COMBAT_BOX_KEY, String(val))
    } else {
      localStorage.removeItem(COMBAT_BOX_KEY)
    }
  }
}
</script>

<template>
  <div class="options">
    <h2>{{ $t("Language") }}</h2>
    <LocaleChanger />

    <h2>Data</h2>
    <Backup />

    <h2>Update app</h2>
    <div>
      <FLButton type="danger" @click="update">Update</FLButton>
    </div>

    <h2>Beta features</h2>
    <FLCheckbox
      :label="'Show combat card on character sheet'"
      :value="combatBoxEnabled"
      @input="setCombatBox"
    />
  </div>
</template>

<style scoped lang="less">
.options {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: left;
  margin: 1rem;
}

.options-language {
  margin: 1rem;
}
</style>
