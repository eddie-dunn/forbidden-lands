<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import {
  CharacterData,
  CharacterTalent,
  Conditions,
} from "@/data/character/characterData"

import { FLSelect, Option as FLOption } from "@/components/base/FLSelect.vue"

import {
  prob,
  probZeroSuccess,
  probBlackSkull,
  probWhiteSkull,
} from "@/dice/diceProbability"
import { IDiceConfig } from "@/dice/diceTypes"

import Dice from "./DiceType.vue"
import { maxPossible } from "@/dice/diceUtil"

const SWORDS = "⚔"

enum ProbType {
  "success",
  "whiteSkull",
  "blackSkull",
}

// const inPercent = (n: number) => Math.round(n * 100)
const inPercent = (n: number) => (n * 100).toFixed(0) + "%"

@Component({
  components: {
    Dice,
    FLSelect,
  },
})
export class DiceProbability extends Vue {
  @Prop({ required: true }) conf!: IDiceConfig
  @Prop({ default: () => ({}) }) pushedRoll!: IDiceConfig

  minSuccessValue = 1
  minWhiteSkull = 1
  minBlackSkull = 1
  sign = "≈"
  probType = ProbType

  get optionsSuccess() {
    const opts: FLOption[] = []
    opts.push({ id: String(0), name: `${0}` })
    for (let i = 1; i <= maxPossible(this.conf); i++) {
      opts.push({ id: String(i), name: `${i}` })
    }
    return opts
  }

  get optionsBlackSkull() {
    const opts: FLOption[] = []
    opts.push({ id: String(0), name: `${0}` })
    for (let i = 1; i <= maxPossible({ black: this.conf.black }); i++) {
      opts.push({ id: String(i), name: `${i}` })
    }
    return opts
  }

  get optionsWhiteSkull() {
    const opts: FLOption[] = []
    opts.push({ id: String(0), name: `${0}` })
    for (let i = 1; i <= maxPossible({ white: this.conf.white }); i++) {
      opts.push({ id: String(i), name: `${i}` })
    }
    return opts
  }

  options(probType: ProbType) {
    const optionsArray = (c: IDiceConfig) => {
      const opts: FLOption[] = []
      opts.push({ id: String(0), name: `${0}` })
      for (let i = 1; i <= maxPossible(c); i++) {
        opts.push({ id: String(i), name: `${i} ${this.$t("or more")}` })
      }
      return opts
    }

    switch (probType) {
      case ProbType.whiteSkull:
        return optionsArray({ white: this.conf.white })
      case ProbType.blackSkull:
        return optionsArray({ black: this.conf.black })
      default:
        return optionsArray(this.conf)
    }
  }

  getProb(probType: ProbType, minValue: number) {
    const mProb = (
      probFunc: typeof prob | typeof probBlackSkull | typeof probWhiteSkull,
      value: number
    ) => {
      if (value === 0) {
        return inPercent(1 - probFunc(this.conf, 1))
      }
      return inPercent(probFunc(this.conf, value))
    }
    switch (probType) {
      case ProbType.whiteSkull:
        return mProb(probWhiteSkull, minValue)
      case ProbType.blackSkull:
        return mProb(probBlackSkull, minValue)
      case ProbType.success:
        return mProb(prob, minValue)
      default:
        throw new Error(`Invalid probType ${probType}`)
    }
  }

  get successProb() {
    if (this.minSuccessValue === 0) {
      return inPercent(probZeroSuccess(this.conf))
    }
    return inPercent(prob(this.conf, this.minSuccessValue))
  }

  failBlackProb(min: number) {
    if (min === 0) {
      return inPercent(1 - probBlackSkull(this.conf, 1))
    }
    const probBlack = probBlackSkull(this.conf, min)
    return inPercent(probBlack)
  }

  get failWhiteProb() {
    if (this.minWhiteSkull === 0) {
      return inPercent(1 - probWhiteSkull(this.conf, 1))
    }
    const probWhite = probWhiteSkull(this.conf, this.minWhiteSkull)
    return inPercent(probWhite)
  }

  get containsBlack() {
    return this.conf.black
  }

  get containsWhite() {
    return this.conf.white
  }

  get containsDice() {
    return maxPossible(this.conf) > 0
  }
}

export default DiceProbability
</script>

<template>
  <div class="dice-probability">
    <!-- spacer -->

    <div v-if="containsBlack" style="display: contents;">
      <FLSelect
        :options="optionsBlackSkull"
        v-model.number="minBlackSkull"
        class="prob-select"
        :fullWidth="true"
      />
      <div class="align-center">
        <span>{{ $t("or more") }}</span>
        <Dice color="black" :value="1" class="dice-icon" />
        {{ sign }}
        {{ failBlackProb(minBlackSkull) }}
      </div>

      <div class="zero">0</div>
      <div class="align-center">
        <Dice color="black" :value="1" class="dice-icon" />
        {{ sign }}
        {{ getProb(probType.blackSkull, 0) }}
      </div>
    </div>

    <div v-if="containsWhite" style="display: contents;">
      <FLSelect
        :options="optionsWhiteSkull"
        v-model.number="minWhiteSkull"
        :fullWidth="true"
        class="prob-select"
      />
      <div class="align-center">
        <span>{{ $t("or more") }}</span>
        <Dice color="white" :value="1" class="dice-icon" />
        {{ sign }}
        {{ failWhiteProb }}
      </div>
      <div class="zero">0</div>
      <div class="align-center">
        <Dice color="white" :value="1" class="dice-icon" />
        {{ sign }}
        {{ getProb(probType.whiteSkull, 0) }}
      </div>
    </div>

    <div v-if="containsDice" style="display: contents;">
      <FLSelect
        :options="optionsSuccess"
        v-model.number="minSuccessValue"
        :fullWidth="true"
        class="prob-select"
      />
      <div class="align-center">
        <span>{{ $t("or more") }}</span>
        <Dice color="white" :value="6" class="dice-icon" />
        {{ sign }}
        {{ successProb }}
      </div>
      <div class="zero">0</div>
      <div class="align-center">
        <Dice color="white" :value="6" class="dice-icon" />
        {{ sign }}
        {{ getProb(probType.success, 0) }}
      </div>
    </div>

    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.align-center {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.dice-probability {
  margin: 1rem;
  // margin: auto;
  // display: flex;
  // align-items: center;
  // flex-wrap: wrap;
  display: inline-grid;
  grid-gap: 0.25rem;
  grid-template-columns: auto 1fr auto 1fr;
}

.dice-icon {
  height: 2rem;
  width: 2rem;
  margin: 3px;
}

.prob-select {
  margin: 3px;
}

.zero {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: monospace;
  font-size: 20px;
  margin-left: 0.25rem;
  padding-left: 0.45rem;
  border-left: 1px solid #33333333;
}
</style>
