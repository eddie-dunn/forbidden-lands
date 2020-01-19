<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { SaveData } from "@/localstorage/characterStorage"
import FileReader from "@/components/FileReader.vue"
import { setTimeout } from "timers"

function generateDateString(): string {
  return "backup-" + new Date().toISOString() + ".charlist.flcdata"
}

@Component({
  components: {
    FileReader,
  },
})
export default class Backup extends Vue {
  importKey = 1

  importData: SaveData | null = null
  importName = ""

  exportBlob: string = ""
  exportFilename: string = ""

  generateBlob() {
    this.exportBlob = this.$characterStore.getStorageDataBlob()
    this.exportFilename = generateDateString()
    // Release blob and reset backup data if backup has not been downloaded
    // within time limit:
    setTimeout(() => {
      this.releaseBlob()
    }, 25000)
    return this.exportBlob
  }

  releaseBlob() {
    window.URL.revokeObjectURL(this.exportBlob)
    this.exportFilename = ""
    this.exportBlob = ""
  }

  downloadClicked() {
    // Need small timeout to be able to download before releasing blob object:
    setTimeout(() => this.releaseBlob(), 500)
  }

  importDataLoaded(filedata: any) {
    this.importData = JSON.parse(filedata.data)
    this.importName = filedata.name
  }

  importBackup() {
    if (!this.importData) return
    this.$characterStore.replaceData(this.importData, true)
    this.importData = null
    this.importKey++
    // TODO: Decide if forcing a window reload is ok or not upon importing
    window.location.reload()
  }
}
</script>

<template>
  <div class="import-export text-left">
    <h3>Export</h3>
    <button
      v-if="!exportBlob"
      class="button"
      @click="generateBlob"
      :disabled="!!exportBlob"
    >
      <!-- TODO: Translate -->
      Generate backup
    </button>
    <div class="" v-if="exportBlob">
      <a
        class="download-link"
        :href="exportBlob"
        :download="exportFilename"
        @click="downloadClicked"
      >
        <!-- TODO: Translate -->
        Download data
      </a>
      <div>
        <!-- TODO: Translate -->
        (to choose destination folder, right click/long press and select "Save
        link as...")
      </div>
    </div>
    <h3>Import</h3>
    <FileReader
      label="Select file"
      @load="importDataLoaded"
      accept=".charlist.flcdata"
      :key="importKey"
    >
      <div v-if="importData">
        <button class="button button-red" @click="importBackup">
          <!-- TODO: Translate -->
          Import backup
        </button>
        <p>
          <!-- TODO: Translate -->
          N.B: Importing character list data will overwrite all your current
          characters!
        </p>
      </div>
    </FileReader>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.import-export {
  padding: 0 0.5rem;
  font-size: 1rem;
}

.download-link {
  font-size: 1rem;
  text-decoration-line: underline;
  width: 100%;
  text-align: center;
}
</style>
