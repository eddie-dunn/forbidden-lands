<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import Card from "@/components/Card.vue"
import CharacterCard from "@/components/CharacterCard.vue"
import Expander from "@/components/ExpandableSection.vue"
import {
  removeCharacter,
  loadAllCharactersFromLocalStorage,
  Store,
} from "@/characterStorage"

@Component({
  components: {
    Card,
    CharacterCard,
    Expander,
  },
})
export default class CharacterListView extends Vue {
  idKey = 1
  store: Store = new Store()

  removeCard(characterId: any) {
    this.store.removeCharacter(characterId, true)
    this.idKey = this.store.length
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

// .character-list-expander {
//   font-size: 3rem;

// }
</style>
