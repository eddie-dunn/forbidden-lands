<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import Card from "@/components/Card.vue"
import CharacterCard from "@/components/CharacterCard.vue"
import Expander from "@/components/ExpandableSection.vue"
import { SaveData } from "@/localstorage/characterStorage"
import FileReader from "@/components/FileReader.vue"
import { setTimeout } from "timers"
import { SET_PAGE_TITLE } from "@/store/store-types"

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
  inactiveCharacters = this.$characterStore.charactersByStatus("freeEdit")

  mounted() {
    this.$store.commit(SET_PAGE_TITLE, "Characters")
  }

  updateCharacters() {
    // There is probably be a better way to handle this, but it will do for now
    this.newCharacters = this.$characterStore.charactersByStatus([
      "new",
      undefined,
    ])
    this.activeCharacters = this.$characterStore.activeCharacters
    this.inactiveCharacters = this.$characterStore.charactersByStatus(
      "freeEdit"
    )
  }

  removeCard(characterId: any) {
    this.$characterStore.removeCharacter(characterId, true)
    this.updateCharacters()
  }

  activate(characterId: string) {
    this.$characterStore.activate(characterId, true)
    this.updateCharacters()
  }

  deactivate(characterId: string) {
    this.$characterStore.deactivate(characterId, true)
    this.updateCharacters()
  }

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
    this.updateCharacters()
    this.importData = null
    this.importKey++
  }
}
</script>

<template>
  <div class="character-list-container">
    <Expander
      :label="$t('New')"
      :defaultOpen="true"
      saveStateId="new-characters"
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
          <CharacterCard :titleOverride="$t('Create new character')" />
        </div>
        <!-- TODO: Enable when fully working -->
        <CharacterCard
          :titleOverride="$t('create from template')"
          linkOverride="new/template"
        />
      </div>
    </Expander>

    <Expander
      class="character-list-expander"
      :label="$t('Inactive')"
      :defaultOpen="true"
      saveStateId="inactive-characters"
      v-if="inactiveCharacters.length > 0"
    >
      <div class="character-list">
        <div
          v-for="(character, index) in inactiveCharacters"
          :key="'inactive' + index"
          class="character-card-container"
        >
          <CharacterCard
            :charData="character"
            @activate="activate"
            @remove-card="removeCard"
          />
        </div>
      </div>
    </Expander>

    <Expander
      class="character-list-expander"
      :label="$t('Active')"
      :defaultOpen="true"
      saveStateId="active-characters"
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
            @free-edit="deactivate"
          />
        </div>
      </div>
    </Expander>

    <Expander :label="$t('Import/Export')">
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
        <div class="download-link" v-if="exportBlob">
          <a
            :href="exportBlob"
            :download="exportFilename"
            @click="downloadClicked"
          >
            <!-- TODO: Translate -->
            Download data
          </a>
          <span>
            <!-- TODO: Translate -->
            (to choose destination folder, right click/long press and select
            "Save link as...")
          </span>
        </div>
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
            <!-- TODO: Translate -->
            Import backup
          </button>
          <p v-if="importData">
            <!-- TODO: Translate -->
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
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  margin: 0.8rem;
}

.character-list-container {
  margin-bottom: 20vh;
}

.import-export {
  padding: 0 1rem;
}

.download-link {
  margin: 2rem;
}
</style>
