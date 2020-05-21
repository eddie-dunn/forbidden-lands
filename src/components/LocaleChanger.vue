<script>
import { LOCALE_KEY } from "@/i18n"
import { SET_PAGE_TITLE, GET_PAGE_TITLE } from "@/store/store-types"
const DEFAULT_LOCALE = "en"

export default {
  name: "LocaleChanger",
  data() {
    return {
      langs: [
        //
        { name: "Brazilian", key: "pt" },
        { name: "English", key: "en" },
        { name: "Swedish", key: "se" },
      ],
    }
  },
  watch: {
    "$i18n.locale"() {
      localStorage.setItem(LOCALE_KEY, this.$i18n.locale)

      const pageTitle = this.$store.getters[GET_PAGE_TITLE]
      this.$store.commit(SET_PAGE_TITLE, pageTitle)
    },
  },
}
</script>

<template>
  <span class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.key">
        {{ lang.name }}
      </option>
    </select>
  </span>
</template>
