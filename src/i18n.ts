import Vue from "vue"
import VueI18n from "vue-i18n"
import en from "@/locales/en"
import se from "@/locales/se"

Vue.use(VueI18n)

export const LOCALE_KEY = "__localeSetting"
const DEFAULT_LOCALE = "en"
const CURRENT_LOCALE = localStorage.getItem(LOCALE_KEY) || DEFAULT_LOCALE

// export default new VueI18n({
const i18n = new VueI18n({
  // TODO: VUE_APP_I18N_LOCALE is never used; reconfigure?
  locale: CURRENT_LOCALE || process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  // silentTranslationWarn: true,
  messages: {
    // ...loadLocaleMessages(),
    se,
    en,
  },
})

// TODO: Remove?
export function $t(key: string) {
  return i18n.t(key)
}

export default i18n
