<script lang="ts">
// Inspired by https://alligator.io/vuejs/file-reader-component/

import { Component, Vue, Prop } from "vue-property-decorator"
export type Vrefs = Vue & { click: () => void }

@Component({
  components: {},
})
export default class CharacterListView extends Vue {
  @Prop({ default: "Read file" }) label!: string
  @Prop({ default: "" }) accept!: string
  filename = ""

  loadTextFromFile(ev: any) {
    if (!ev || !ev.target) return
    const file = ev.target.files[0]
    this.filename = file.name
    const reader = new FileReader()

    reader.onload = (e: any) =>
      this.$emit("load", { name: this.filename, data: e.target.result })
    reader.readAsText(file)
  }

  click() {
    ;(this.$refs.fileinput as Vrefs).click()
  }
}
</script>

<template>
  <div class="filereader">
    <label for="inputFile" class="button text-reader">
      {{ label }}
      <input
        id="inputFile"
        type="file"
        ref="fileinput"
        :accept="accept"
        @change="loadTextFromFile"
      />
    </label>
    <!-- Created a button that triggers the input in order to force clicks to register properly -->
    <div>
      <button class="button filereader-button" @click="click">
        {{ label }}
      </button>
      <span class="filename" v-if="filename">{{ filename }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.filereader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.filereader-button {
  margin-right: 1rem;
}

.text-reader {
  position: absolute;
  top: 0;
  z-index: -1;
  opacity: 0;
  overflow: hidden;
  display: inline-block;

  // border: 2px solid black;
  // border-radius: 5px;
  // padding: 8px 12px;
  // cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
