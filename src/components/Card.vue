<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "CharacterCreatorCard",
  props: {
    title: String,
    subtitle: String,
    fullWidth: Boolean,
    footer: String,
  },
  created() {
    this.$on("card-sign", (message: any) => {
      this.sign = message
    })
  },
  data() {
    return {
      sign: "",
    }
  },
})
</script>

<template>
  <div class="stat-card row-full">
    <div class="header">
      <h3>{{ title }}</h3>
      <span>{{ sign }}</span>
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
h1,
h2,
h3 {
  // margin: 40px 0 0;
  width: 100%;
  text-align: center;
  &::first-letter {
    text-transform: uppercase;
  }
}

.header {
  flex-grow: 0;
  display: flex;
  align-items: center;
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
  // fix container margin issues:
  margin: 0 0.25rem 0.5rem 0.25rem;
  // width: 50vw;
  // background: #fafafa;
  // margin: 0.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 40%;
  min-width: 18rem;
  justify-content: space-around;
  align-content: space-between;

  // border: solid gray 2px;
  // border: solid rgba(66, 185, 131, 0.3) 2px;
  border: solid #42b98344 2px;
  border-radius: 1rem;
  padding: 1rem;
  // align-content: center;
  // justify-items: baseline;
  // align-items: baseline;
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
