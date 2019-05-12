<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import Card from "@/components/Card.vue"
import CharacterCard from "@/components/CharacterCard.vue"
import {
  removeCharacter,
  loadAllCharactersFromLocalStorage,
  Store,
} from "@/characterStorage"

@Component({
  components: {
    Card,
    CharacterCard,
  },
})
export default class CharacterListView extends Vue {
  idKey = 1
  store: Store = new Store()

  removeCard(characterId: any) {
    this.store.removeCharacter(characterId, true)
    this.idKey = this.store.length()
  }
}
</script>

<template>
  <div class="character-list-container">
    <h1>Character List</h1>
    <div :key="idKey" v-if="true" class="character-list">
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
    <Card v-else>
      <p>This section will include a card view of all saved characters</p>
      <p>
        No characters found; why not
        <a href="/character-creator/new/"> create a new one</a>?
      </p>
    </Card>
  </div>
</template>

<style lang="less" scoped>
@max-card-width: 300px;

.character-list {
  // display: flex;
  // flex-wrap: wrap;
  // .character-card-container {
  //   // margin: 1rem;
  //   // width: 300px;
  //   margin: 0.5rem;
  // }

  display: grid;
  grid-gap: 1rem;

  // grid-auto-columns: minmax(200px, 1fr);
  // grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  // grid-auto-columns: max-content;
}
</style>
