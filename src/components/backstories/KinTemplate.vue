<template>
  <!-- Kin  -->
  <TemplateSelect
    :title="$t('Kin')"
    :diceValue="selectedKin.diceRoll"
    @randomClicked="selectedKin = rollKin()"
  >
    <div
      v-for="(kin, index) in characterTemplate.KIN_66"
      @click="setKinWithValue(kin.d_min)"
    >
      <input
        :id="'template-' + kin.id"
        type="radio"
        :checked="kin.id === selectedKin.id"
        @change="setKinWithValue(kin.d_min)"
        :value="kin.id"
      />
      <span>
        {{ kin.d_min }}-{{ kin.d_max }}
        <label :for="'template-' + kin.id">{{ $t(kin.id) }}</label>
      </span>
    </div>
  </TemplateSelect>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import TemplateSelect from "@/components/backstories/TemplateSelect.vue"
import characterTemplate, {
  KIN_66,
  PROFESSION_66,
  TemplateItem,
} from "@/data/character_template/character_template"
import { rollDice } from "@/dice"

@Component({
  components: {
    TemplateSelect,
  },
})
export default class CharacterTemplateChildhood extends Vue {
  characterTemplate = characterTemplate

  @Prop({ required: true }) selectedKinId!: string
  @Prop({ required: true }) value!: number

  childhoodValue = this.value

  @Watch("value")
  onPropValueChanged() {
    this.childhoodValue = this.value
  }

  @Watch("childhoodValue")
  onChildhoodValueChanged() {
    this.$emit("input", this.childhoodValue)
  }
}
</script>

<style scoped lang="less">
.template-grid {
  display: grid;
  grid-template-columns: min-content 2fr 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem;
  &-title {
    grid-column-start: 2;
    grid-column-end: -1;
  }
}

.bold {
  font-weight: bold;
}

.template-childhood {
  text-align: left;
}
</style>
