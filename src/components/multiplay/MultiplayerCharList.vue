<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import {
  GET_MP_ACTIVE,
  GET_MP_PLAYERS,
  GET_MP_PLAYER_SELF,
  SET_MP_CHAR,
  MP_CHARS,
} from "@/store/store-types.ts"
import CharacterCard, {
  EV_CARD_CLICKED,
} from "@/components/base/CharacterCard.vue"
import { CharacterData } from "@/characterData.ts"
import { UserData } from "@/components/multiplay/protocol.ts"

export const EMIT_SELECTED_CHARS = "mpcharlist selected chars"

/** Display active characters if not online, otherwise list of connected players */
@Component({
  components: {
    CharacterCard,
  },
})
export default class MultiplayerCharList extends Vue {
  selectedChars: (CharacterData | null)[] = this.$store.state[MP_CHARS]

  portraitClicked(charData: CharacterData | null) {
    if (charData) {
      const alreadySelected = this.isSelected(charData)
      if (alreadySelected) {
        this.selectedChars = this.selectedChars.filter(
          (char) => char && char.metadata.id !== charData.metadata.id
        )
        // this.selectedChars = []
      } else {
        // this.selectedChars.push(charData) // for selecting multiple chars
        this.selectedChars = [charData]
      }
    } else {
      this.selectedChars = [null]
    }
    this.$emit(EMIT_SELECTED_CHARS, this.selectedChars)
    this.$store.commit(SET_MP_CHAR, this.selectedChars)
  }
  isSelected(charData: CharacterData | null): boolean {
    if (!charData) {
      return !!this.selectedChars.find((char) => char === null)
    }
    return !!this.selectedChars.find(
      (char) => !!char && char.metadata.id === charData.metadata.id
    )
  }
  linkOverride(charData: CharacterData): string {
    return ""
  }

  get mpActive(): boolean {
    return this.$store.getters[GET_MP_ACTIVE]
  }
  get userList() {
    return this.$store.getters[GET_MP_PLAYERS]
  }
  get activeCharacters() {
    return [null, ...this.$characterStore.activeCharacters]
  }
  get selfPlayer(): UserData | undefined {
    return this.$store.getters[GET_MP_PLAYER_SELF]
  }
  get id(): string {
    return this.$store.state.client.peerId
  }

  thisUserClass(user: UserData): string {
    return this.id === user.peerId ? "bold" : ""
  }
  viewCharLink(user: UserData, charData: CharacterData): string {
    if (user.peerId === this.id) {
      return `/active/view/${charData.metadata.id}`
    }
    return `/multiplayer/view/${user.peerId}/${charData.metadata.id}`
  }
  filtered(characters: CharacterData[]) {
    return characters.filter((char) => !!char)
  }
  mpCardClicked(cardLink: string) {
    this.$router.push(cardLink)
  }
}
</script>

<template>
  <div class="character-list" v-if="mpActive">
    <div
      v-for="(user, index) in userList"
      v-bind:key="index + user.peerId"
      class="character-group"
    >
      <div
        v-for="(char, index) in filtered(user.characters)"
        v-bind:key="index"
        class="card-wrapper"
      >
        <div :class="['center username', thisUserClass(user)]">
          <span class="username-span">{{ user.username }}</span>
        </div>
        <!-- TODO: Create mp-charcard component -->
        <CharacterCard
          :charData="char"
          :link="viewCharLink(user, char)"
          :clickDisabled="false"
          @char-card-clicked="mpCardClicked"
        />
      </div>
    </div>
  </div>
  <div v-else class="character-list">
    <div
      v-for="(charData, index) in activeCharacters"
      :key="'active' + index"
      :class="[
        'card-wrapper',
        isSelected(charData) ? 'selected' : 'invisiborder',
      ]"
      @click="() => portraitClicked(charData)"
    >
      <CharacterCard
        :titleOverride="!!charData ? '' : '_T No character'"
        :clickDisabled="true"
        :charData="charData"
        :linkOverride="linkOverride(charData)"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.character-list {
  display: flex;
  margin: 0.8rem;
  overflow-x: auto;
}

.character-group {
  display: flex;
}

.card-wrapper {
  padding: 5px;
  margin: 0 3px 10px 3px;
  width: 170px;
  flex: 0 0 auto;
}

.selected {
  border: 4px solid @pastel-green;
}
.invisiborder {
  border: 4px solid #0000;
}

.username {
  // height: calc(2rem + 5px);
  height: 2rem;
  display: flex;
  justify-content: center;
}
.username-span {
  align-self: flex-end;
}
</style>
