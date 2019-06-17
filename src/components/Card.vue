<script lang="ts">
import Vue from "vue"

const VALID = "✓"
const INVALID = "✖"

export default Vue.extend({
  name: "CharacterCreatorCard",
  props: {
    title: String,
    subtitle: String,
    fullWidth: Boolean,
    footer: String,
    valid: {
      type: Boolean,
      default: false,
    },
    noSign: {
      type: Boolean,
      default: false,
    },
  },
  // created() {
  //   this.$on("card-sign", (message: any) => {
  //     if (message === INVALID) {
  //       this.sign = INVALID
  //       this.valid = false
  //     } else {
  //       this.sign = VALID
  //       this.valid = true
  //     }
  //   })
  // },
  computed: {
    sign(): string {
      if (this.noSign) return ""
      return this.valid ? VALID : INVALID
    },
  },
  data() {
    return {
      // sign: "",
      // valid: false,
    }
  },
})
</script>

<template>
  <div :class="['stat-card', valid ? '' : 'stat-card-invalid']">
    <div class="header">
      <h2 v-if="title">{{ title }}</h2>
      <span :class="['card-sign', valid ? '' : 'card-sign-invalid']">
        {{ sign }}
      </span>
    </div>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    <div class="card-contents">
      <slot></slot>
    </div>
    <div class="card-footer">{{ footer }}</div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~Style/colors.less";

h1,
h2,
h3 {
  // margin: 40px 0 0;
  width: 100%;
  text-align: center;
  font-variant-caps: small-caps;
  &::first-letter {
    text-transform: uppercase;
  }
}

.card-sign {
  position: absolute;
  right: 0;
  margin-left: auto;
  // margin-bottom: -3rem;
  font-size: 2rem;
  color: @pastel-green;

  &-invalid {
    color: @pastel-red;
    // background-color: black;
  }
}

.header {
  flex-grow: 0;
  display: flex;
  align-items: center;
  position: relative;
}

.card-contents {
  flex-grow: 1;
}

.subtitle {
  font-style: italic;
  text-align: left;
  margin: 0.4rem;
}

.stat-card {
  margin: 0 0.25rem 0.5rem 0.25rem;
  // width: 50vw;
  // background: #fafafa;
  // margin: 0.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  // flex-grow: 1;
  // flex-basis: 40%;
  min-width: 18rem;
  justify-content: space-around;
  align-content: space-between;

  // border: solid gray 2px;
  // border: solid rgba(66, 185, 131, 0.3) 2px;
  // border: solid #42b98344 2px;
  // border: solid #42b98399 2px;
  border: solid ~"@{pastel-green}99" 2px;
  // &-invalid {
  //   border: solid ~"@{pastel-red}44" 2px;
  // }
  border-radius: 1rem;
  padding: 1rem;
  // align-content: center;
  // justify-items: baseline;
  // align-items: baseline;
  // box-shadow: 0px 1px 5px #555;
}

// .row-full {
//   width: 100%;
// }

input:valid.with-checkbox + span::before {
  content: "✓";
  // padding-left: 5px;
}

input:invalid.with-checkbox + span::before {
  content: "✖";
  // padding-left: 5px;
}
</style>
