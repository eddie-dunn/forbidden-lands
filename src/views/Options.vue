<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import { SET_PAGE_TITLE } from "@/store/store-types"
import Backup from "@/components/Backup.vue"
import LocaleChanger from "@/components/LocaleChanger.vue"
import { FLButton } from "src/components/base/FLButton.vue"
import { FLToggle } from "@/components/base/FLToggle.vue"
import { COMBAT_BOX_KEY, MULTIPLAY_KEY } from "src/util/const"

@Component({
  components: {
    Backup,
    FLButton,
    FLToggle,
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

  get multiplayEnabled() {
    return !!localStorage.getItem(MULTIPLAY_KEY)
  }
  setMultiplay(val: boolean) {
    if (val) {
      localStorage.setItem(MULTIPLAY_KEY, String(val))
    } else {
      localStorage.removeItem(MULTIPLAY_KEY)
    }
    this.update()
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
    <div class="toggle-grid">
      <FLToggle
        suffix="Show combat card on character sheet"
        :value="combatBoxEnabled"
        @input="setCombatBox"
      />
      <FLToggle
        suffix="Multiplayer"
        :value="multiplayEnabled"
        @input="setMultiplay"
      />
    </div>
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

.toggle-grid {
  display: grid;
  grid-template-columns: auto;
  grid-gap: 1rem;
}
</style>
