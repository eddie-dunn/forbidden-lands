<script lang="ts">
// Inspired by https://alligator.io/vuejs/file-reader-component/

import { Component, Vue, Prop } from "vue-property-decorator"
import IconButton from "@/components/base/IconButton.vue"

export type Vrefs = Vue & { click: () => void }

@Component({
  components: {
    IconButton,
  },
})
export default class FLFileReader extends Vue {
  @Prop({ default: "Read file" }) label!: string
  @Prop({ default: "" }) accept!: string
  filename = ""
  inputFile = "inputFile"
  index = 0

  loadTextFromFile(ev: any) {
    if (!ev || !ev.target) {
      return
    }
    const file = ev.target.files[0]
    this.filename = file.name
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.$emit("load", { name: this.filename, data: e.target.result })
    }
    reader.readAsText(file)
  }

  click() {
    ;(this.$refs.fileinput as Vrefs).click()
  }

  remove() {
    this.$emit("load", { name: null, data: null })
    this.filename = ""
    this.inputFile = this.inputFile + this.index++
  }
}
</script>

<template>
  <div class="filereader">
    <label :for="inputFile" class="button text-reader">
      {{ label }}
      <input
        :key="inputFile"
        :id="inputFile"
        type="file"
        ref="fileinput"
        :accept="accept"
        @change="loadTextFromFile"
      />
    </label>
    <!-- Created a button that triggers the input in order to force clicks to register properly -->
    <div>
      <button v-if="!filename" class="button filereader-button" @click="click">
        {{ label }}
      </button>
      <div class="filename" v-if="filename">
        <div>
          {{ filename }}
        </div>
        <IconButton icon="delete" color="danger" @click="remove"></IconButton>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.filename {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
}

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
}

.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
