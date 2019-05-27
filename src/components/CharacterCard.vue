<script lang="ts">
import Vue from "vue"
import { CharacterData } from "@/characterData"
import Modal from "@/components/Modal.vue"

export default Vue.extend({
  name: "CharacterCreatorCard",
  components: {
    Modal,
  },
  props: {
    charData: Object as () => CharacterData | null,
  },
  data() {
    return {
      modalActive: false,
      actionsActive: false,
    }
  },
  computed: {
    characterId(): string {
      if (!this.charData) return ""
      return this.charData.metadata.id
    },
    empty(): boolean {
      return !this.charData
    },
    cardLink(): string {
      if (this.empty) return `new`
      else if (this.charData) {
        // check if new
        return `new/edit/${this.characterId}`
      }
      return "#"
    },
  },
  methods: {
    edit() {
      this.$router.push(this.cardLink)
      window.scrollTo(0, 0)
    },
    cardClicked() {
      this.actionsActive = !this.actionsActive
    },
    remove() {
      if (this.charData) {
        this.$emit("remove-card", this.charData.metadata.id)
      }
    },
    confirmRemove() {
      this.modalActive = true
    },
    closeModal() {
      this.modalActive = false
    },
  },
})
</script>

<template>
  <div class="character-card">
    <Modal v-if="modalActive" @close="closeModal()" :maximized="false">
      <div slot="header">Confirm delete</div>
      <div slot="body"></div>
      <div class="modal-button-row" slot="footer">
        <button @click="closeModal()" class="button">Cancel</button>
        <button @click="remove()" class="button button-red">OK</button>
      </div>
    </Modal>
    <div v-if="!this.charData" class="stat-card row-full">
      <div class="placeholder" @click="edit()">
        <h3>Create new character</h3>
      </div>
    </div>
    <div v-else class="stat-card row-full">
      <div class="img-section">
        <div
          :class="['card-buttons', actionsActive ? '' : 'hidden']"
          @click="cardClicked"
        >
          <button class="button button-red" @click="confirmRemove">
            {{ $t("Remove") }}
          </button>
          <button class="button" @click="edit">
            {{ $t("Edit") }}
          </button>
        </div>
        <img
          class="top-image"
          :src="charData.portrait"
          @click.self="cardClicked()"
        />
        <div class="img-header">
          <h3>
            <a class="undecorated-link" :href="cardLink">{{ charData.name }}</a>
          </h3>
          <div class="img-header-subtitle capitalize">
            <span>{{ $t(this.charData.ageType) }}</span>
            <span>{{ $t(charData.kin) }}</span>
            <span>{{ $t(charData.profession) }}</span>
          </div>
        </div>
      </div>
      <div class="header"></div>
      <div class="card-footer"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "~Style/colors.less";

h1,
h2,
h3 {
  // margin: 40px 0 0;
  width: 100%;
  text-align: center;
  &::first-letter {
    text-transform: uppercase;
  }
  // margin-bottom: 0.1rem;
  margin: 0;
}

.undecorated-link {
  text-decoration: none;
  // color: #2c3e50;
  color: white;
}

.placeholder {
  cursor: pointer;
  color: @pastel-green;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 400px;
  height: 3rem;
  transition: 0.2s ease;
  &:hover {
    background: ~"@{pastel-green}ee";
    color: white;
  }
}

.modal-button-row {
  margin-top: 1rem;
}

.top-image {
  object-fit: cover;
  object-position: top;
  // height: 400px;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    opacity: 0.3;
  }
}

.img-section {
  position: relative;
  height: 100%;
}

.img-header {
  // flex-grow: 0;
  // display: flex;
  // align-items: center;
  // margin-bottom: 0.5rem;
  // margin-top: 0.5rem;
  padding: 0.4rem 0;
  // background: #66666699;
  background: rgba(0, 0, 0, 0.64);
  position: absolute;
  bottom: 0;
  width: 100%;
  color: white;
  color: hsla(0, 0%, 100%, 0.87);
}

.img-header-subtitle {
  margin: 0.2rem auto;
  display: flex;
  justify-content: space-around;
  color: hsla(0, 0%, 100%, 0.84);
}

.card-contents {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
}

.stat-card {
  &:active {
    transform: translateY(2px);
  }
  // cursor: pointer;
  // width: 50vw;
  // background: #fafafa;
  // margin: 0.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 40%;
  // min-width: 18rem;
  justify-content: space-around;
  align-content: space-between;

  // border: solid gray 2px;
  // border: solid rgba(66, 185, 131, 0.3) 2px;
  // border: solid #42b98344 3px;
  // border-radius: 1rem;
  // border-radius: 0 0 1rem 1rem;
  // padding: 1rem;
  // align-content: center;
  // justify-items: baseline;
  // align-items: baseline;
  // box-shadow: 3px 3px 5px 6px #cccccc80;
  height: 100%;
  height: 400px;
  box-shadow: 0px 1px 5px #555;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.card-buttons {
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background: hsla(0, 0%, 100%, 0.27);
  &:hover {
    opacity: 1;
  }
}

.hidden {
  // display: none;
  opacity: 0;
}
</style>
