<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { SaveData } from "@/localstorage/characterStorage"
import FileReader from "@/components/FileReader.vue"
import { setTimeout } from "timers"

function generateDateString(): string {
  return "backup-" + new Date().toISOString() + ".flcdata"
}

@Component({
  components: {
    FileReader,
  },
})
export default class Backup extends Vue {
  importKey = 1

  importData: any = null

  exportBlob: string = ""
  exportFilename: string = ""

  generateBlob() {
    const exportString = JSON.stringify({ ...localStorage })
    const blob = new Blob([exportString])
    const blobUrl = window.URL.createObjectURL(blob)
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl)
      this.exportFilename = ""
      this.exportBlob = ""
    }, 24000)
    this.exportBlob = blobUrl
    this.exportFilename = generateDateString()
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
  }

  importBackup() {
    if (!this.importData) return
    if (this.importData.savedCharacters) {
      // new import
      Object.entries(this.importData).map(([key, val]) => {
        localStorage.setItem(key, String(val))
      })
    } else {
      // old import
      this.$characterStore.replaceData(this.importData, true)
    }

    this.importData = null
    this.importKey++
    this.$router.push("/")
    // Importing and overwriting all stored data is a fairly destructive action,
    // so forcing a reload is the safest alternative:
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
      {{ $t("GENERATE_DOWNLOAD_LINK") }}
    </button>
    <div class="" v-if="exportBlob">
      <a
        class="download-link button wide"
        :href="exportBlob"
        :download="exportFilename"
        @click="downloadClicked"
      >
        {{ $t("Download data") }}
      </a>
    </div>
    <h3>Import</h3>
    <FileReader
      :label="$t('Select import file')"
      @load="importDataLoaded"
      accept=".flcdata"
      :key="importKey"
    >
      <div v-if="importData">
        <button class="button button-red" @click="importBackup">
          {{ $t("Import backup") }}
        </button>
        <p>
          {{ $t("IMPORT_WARNING") }}
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
