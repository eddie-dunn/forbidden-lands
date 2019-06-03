<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import Card from "@/components/Card.vue"
import CharacterCard from "@/components/CharacterCard.vue"
import Expander from "@/components/ExpandableSection.vue"
import {
  removeCharacter,
  loadAllCharactersFromLocalStorage,
  Store,
  SaveData,
} from "@/characterStorage"
import FileReader from "@/components/FileReader.vue"
import { setTimeout } from "timers"

// function getStorageDataBlob() {
//   const tmpStore = JSON.stringify(window.localStorage)
//   const blob = new Blob([tmpStore])
//   return window.URL.createObjectURL(blob)
// }

function generateDateString(): string {
  return "backup-" + new Date().toISOString() + ".charlist.flcdata"
}

@Component({
  components: {
    Card,
    CharacterCard,
    Expander,
    FileReader,
  },
})
export default class CharacterListView extends Vue {
  idKey = 1
  importKey = 1
  store: Store = new Store()
  importData: SaveData | null = null
  importName = ""

  exportData = {
    blob: "",
    filename: "",
  }

  removeCard(characterId: any) {
    this.store.removeCharacter(characterId, true)
    this.idKey = this.store.length
  }

  generateBlob() {
    this.exportData.blob = this.store.getStorageDataBlob()
    this.exportData.filename = generateDateString()
    // Release blob and reset backup data if backup has not been downloaded
    // within time limit:
    setTimeout(() => {
      window.URL.revokeObjectURL(this.exportData.blob)
      this.exportData = { blob: "", filename: "" }
    }, 2500)
    return this.exportData.blob
  }

  releaseBlob() {
    // Need small timeout to be able to download before releasing blob object:
    setTimeout(() => window.URL.revokeObjectURL(this.exportData.blob), 1500)
    this.exportData = { blob: "", filename: "" }
  }

  importDataLoaded(filedata: any) {
    this.importData = JSON.parse(filedata.data)
    this.importName = filedata.name
  }

  importBackup() {
    if (!this.importData) return
    this.store.replaceData(this.importData, true)
    this.importData = null
    this.importKey++
  }
}
</script>

<template>
  <div class="character-list-container">
    <Expander
      v-if="true"
      :label="$t('New')"
      :expanded="true"
      class="character-list-expander"
    >
      <div :key="idKey" v-if="store.length > -1" class="character-list">
        <div
          v-for="character in store.storage"
          v-bind:key="'key_' + character.metadata.id"
          class="character-card-container"
        >
          <CharacterCard :charData="character" @remove-card="removeCard" />
        </div>
        <div>
          <CharacterCard :empty="true" />
        </div>
      </div>
    </Expander>
    <Expander
      class="character-list-expander"
      :label="$t('Active')"
      :expanded="true"
      v-if="false"
    >
    </Expander>
    <Expander label="Import/Export">
      <h1>{{ $t("Characters") }}</h1>
      <div>
        <h3>Export</h3>
        <button
          v-if="!exportData.blob"
          class="button"
          @click="generateBlob"
          :disabled="!!exportData.blob"
        >
          Generate backup
        </button>
        <a
          v-else
          class="button"
          :href="exportData.blob"
          :download="exportData.filename"
          @click="releaseBlob"
        >
          Export backup
        </a>
        <h3>Import</h3>
        <FileReader
          label="Select file"
          @load="importDataLoaded"
          accept=".charlist.flcdata"
          :key="importKey"
        >
          <button
            v-if="importData"
            class="button button-red"
            @click="importBackup"
          >
            Import backup
          </button>
          <p v-if="importData">
            N.B: Importing character list data will overwrite all your current
            characters!
          </p>
        </FileReader>
      </div>
    </Expander>
  </div>
</template>

<style lang="less" scoped>
@max-card-width: 300px;

.character-list {
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  margin: 0.8rem;
}

.character-list-container {
  margin-bottom: 20vh;
}
// .character-list-expander {
//   font-size: 3rem;

// }
</style>
