<script>
/*
AGE SKILL POINTS
Young 8
Adult 10
Old 12

Profession skills: Max 3
Other skills: Max 1
Skillmax: 5
*/
import { AGE, CLASS } from "@/keys.ts"
import { getSkills } from "@/skills.ts"
import { getSkillMax, isClassSkill } from "@/classes.ts"
import Vue from "vue"

function calcSkillPoints(age) {
  return (
    {
      [AGE.YOUNG]: 8,
      [AGE.ADULT]: 10,
      [AGE.OLD]: 12,
    }[age] || 0
  )
}

export default Vue.extend({
  props: {
    // TODO: Send in characterData object instead
    age: {
      type: String,
      required: true,
      validator: function(value) {
        return Object.values(AGE).indexOf(value) !== -1
      },
    },
    profession: {
      // type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    // Functions
    skills: {
      type: Object,
      required: true,
      // default: () => JSON.parse(JSON.stringify(SKILLS)),
    },
  },
  computed: {
    skillPoints() {
      return calcSkillPoints(this.age)
    },
    valid() {
      return this.skillPoints - this.pointsSpent() === 0
    },
  },
  watch: {
    valid: {
      immediate: true,
      handler() {
        const valid = this.valid ? "✓" : "✖"
        this.$parent.$emit("card-sign", valid)
      },
    },
  },
  methods: {
    pointsSpent() {
      return Object.entries(this.skills)
        .map(item => item[1].rank)
        .reduce(
          (accumulator, currentValue) => Number(accumulator) + currentValue
        )
    },
    allPointsSpent() {
      return this.skillPoints - this.pointsSpent() <= 0
    },
    getSkillMaxRank(skillId) {
      return getSkillMax(skillId, this.profession)
    },
    isClassSkill(skillId, profession) {
      return isClassSkill(skillId, profession)
    },
  },
})
</script>

<template>
  <div>
    <div>
      Available: {{ skillPoints - pointsSpent() }} | Spent:
      {{ pointsSpent() }} | Total: {{ skillPoints }} | Valid: {{ this.valid }}
    </div>
    <div class="skillbox">
      <div v-for="skill in skills" :key="skill.id" class="skillrow">
        <input
          class="skill-input"
          :id="skill.id"
          :name="skill.id"
          type="number"
          :placeholder="'0-' + getSkillMaxRank(skill.id)"
          min="0"
          :max="getSkillMaxRank(skill.id)"
          v-model.number="skills[skill.id].rank"
          :ref="skill.id"
        />
        <label
          :for="skill.id"
          v-bind:class="[
            'skill-name',
            { 'class-skill': isClassSkill(skill.id, profession) },
          ]"
        >
          {{ $t(skill.id) }}
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.skillbox {
  // display: inline-grid;
  // grid-auto-columns: repeat(3, 1fr);
  display: grid;

  // grid-auto-columns: minmax(max-content, 2fr);
  grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
  // grid-template-columns: repeat(auto-fill, minmax(min-content, 1px));
  // grid-auto-columns: max-content;
  grid-gap: 10px;
}

.skillrow {
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.class-skill {
  font-weight: bold;
}

.skill-name {
  text-transform: capitalize;
  margin-right: auto;
  margin-left: 0.25rem;
}

.skill-input {
  height: 1rem;
  max-width: 3rem;
}

// input:valid.with-checkbox + span::before {
//   content: "✓";
//   padding-right: 1rem;
//   // padding-left: 5px;
// }

// input:invalid.with-checkbox + span::before {
//   content: "✖";
//   padding-right: 1rem;
//   // padding-left: 5px;
// }
</style>
