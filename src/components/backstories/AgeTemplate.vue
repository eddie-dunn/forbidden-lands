<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import TemplateSelect from "@/components/backstories/TemplateSelect.vue"
import {
  KIN_66,
  TemplateItem,
} from "@/data/character_template/character_template"

import { rollKin } from "@/components/backstories/characterTemplate.ts"
import { getAgeType, getAgeRangeArray, getAgeRange } from "@/age.ts"
import { kinTransform } from "@/util/characterUtil.ts"
import { Age, ExtendedKinName } from "@/types.ts"
import { getRandomIntInclusive } from "@/dice.ts"
import { rollAge } from "@/components/backstories/characterTemplate.ts"

@Component({
  components: {
    TemplateSelect,
  },
})
export default class CharacterTemplateChildhood extends Vue {
  @Prop({ required: true }) value!: number
  @Prop({ required: true }) kin!: ExtendedKinName

  setAgeWithValue(value: any) {
    this.$emit("input", value)
  }

  randomClicked() {
    const age = rollAge(kinTransform(this.kin))
    this.setAgeWithValue(age)
  }

  get ageType() {
    return getAgeType(this.value, kinTransform(this.kin))
  }

  get ageRanges() {
    return getAgeRangeArray(kinTransform(this.kin))
  }

  get ageRange() {
    return getAgeRange(kinTransform(this.kin))
  }

  get title() {
    return `${this.$t(this.ageType)}`
  }

  getRange(ageType: Age): string {
    if (ageType === "young") {
      return `${this.ageRanges[0]}-${this.ageRanges[1] - 1}`
    } else if (ageType === "adult") {
      return `${this.ageRanges[1]}-${this.ageRanges[2] - 1}`
    } else if (ageType === "old") {
      return `${this.ageRanges[2]}+`
    }
    return "?-?"
  }
}
</script>

<template>
  <TemplateSelect
    :title="title || '?'"
    :numeralValue="value || 0"
    @randomClicked="randomClicked"
  >
    <!-- Age  -->
    <div class="template-age">
      <div class="input-layout">
        <label for="age" class="base-label capitalize-first">
          {{ $t("age") }}
        </label>
        <input
          id="age"
          type="number"
          v-on:input="setAgeWithValue($event.target.value)"
          v-bind:value="value"
          :placeholder="ageRange"
          :min="ageRanges[0]"
          max="999"
        />
      </div>
      <div class="agetypes" v-if="kin !== 'elf'">
        <!-- TODO: Bold selected age -->
        <div class="capitalize-first">
          {{ $t("young") }}: {{ getRange("young") }}
        </div>
        <div class="capitalize-first">
          {{ $t("adult") }}: {{ getRange("adult") }}
        </div>
        <div class="capitalize-first">
          {{ $t("old") }}: {{ getRange("old") }}
        </div>
      </div>
    </div>
  </TemplateSelect>
</template>

<style scoped lang="less">
.agetypes {
  display: flex;
  margin-top: 1rem;
  & > div {
    flex: 1 1 auto;
  }
}

.input-layout {
  display: flex;
  flex-direction: column;
}

.template-age {
  max-width: 50ch;
}
</style>
