<script lang="ts">
import Vue from "vue"
import {
  CharacterData,
  validateNewCharacter,
} from "@/data/character/characterData"
import FLButton from "@/components/base/FLButton.vue"
import ModalConfirm from "@/components/ModalConfirm.vue"

const VALID = "✓"
const INVALID = "✖"

export default Vue.extend({
  name: "CharacterCreatorCard",
  components: {
    FLButton,
    ModalConfirm,
  },
  props: {
    charData: Object as () => CharacterData | null,
    titleOverride: String,
    linkOverride: String,
    clickDisabled: Boolean,
  },
  data() {
    return {
      modalActive: false,
      actionsActive: false,
      modalConfirmActivate: false,
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
      if (this.linkOverride) return this.linkOverride
      if (this.empty) return `new`
      if (this.newChar) return `new/edit/${this.characterId}`
      return `active/edit/${this.characterId}`
    },
    newCharValid(): boolean {
      return !!this.charData && validateNewCharacter(this.charData)
    },
    newChar(): boolean {
      return (
        !!this.charData &&
        ["new", undefined].includes(this.charData.metadata.status)
      )
    },
  },
  methods: {
    edit(ev: Event) {
      if (ev) {
        ev.preventDefault()
      }
      this.$router.push(this.cardLink)
    },
    cardClicked() {
      this.actionsActive = !this.actionsActive
    },
    remove() {
      if (this.charData) {
        this.$emit("remove-card", this.charData.metadata.id)
      }
      this.closeModal()
    },
    confirmRemove() {
      this.modalActive = true
    },
    closeModal() {
      this.modalActive = false
    },
    activateClicked() {
      if (this.newChar && !this.newCharValid) {
        this.modalConfirmActivate = true
      } else {
        this.activate()
      }
    },
    activate() {
      this.charData && this.$emit("activate", this.charData.metadata.id)
      this.actionsActive = false
    },
    deactivate() {
      this.charData && this.$emit("free-edit", this.charData.metadata.id)
      this.actionsActive = false
    },
  },
})
</script>

<template>
  <div class="character-card">
    <ModalConfirm
      v-if="modalActive"
      :confirmAction="() => remove()"
      @close="() => closeModal()"
      :title="$t('Remove')"
      :body="$t('CONFIRM_DELETE_CHAR')"
      :danger="true"
    ></ModalConfirm>

    <ModalConfirm
      v-if="modalConfirmActivate"
      :confirmAction="() => activate()"
      @close="modalConfirmActivate = false"
      :body="$t('CONFIRM_ACTIVATE_INVALID_CHAR')"
    ></ModalConfirm>

    <div v-if="!this.charData" class="stat-card row-full transform">
      <div class="placeholder" @click="edit()">
        <div class="capitalize-first">{{ titleOverride }}</div>
      </div>
    </div>

    <div
      v-else
      :class="['stat-card', 'row-full', !actionsActive ? 'transform' : '']"
    >
      <div class="img-section">
        <div
          :class="['card-buttons', actionsActive ? '' : 'hidden']"
          @click.self="cardClicked"
        >
          <FLButton type="danger" @click.self="confirmRemove">
            {{ $t("Remove") }}
          </FLButton>
          <FLButton @click="edit">
            {{
              charData.metadata.status === "active" ? $t("View") : $t("Edit")
            }}
          </FLButton>
          <FLButton
            v-if="charData.metadata.status !== 'active'"
            :type="newChar && !newCharValid ? 'danger' : 'main'"
            @click="activateClicked"
          >
            {{ $t("Activate") }}
          </FLButton>
          <FLButton
            v-if="charData.metadata.status === 'active'"
            @click="deactivate"
          >
            {{ $t("Deactivate") }}
          </FLButton>
        </div>
        <img
          class="top-image"
          :src="charData.portrait"
          @click.self="cardClicked()"
        />
        <div class="img-header">
          <h3>
            <a class="undecorated-link" :href="cardLink" @click="edit">{{
              charData.name
            }}</a>
            <div
              v-if="newChar"
              :class="[
                'indicator',
                'indicator-' + (newCharValid ? 'green' : 'red'),
              ]"
            >
              <!-- {{ newCharValid ? "VALID" : "INVALID" }} -->
            </div>
          </h3>
          <div class="img-header-subtitle capitalize">
            <!-- <span>{{ $t(this.charData.ageType) }}</span> -->
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

.indicator {
  font-size: 1.7rem;
  position: absolute;
  top: -2px;
  right: 5px;

  &-green {
    color: @pastel-green;
    &:before {
      content: "✓";
    }
  }

  &-red {
    color: @pastel-red;
    &:before {
      content: "✖";
    }
  }
}

.undecorated-link {
  text-decoration: none;
  // color: #2c3e50;
  color: white;
}

.placeholder {
  text-align: center;
  cursor: pointer;
  color: @pastel-green;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  height: 3rem;
  transition: 0.2s ease;
  &:hover {
    background: ~"@{pastel-green}ee";
    color: white;
  }
  font-weight: bold;
}

.modal-body {
  padding: 1rem;
}

.modal-button-row {
  margin: 3px;
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
}

.top-image {
  object-fit: cover;
  object-position: top;
  // height: 400px;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: 0.2s ease;
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
  flex-wrap: wrap;
  justify-content: space-around;
  color: hsla(0, 0%, 100%, 0.84);
  span > {
    margin: 0 0.3rem;
  }
}

.card-contents {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
}

.transform {
  &:active {
    transform: scale(0.99);
  }
}

.stat-card {
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 40%;
  justify-content: space-around;
  align-content: space-between;
  height: 100%;
  height: 400px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.7),
    0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 2px 1px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.card-buttons {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: hsla(0, 0%, 100%, 0.27);
  // display: none;
  // visibility: hidden;
  // z-index: -10;
  z-index: 10;

  // transition: 0.3s ease;
  // &:hover {
  //   visibility: visible;
  //   opacity: 1;
  // }
  button > {
    margin: 1rem;
    min-width: 75%;
  }
}

.hidden {
  // transition: 0.3s ease;
  // display: none;
  opacity: 0;
  z-index: -10;
  // visibility: hidden;
}
</style>
