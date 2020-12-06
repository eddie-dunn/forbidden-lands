<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { SET_PAGE_TITLE } from "@/store/store-types"
import en from "@/locales/en"
import se from "@/locales/se"
import de from "@/locales/de"
import { Option, FLSelect } from "@/components/base/FLSelect.vue"

@Component({
  components: { FLSelect },
})
export class TranslationsView extends Vue {
  base = "en"
  compare = "de"

  get options(): { id: string; name: string }[] {
    return [
      { id: "en", name: "English" },
      { id: "se", name: "Swedish" },
      { id: "de", name: "German" },
    ]
  }

  mounted() {
    this.$store.commit(SET_PAGE_TITLE, {
      title: "Translations",
      translate: false,
    })
  }

  missingSwedish() {
    return this.missingKeys(en, se)
  }

  missingGerman() {
    return this.missingKeys(en, de)
  }

  missingKeys(base: any, obj: any) {
    const missing = Object.keys(base).filter((k) => !obj[k])
    return missing
  }

  getObj(key: string) {
    let baseObj: any
    let compareObj: any
    switch (key) {
      case "de":
        return de
      case "se":
        return se
      default:
      case "en":
        return en
    }
  }

  get missing() {
    const baseObj = this.getObj(this.base)
    const compareObj = this.getObj(this.compare)
    return this.missingKeys(baseObj, compareObj)
  }
}

export default TranslationsView
</script>

<template>
  <div class="translations">
    <div class="compare">
      <FLSelect :options="options" v-model="compare" direction="column" />
      <div>vs</div>
      <FLSelect :options="options" v-model="base" direction="column" />
    </div>
    <div>
      {{ options.find((o) => o.id === compare).name }} is missing the following
      {{ missing.length }} keys from
      {{ options.find((o) => o.id === base).name }}
    </div>
    <pre>{{ missing }}</pre>
  </div>
</template>

<style lang="less" scoped>
.translations {
  text-align: left;
  padding: 1rem;
}
.compare {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2rem;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
