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
import { getSkills, iconFor, SKILLS } from "@/skills.ts"
import { getSkillMax, isClassSkill } from "@/classes.ts"
import SvgIcon from "@/components/SvgIcon.vue"
import FLNumberInput from "@/components/FLNumberInput.vue"
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
  components: {
    FLNumberInput,
    SvgIcon,
  },
  props: {
    // TODO: Send in characterData object instead
    age: {
      type: String,
      required: true,
      validator: function(value) {
        return [...Object.values(AGE), null, ""].indexOf(value) !== -1
      },
    },
    profession: {
      required: true,
    },
    skills: {
      type: Object,
      required: true,
    },
    skillMaximum: {
      type: Number,
      default: 5,
    },
    charData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    skillPoints() {
      return calcSkillPoints(this.age)
    },
    valid() {
      return this.skillPoints - this.pointsSpent() === 0
    },
    characterStatus() {
      return this.charData.metadata.status
    },
    canEditSkills() {
      return ["new", "freeEdit", "levelup"].includes(this.characterStatus)
    },
  },
  data() {
    return {
      SKILLS,
    }
  },
  methods: {
    iconFor,
    pointsSpent() {
      return Object.entries(this.skills)
        .map((item) => item[1].rank)
        .reduce(
          (accumulator, currentValue) => Number(accumulator) + currentValue
        )
    },
    allPointsSpent() {
      return this.skillPoints - this.pointsSpent() <= 0
    },
    getSkillMaxRank(skillId) {
      if (this.characterStatus === "new") {
        return getSkillMax(skillId, this.profession)
      }
      return this.skillMaximum
    },
    isClassSkill(skillId, profession) {
      return isClassSkill(skillId, profession)
    },
  },
})
</script>

<template>
  <div>
    <div v-if="characterStatus === 'new'">
      {{ $t("Remaining") }}: {{ skillPoints - pointsSpent() }}
    </div>
    <div class="skillbox">
      <div v-for="skill in skills" :key="skill.id" class="skillrow">
        <SvgIcon
          :name="iconFor(SKILLS[skill.id].attribute)"
          :title="skill.attribute"
          class="attribute-icon"
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
        <FLNumberInput
          v-if="canEditSkills"
          class="skill-input"
          fontSize="1.2rem"
          :id="skill.id"
          :name="skill.id"
          type="number"
          :placeholder="'0-' + getSkillMaxRank(skill.id)"
          min="0"
          :max="getSkillMaxRank(skill.id)"
          :num="skills[skill.id].rank"
          v-model.number="skills[skill.id].rank"
          :ref="skill.id"
        />
        <div v-else class="skill-display">
          {{ skills[skill.id].rank || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.attribute-icon {
  flex-shrink: 0;
}

.skillbox {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(19ch, 1fr));
  row-gap: 1.2rem;
  column-gap: 3px;
}

.skillrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // flex: 1 1 auto;
  // flex-basis: 30%;
}

.class-skill {
  font-weight: bold;
}

.skill-name {
  text-transform: capitalize;
  margin-right: auto;
  margin-left: 0.2rem;
  overflow-x: scroll;
  scrollbar-width: none;
  flex-grow: 1;
}
.skill-name::-webkit-scrollbar {
  display: none; // Safari and Chrome
}

.skill-input {
  margin-left: 0.2rem;
}

.skill-display {
  flex-basis: 10%;
  font-size: 1.2rem;
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
