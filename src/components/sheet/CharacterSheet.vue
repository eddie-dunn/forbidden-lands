<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { MP_SAVE_CHAR, SET_PAGE_SUBTITLE } from "@/store/store-types"
import { CharData, CharacterMetaDataStatus } from "@/characterData"

import SvgIcon from "@/components/SvgIcon.vue"
import FLButton from "@/components/base/FLButton.vue"
import ActionBar from "@/components/base/ActionBar.vue"
import BaseCard from "@/components/sheet/cards/BaseCard.vue"
import SessionCard from "@/components/sheet/cards/SessionCard.vue"
import TalentCard from "@/components/sheet/cards/TalentCard.vue"
import PortraitCard from "@/components/sheet/cards/PortraitCard.vue"
import FlavorCard from "@/components/sheet/cards/FlavorCard.vue"
import SkillCard from "@/components/sheet/cards/SkillCard.vue"
import GearCard from "@/components/sheet/cards/GearCard.vue"
import MountCard from "@/components/sheet/cards/MountCard.vue"
import NoteCard from "@/components/sheet/cards/NoteCard.vue"

function stringChar(characterData: CharData) {
  return JSON.stringify(characterData)
}

@Component({
  components: {
    ActionBar,
    BaseCard,
    FLButton,
    FlavorCard,
    GearCard,
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

    <ActionBar>
      <template v-slot:left>
        <FLButton
          :type="!charDataUpdated ? 'cancel' : 'danger'"
          @click="closeClicked"
        >
          {{ closeText }}
        </FLButton>
      </template>
      <template v-slot:right>
        <FLButton
          v-if="!viewOnly"
          :type="!charDataUpdated ? 'cancel' : ''"
          @click="saveClicked"
        >
          {{ $t("Save") }}
        </FLButton>
      </template>
    </ActionBar>

    <!-- end -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

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
