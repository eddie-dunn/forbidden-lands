<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { MP_SAVE_CHAR } from "@/store/store-types"
import {
  CharData,
  calcCharacterXP,
  CharacterMetaDataStatus,
} from "@/characterData"

import FLButton from "@/components/base/FLButton.vue"
import BaseCard from "@/components/characterEditor/BaseCard.vue"
import SessionCard from "@/components/characterEditor/SessionCard.vue"
import TalentCard from "@/components/characterEditor/TalentCard.vue"
import PortraitCard from "@/components/characterEditor/PortraitCard.vue"
import FlavorCard from "@/components/characterEditor/FlavorCard.vue"
import SkillCard from "@/components/characterEditor/SkillCard.vue"
import GearCard from "@/components/characterEditor/GearCard.vue"
import MountCard from "@/components/characterEditor/MountCard.vue"
import NoteCard from "@/components/characterEditor/NoteCard.vue"

function stringChar(characterData: CharData) {
  return JSON.stringify(characterData)
}

@Component({
  components: {
    FLButton,
    BaseCard,
    FlavorCard,
    GearCard,
    MountCard,
    NoteCard,
    PortraitCard,
    SessionCard,
    SkillCard,
    TalentCard,
  },
})
export default class CharacterEditor extends Vue {
  @Prop({ required: true }) charData!: CharData
  @Prop({ default: false }) viewOnly!: boolean
  @Prop({ default: false }) isTemplateData!: boolean

  charDataCopyStr: string = stringChar(this.initialData)

  get initialData(): CharData {
    return (
      this.$characterStore.storedCharacter(this.charData.metadata.id) ||
      this.charData
    )
  }

  get status() {
    return this.charData.metadata.status
  }
  get totalXp(): number {
    return (
      calcCharacterXP(this.charData) -
      (this.charData.metadata.xpAtCreation || 0)
    )
  }
  get charDataUpdated(): boolean {
    if (this.viewOnly) return false
    return stringChar(this.charData) !== this.charDataCopyStr
  }

  get closeText(): any {
    if (this.isTemplateData) return this.$t("Back")
    return this.$t("Close")
  }

  closeClicked() {
    if (
      this.charDataUpdated &&
      this.$characterStore.characterById(this.charData.metadata.id)
    ) {
      this.$characterStore.addCharacter(this.initialData) // reset data
    }
    this.$router.back()
  }

  saveClicked(event: any) {
    if (!event || !this.charData.name) return
    if (this.status === "new") {
      // Save xp at creation, so that we later can calculate how many XP
      // points have been spent on leveling up character
      this.charData.metadata.xpAtCreation = this.totalXp
    }
    this.$store.commit(MP_SAVE_CHAR, this.charData)
    this.$characterStore.addCharacter(this.charData)
    this.charDataCopyStr = stringChar(this.charData)
  }

  setStatus(status: CharacterMetaDataStatus) {
    this.charData.metadata.status = status
  }

  handleCharDataUpdate(data: CharData) {
    this.$emit("chardata-updated", data)
  }
}
</script>

<template>
  <div class="character_creator">
    <div v-if="$debugMode" style="margin: 1rem">
      <FLButton @click="setStatus('active')">
        Set active
      </FLButton>
      <FLButton @click="setStatus('freeEdit')">
        Set inactive
      </FLButton>
    </div>
    <div class="detail-form">
      <BaseCard class="row-half" :charData="charData" :viewOnly="viewOnly" />
      <PortraitCard
        class="row-half"
        :charData="charData"
        :viewOnly="viewOnly"
      />
      <FlavorCard class="row-full" :charData="charData" :viewOnly="viewOnly" />
      <SkillCard class="row-half" :charData="charData" :viewOnly="viewOnly" />
      <TalentCard class="row-half" :charData="charData" :viewOnly="viewOnly" />
      <GearCard class="row-full" :charData="charData" :viewOnly="viewOnly" />
      <MountCard class="row-half" :charData="charData" :viewOnly="viewOnly" />
      <SessionCard
        v-if="status === 'active' && !viewOnly"
        class="row-half"
        :charData="charData"
        v-on:updated-chardata="handleCharDataUpdate"
      />
      <NoteCard v-if="!viewOnly" class="row-full" :charData="charData" />
    </div>

    <div class="action-bar-wrapper">
      <div class="action-bar-left">
        <FLButton
          :type="!charDataUpdated ? 'cancel' : 'danger'"
          @click="closeClicked"
        >
          {{ closeText }}
        </FLButton>
      </div>
      <div class="action-bar-middle"></div>

      <div class="action-bar-right">
        <FLButton
          v-if="!viewOnly"
          :type="!charDataUpdated ? 'cancel' : ''"
          @click="saveClicked"
        >
          {{ $t("Save") }}
        </FLButton>
      </div>
    </div>

    <!-- end -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.action-bar-wrapper {
  display: flex;
  overflow: auto;
  position: sticky;
  bottom: 0;
  overflow: hidden;
  margin: 0 0.25rem;
  background: #fffe;
  border: solid ~"@{pastel-green}99" 2px;
  padding: 0.5rem;
  justify-content: space-around;
}

.action-bar {
  &-right {
    justify-self: flex-end;
    display: flex;
    flex: 1 1 33%;
    justify-content: flex-end;
  }
  &-left {
    justify-self: flex-start;
  }
  align-items: center;
}

.character_creator {
  margin-bottom: 20vh;
}

.detail-form {
  width: 100%;
  margin: auto;
  margin-top: 1rem;

  row-gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 40%;
  justify-content: space-evenly;
  align-content: stretch;
}

.row-full {
  flex-basis: 100%;
  flex-grow: 2;
}

.row-half {
  flex-basis: 40%;
  flex-grow: 1;
}
</style>
