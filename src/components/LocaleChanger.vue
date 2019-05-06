<template>
  <span class="locale-changer">
    <!-- <select v-model="$i18n.locale"> -->
    <select v-model="locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
        lang
      }}</option>
    </select>
  </span>
</template>

<script>
const SAVED_LOCALE = "locale"
const DEFAULT_LOCALE = "se"

export default {
  name: "LocaleChanger",
  data() {
    return {
      langs: ["se", "en"],
      locale: DEFAULT_LOCALE,
    }
  },
  created() {
    // set locale to saved locale
    this.locale = localStorage.getItem(SAVED_LOCALE) || DEFAULT_LOCALE
  },
  watch: {
    locale() {
      //   console.log("setting", this.locale)
      this.$i18n.locale = this.locale
      localStorage.setItem(SAVED_LOCALE, this.locale)
    },
  },
}
</script>
