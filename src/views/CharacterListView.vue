<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import Card from "@/components/Card.vue"
import CharacterCard from "@/components/CharacterCard.vue"
import Expander from "@/components/ExpandableSection.vue"
import {
  loadAllCharactersFromLocalStorage,
  Store,
  SaveData,
} from "@/characterStorage"
import FileReader from "@/components/FileReader.vue"
import { setTimeout } from "timers"

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
  importKey = 1

  importData: SaveData | null = null
  importName = ""

  exportBlob: string = ""
  exportFilename: string = ""

  newCharacters = this.$characterStore.charactersByStatus(["new", undefined])
  activeCharacters = this.$characterStore.activeCharacters

  updateCharacters() {
    // There is probably be a better way to handle this, but it will do for now
    this.newCharacters = this.$characterStore.charactersByStatus([
      "new",
      undefined,
    ])
    this.activeCharacters = this.$characterStore.activeCharacters
  }

  removeCard(characterId: any) {
    this.$characterStore.removeCharacter(characterId, true)
    this.updateCharacters()
  }

  activate(characterId: string) {
    this.$characterStore.activate(characterId, true)
    this.updateCharacters()
  }

  generateBlob() {
    this.exportBlob = this.$characterStore.getStorageDataBlob()
    this.exportFilename = generateDateString()
    // Release blob and reset backup data if backup has not been downloaded
    // within time limit:
    setTimeout(() => {
      window.URL.revokeObjectURL(this.exportBlob)
      // this.exportData = { blob: "", filename: "" }
      this.exportBlob = ""
      this.exportFilename = ""
    }, 2500)
    return this.exportBlob
  }

  releaseBlob() {
    // Need small timeout to be able to download before releasing blob object:
    setTimeout(() => window.URL.revokeObjectURL(this.exportBlob), 1500)
    this.exportFilename = ""
    this.exportBlob = ""
  }

  importDataLoaded(filedata: any) {
    this.importData = JSON.parse(filedata.data)
    this.importName = filedata.name
  }

  importBackup() {
    if (!this.importData) return
    this.$characterStore.replaceData(this.importData, true)
    this.updateCharacters()
    this.importData = null
    this.importKey++
  }
}
</script>

<template>
  <div class="character-list-container">
    <h1>{{ $t("Characters") }}</h1>
    <Expander
      :label="$t('New')"
      :expanded="true"
      class="character-list-expander"
    >
      <div class="character-list">
        <div
          v-for="character in newCharacters"
          v-bind:key="'key_' + character.metadata.id"
          class="character-card-container"
        >
          <CharacterCard
            :charData="character"
            @remove-card="removeCard"
            @activate="activate"
          />
        </div>
        <div>
          <CharacterCard />
        </div>
      </div>
    </Expander>
    <Expander
      class="character-list-expander"
      :label="$t('Active')"
      :expanded="true"
      v-if="$characterStore.activeCharacters.length > 0"
    >
      <div class="character-list">
        <div
          v-for="(character, index) in activeCharacters"
          :key="'active' + index"
          class="character-card-container"
        >
          <CharacterCard
            :charData="character"
            @remove-card="removeCard"
            @activate="activate"
          />
        </div>
      </div>
    </Expander>
    <Expander label="Import/Export">
      <div class="import-export">
        <h3>Export</h3>
        <button
          v-if="!exportBlob"
          class="button"
          @click="generateBlob"
          :disabled="!!exportBlob"
        >
          Generate backup
        </button>
        <a
          v-else
          class="button"
          :href="exportBlob"
          :download="exportFilename"
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

.import-export {
  padding: 0 1rem;
}
</style>
