<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { TranslateResult } from "vue-i18n"
import FLButton from "@/components/base/FLButton.vue"
import SvgIcon from "@/components/SvgIcon.vue"

import {
  CharacterData,
  CharacterTalent,
  CharacterMetaDataStatus,
} from "@/data/character/characterData"

interface TranslatedTalent {
  translation: string
  id: string
  rank: number | null | undefined
}

function capitalizeFirst(s: string): string {
  return s[0].toUpperCase() + s.slice(1)
}

function talentsSortedByTranslation(
  vm: any, // Vue instance with $t function
  talents: CharacterTalent[]
): TranslatedTalent[] {
  const translationList = talents.map((talent) => {
    const translation: TranslateResult = String(vm.$t(talent.id))
    return {
      translation: capitalizeFirst(translation),
      id: talent.id,
      rank: talent.rank,
    }
  })

  const sortedTalents = translationList.sort((item1, item2) => {
    return item1.translation < item2.translation ? -1 : 1
  })
  return sortedTalents
}

@Component({
  components: {
    FLButton,
    SvgIcon,
  },
})
export default class Talentelect extends Vue {
  @Prop() label!: string
  @Prop({ default: () => [] }) talentOptions!: CharacterTalent[]
  @Prop({ required: true }) charStatus!: CharacterMetaDataStatus
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: 3 }) maxTalentRank!: number
  @Prop({ default: null }) value!: string
  @Prop({ default: null }) talentRank!: number
  @Prop({ default: false }) disabled!: number
  @Prop({ default: true }) removeOk!: boolean
  @Prop({ default: () => [] }) classTalentOptions!: CharacterTalent[]

  @Watch("charStatus")
  onStatusChanged(val: string, oldVal: string) {
    if (oldVal === "levelup" && val === "active") {
      this.copiedRank = this.talentRank
      this.copiedTalent = this.value
    }
  }

  copiedTalent = this.value
  copiedRank = this.talentRank

  get generalTalents() {
    return talentsSortedByTranslation(this, this.talentOptions)
  }

  get classTalents() {
    return talentsSortedByTranslation(this, this.classTalentOptions)
  }

  get editable() {
    return this.charStatus !== "active"
  }

  get canDecreaseTalent(): boolean {
    if (this.disabled || this.talentRank <= 1) return false
    const status = this.charStatus
    if (status === "freeEdit") return true
    if (status === "new") return true
    if (status === "levelup") {
      return this.talentRank > this.copiedRank
    }
    return false
  }

  get canIncreaseTalent(): boolean {
    const status = this.charStatus
    if (status === "freeEdit") return true
    if (status === "new") return true
    if (status === "active") return false
    if (status === "levelup") {
      const rankCost = ((this.talentRank || 1) + 1) * 3
      return this.charData.experience >= rankCost
    }
    return false
  }

  incTalent() {
    if (this.talentRank && this.talentRank < this.maxTalentRank) {
      this.$emit("rank-changed", this.talentRank + 1)
    }
  }

  decTalent() {
    if (this.talentRank > 1) {
      this.$emit("rank-changed", this.talentRank - 1)
    }
  }

  talentChanged(ev: any) {
    this.$emit("input", ev.target.value)
  }

  get canRemoveTalent(): boolean {
    if (!this.removeOk) return false
    if (this.charStatus === "freeEdit") return true
    if (this.charStatus === "new") return true
    if (this.charStatus === "levelup") {
      return this.copiedTalent !== this.value || !this.copiedTalent
    }
    return false
  }

  get canChangeTalent(): boolean {
    if (this.charStatus === "freeEdit") return true
    if (this.charStatus === "new") return true
    if (this.charStatus === "levelup") {
      return this.copiedTalent !== this.value || !this.copiedTalent
    }
    return false
  }
}
</script>

<template>
  <div class="talent-row">
    <label v-if="label" for="talent">{{ label }}</label>
    <select
      id="talent"
      v-bind:value="value"
      v-on:input="talentChanged"
      :disabled="disabled || !editable || !canChangeTalent"
    >
      <option key="select" :disabled="true" :value="null">
        {{ $t("Select talent") }}
      </option>
      <optgroup v-if="generalTalents.length > 0" :label="$t('General talents')">
        <option
          v-for="talent in generalTalents"
          :key="talent.id"
          v-bind:value="talent.id"
        >
          {{ talent.translation }} {{ talentRank }}
        </option>
      </optgroup>
      <optgroup
        v-if="classTalentOptions.length > 0"
        :label="$t('Class talents')"
      >
        <option
          v-for="talent in classTalents"
          :key="talent.id"
          v-bind:value="talent.id"
        >
          {{ talent.translation }} {{ talentRank }}
        </option>
      </optgroup>
    </select>
    <span v-if="charStatus !== 'active'" class="toggle">
      <FLButton
        class="button"
        :disabled="!canDecreaseTalent"
        @click="decTalent"
      >
        <SvgIcon name="remove" title="decrement" class="talent-icon" />
      </FLButton>
      <FLButton
        class="button"
        @click="incTalent"
        :disabled="
          disabled || !canIncreaseTalent || talentRank >= this.maxTalentRank
        "
      >
        <SvgIcon name="add" title="increment" class="talent-icon" />
      </FLButton>
      <FLButton
        class="button"
        type="danger"
        :disabled="disabled || !editable || !canRemoveTalent"
        @click="$emit('remove')"
      >
        <SvgIcon name="close" title="remove" class="talent-icon" />
      </FLButton>
    </span>
    <div v-if="false">
      <span>{{ $t(value) }}</span>
      <span>{{ !!talentRank ? " " + talentRank : "" }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.talent-row {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
}

select {
  flex-grow: 1;
  flex-basis: 30%;
}

.toggle {
  margin: 0 0.25rem;
  display: flex;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.25rem;
  padding: 0 0.2rem;
  font-size: 2rem;
  font-family: monospace;
}

.talent-icon {
  vertical-align: middle;
}
</style>
