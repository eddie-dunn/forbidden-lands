<template>
  <svg :class="className" xmlns="http://www.w3.org/2000/svg">
    <title v-if="title">{{ title }}</title>
    <use
      v-bind="{ 'xlink:href': iconPath }"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    />
  </svg>
</template>

<script>
function importAll(r) {
  return r.keys().map(r)
}

const IMAGES = importAll(
  require.context("@/assets/icons", true, /\.(png|jpe?g|svg)$/)
)

const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id.replace("-usage", "")] = item
    return obj
  }, {})

const IMG_MAP = arrayToObject(IMAGES.map((item) => item.default))

export default {
  name: "svg-icon",

  props: {
    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: null,
    },
  },

  computed: {
    iconPath() {
      const img = IMG_MAP[this.name]
      if (img) return img.url
      else {
        /* eslint-disable no-console */
        console.error("+++ image not found:", this.name)
        // console.error("+++ IMG_MAP:", IMG_MAP)
        /* eslint-enable no-console */
      }
      return img.url

      // let icon = require(`@/assets/icons/${this.name}.svg`)
      // if (Object.prototype.hasOwnProperty.call(icon, "default")) {
      //   icon = icon.default
      // }
      // return icon.url
    },

    className() {
      return "svg-icon svg-icon--" + this.name
    },
  },
}
</script>

<style>
.svg-icon {
  pointer-events: none;
  fill: currentColor;
  height: 24px;
  width: 24px;
  display: inline-block;
  vertical-align: middle;
}
</style>
