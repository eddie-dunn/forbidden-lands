<script lang="ts">
import Vue from "vue"

import Expander from "@/components/ExpandableSection.vue"

const VALID = "✓"
const INVALID = "✖"

export default Vue.extend({
  name: "CharacterCreatorCard",
  components: {
    Expander,
  },
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
    defaultOpen: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    sign(): string {
      if (this.noSign) return ""
      return this.valid ? VALID : INVALID
    },
  },
})
</script>

<template>
  <Expander
    :class="['card']"
    :defaultOpen="defaultOpen"
    :iconRight="sign"
    :iconRightOK="valid"
  >
    <template v-slot:header>
      <slot name="header">
        {{ title }}
      </slot>
    </template>
    <template v-slot:icon-right>
      <slot name="icon-right"></slot>
    </template>

    <template v-slot:default>
      <div :class="['stat-card']">
        <div class="header"></div>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
        <div class="card-contents">
          <slot></slot>
        </div>
        <div class="card-footer">{{ footer }}</div>
      </div>
    </template>
  </Expander>
</template>

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

.card {
  margin: 0 0.25rem 0.5rem 0.25rem;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  min-width: 18rem;
  background: @background-color;
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
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: space-between;
  padding: 0.25rem;
}

input:valid.with-checkbox + span::before {
  content: "✓";
  // padding-left: 5px;
}

input:invalid.with-checkbox + span::before {
  content: "✖";
  // padding-left: 5px;
}
</style>
