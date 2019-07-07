<script>
import { LOCALE_KEY } from "@/i18n"
// const LOCALE_KEY = "__localeSetting"
const DEFAULT_LOCALE = "en"

export default {
  name: "LocaleChanger",
  data() {
    return {
      langs: ["se", "en"],
    }
  },
  watch: {
    "$i18n.locale"() {
      localStorage.setItem(LOCALE_KEY, this.$i18n.locale)
    },
  },
}
</script>

<template>
  <span class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </span>
</template>
