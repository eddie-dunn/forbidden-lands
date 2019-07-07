<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { TranslateResult } from "vue-i18n"
import SvgIcon from "@/components/SvgIcon.vue"

import {
  CharacterData,
  CharacterTalent,
  CharacterMetaDataStatus,
} from "@/characterData"

interface TranslatedTalent {
  translation: string
  id: string
  rank: number | null | undefined
}

function talentsSortedByTranslation(
  vm: any, // Vue instance with $t function
  talents: CharacterTalent[]
): TranslatedTalent[] {
  const translationList = talents.map((talent) => {
    const translation: TranslateResult = String(vm.$t(talent.id))
    return { translation, id: talent.id, rank: talent.rank }
  })

  const sortedTalents = translationList.sort((item1, item2) => {
    return item1.translation < item2.translation ? -1 : 1
  })
  return sortedTalents
}

@Component({
  components: {
    SvgIcon,
  },
})
export default class Talentelect extends Vue {
  @Prop() label!: string
  @Prop({ required: true }) talentOptions!: CharacterTalent[]
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

  get translatedTalents() {
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
  <div v-if="true" class="talent-row">
    <label for="talent">{{ label }}</label>
    <select
      id="talent"
      v-bind:value="value"
      v-on:input="talentChanged"
      :disabled="disabled || !editable || !canChangeTalent"
    >
      <option key="select" :disabled="true" :value="null">
        {{ $t("Select talent") }}
      </option>
      <optgroup :label="$t('General talents')">
        <option
          v-for="talent in translatedTalents"
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
      <button class="button" :disabled="!canDecreaseTalent" @click="decTalent">
        <SvgIcon name="remove" title="decrement" class="talent-icon" />
      </button>
      <button
        class="button"
        @click="incTalent"
        :disabled="
          disabled || !canIncreaseTalent || talentRank >= this.maxTalentRank
        "
      >
        <SvgIcon name="add" title="increment" class="talent-icon" />
      </button>
      <button
        :disabled="disabled || !editable || !canRemoveTalent"
        class="button button-red"
        @click="$emit('remove')"
      >
        <SvgIcon name="close" title="remove" class="talent-icon" />
      </button>
    </span>
  </div>
  <div v-else>
    <span>{{ $t(value) }}</span>
    <span>{{ !!talentRank ? " " + talentRank : "" }}</span>
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

button {
  margin: 0 0.25rem;
  padding: 0 0.2rem;
  font-size: 2rem;
  font-family: monospace;
  // height: 2rem;
}

.talent-icon {
  vertical-align: middle;
}
</style>
