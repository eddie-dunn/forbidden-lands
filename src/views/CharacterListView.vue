<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Card from "@/components/Card.vue"
import CharacterCard from "@/components/CharacterCard.vue"
import { loadCharacterListFromLocalStorage } from "@/characterData"

@Component({
  components: {
    Card,
    CharacterCard,
  },
  computed: {
    characterList() {
      const list = loadCharacterListFromLocalStorage()
      console.log("list", list)
      return list
    },
  },
})
export default class Home extends Vue {}
</script>

<template>
  <div class="character-list-container">
    <h1>Character List</h1>
    <div v-if="characterList.length >= 1" class="character-list">
      <div
        v-for="character in characterList"
        v-bind:key="'key_' + character.name"
        class="character-card-container"
      >
        <CharacterCard :charData="character" />
      </div>
    </div>
    <Card v-else>
      <p>This section will include a card view of all saved characters</p>
      <p>
        No characters found; why not
        <a href="/character-creator"> create a new one</a>?
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
