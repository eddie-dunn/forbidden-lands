<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import {
  CharacterData,
  CharacterTalent,
  Conditions,
} from "@/data/character/characterData"

import FLNumberInput from "@/components/FLNumberInput.vue"

@Component({
  components: {},
})
export default class ConditionInput extends Vue {
  @Prop({ required: true }) conditions!: Conditions
  @Prop({ default: false }) viewOnly!: boolean

  conditionsCopy: Conditions = {
    cold: this.conditions.cold || false,
    starving: this.conditions.starving || false,
    dehydrated: this.conditions.dehydrated || false,
    tired: this.conditions.tired || false,
  }

  emit() {
    this.$emit("input", this.conditionsCopy)
  }
}
</script>

<template>
  <div class="conditions">
    <div>
      <input
        type="checkbox"
        name="condition-tired"
        id="condition-tired"
        :disabled="viewOnly"
        v-model="conditionsCopy.tired"
        @input="emit"
      />
      <label for="condition-tired">{{ $t("Tired") }}</label>
    </div>

    <div>
      <input
        type="checkbox"
        name="condition-dehydrated"
        id="condition-dehydrated"
        :disabled="viewOnly"
        v-model="conditionsCopy.dehydrated"
        @input="emit"
      />
      <label for="condition-dehydrated">{{ $t("Dehydrated") }}</label>
    </div>

    <div>
      <input
        type="checkbox"
        name="condition-starving"
        id="condition-starving"
        :disabled="viewOnly"
        v-model="conditionsCopy.starving"
        @input="emit"
      />
      <label for="condition-starving">{{ $t("Starving") }}</label>
    </div>

    <div>
      <input
        type="checkbox"
        name="condition-cold"
        id="condition-cold"
        :disabled="viewOnly"
        v-model="conditionsCopy.cold"
        @input="emit"
      />
      <label for="condition-cold">{{ $t("Cold") }}</label>
    </div>
  </div>

  <!-- spacer -->
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
h2 {
  margin: 0rem 1rem 1rem 1rem;
}

.conditions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12ch, 1fr));
}

.modal-body {
  overflow: auto;
  text-align: left;
  max-width: 70rem;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 60rem;

  ul {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
    li {
      padding: 0.5em;
      text-indent: -0.5rem;
      &:before {
        content: "✥";
      }
    }
  }
}

.experience-input {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 4rem;
  label {
    margin-right: 1rem;
  }
}

.header {
  border-bottom: solid @pastel-green 5px;
}

.modal-button-row {
  border-top: solid @pastel-green 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.tab {
  background: white;
  color: @pastel-green;
  padding: 0.5rem;
  margin-right: 5px;
  outline: solid 1px @pastel-green;
  display: inline-block;
  cursor: pointer;
  &:active {
    transform: translateY(3px);
    background: @pastel-green;
    color: white;
  }
  &--active {
    background: @pastel-green;
    color: white;
  }
}

.tab-bar {
  text-align: left;
  margin: 0 1rem;
}

.xp-modal {
  margin: 0 auto;
}
</style>
