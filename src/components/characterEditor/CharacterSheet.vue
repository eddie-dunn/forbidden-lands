<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { MP_SAVE_CHAR, SET_PAGE_SUBTITLE } from "@/store/store-types"
import { CharData, CharacterMetaDataStatus } from "@/characterData"
import SvgIcon from "@/components/SvgIcon.vue"
import DiceModal from "@/components/dice/DiceModal.vue"

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
import IconButton from "@/components/base/IconButton.vue"

function stringChar(characterData: CharData) {
  return JSON.stringify(characterData)
}

@Component({
  components: {
    BaseCard,
    DiceModal,
    FLButton,
    FlavorCard,
    GearCard,
    IconButton,
    MountCard,
    NoteCard,
    PortraitCard,
    SessionCard,
    SkillCard,
    SvgIcon,
    TalentCard,
  },
})
export default class CharacterEditor extends Vue {
  @Prop({ required: true }) charData!: CharData
  @Prop({ default: false }) viewOnly!: boolean
  @Prop({ default: false }) isTemplateData!: boolean

  charDataCopyStr: string = stringChar(this.initialData)
  showDiceModal = false

  mounted() {
    this.setPageSubtitle()
  }
  destroyed() {
    this.$store.commit(SET_PAGE_SUBTITLE, "")
  }

  @Watch("charData.name")
  setPageSubtitle() {
    this.$store.commit(SET_PAGE_SUBTITLE, this.charData.name)
  }

  get initialData(): CharData {
    return (
      this.$characterStore.storedCharacter(this.charData.metadata.id) ||
      this.charData
    )
  }

  get status() {
    return this.charData.metadata.status
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
      <BaseCard class="row half" :charData="charData" :viewOnly="viewOnly" />
      <PortraitCard
        class="row half"
        :charData="charData"
        :viewOnly="viewOnly"
      />
      <FlavorCard class="row full" :charData="charData" :viewOnly="viewOnly" />
      <SkillCard
        class="row half skill"
        :charData="charData"
        :viewOnly="viewOnly"
      />
      <TalentCard
        class="row half talent"
        :charData="charData"
        :viewOnly="viewOnly"
      />
      <GearCard class="row full" :charData="charData" :viewOnly="viewOnly" />
      <MountCard class="row half" :charData="charData" :viewOnly="viewOnly" />
      <SessionCard
        v-if="status === 'active' && !viewOnly"
        class="row full print-hide"
        :charData="charData"
        v-on:updated-chardata="handleCharDataUpdate"
      />
      <NoteCard
        v-if="!viewOnly"
        class="row full break-before break-avoid"
        :charData="charData"
      />
    </div>

    <div class="action-bar-wrapper">
      <div class="action-bar action-bar-left">
        <FLButton
          :type="!charDataUpdated ? 'cancel' : 'danger'"
          @click="closeClicked"
        >
          {{ closeText }}
        </FLButton>
      </div>
      <div class="action-bar action-bar-center">
        <!-- <div class="dice-icon" @click="showDiceModal = !showDiceModal">
          <SvgIcon name="rolling-dices" title="Roll dice" />
          <SvgIcon name="perspective-dice-six-faces-six" title="Roll dice" />
        </div> -->
        <IconButton
          class="dice-icon"
          height="32px"
          width="32px"
          icon="rolling-dices"
          @click="showDiceModal = !showDiceModal"
        ></IconButton>
      </div>

      <div class="action-bar action-bar-right">
        <FLButton
          v-if="!viewOnly"
          :type="!charDataUpdated ? 'cancel' : ''"
          @click="saveClicked"
        >
          {{ $t("Save") }}
        </FLButton>
      </div>
    </div>

    <DiceModal v-if="showDiceModal" @close="showDiceModal = false" />
    <!-- end -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.action-bar-wrapper {
  @media print {
    display: none;
  }
  display: flex;
  overflow: auto;
  position: sticky;
  bottom: 0;
  margin: 0 0.25rem;
  background: #fffc;
  box-shadow: @box-shadow-normal;
  padding: 0.4rem;
  justify-content: space-between;
}

.action-bar {
  flex: 1 1 auto;
  &-left {
    text-align: left;
  }
  // &-center {
  // }
  &-right {
    text-align: right;
  }
  // align-items: center;
}

.character_creator {
  margin-bottom: 20vh;
}

.detail-form {
  margin-top: 1rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: stretch;
}

.break-avoid {
  break-inside: avoid;
}

.print-hide.print-hide {
  @media print {
    display: none;
  }
}

.row {
  @media print {
    break-inside: avoid;
    margin: 0 0;
    &.talent,
    &.skill {
      flex-basis: 100%;
    }
  }
}

.full {
  flex-basis: 100%;
}

.half {
  flex-grow: 1;
  flex-basis: 49%;
}

.dice-icon {
  height: 100%;
}
</style>
