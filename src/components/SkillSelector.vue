<script>
// TODO: Convert to ts file
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
import { getAgeType } from "@/age.ts"
import SvgIcon from "@/components/SvgIcon.vue"
import SkillInput from "@/components/SkillInput.vue"
import SkillRoller from "@/components/SkillRoller.vue"
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

function skillsSortedByTranslation(vm, skills) {
  const sorted = Object.values(skills)
    .map((skill) => {
      skill.translation = vm.$t(skill.id)
      return skill
    })
    .sort((skillA, skillB) => {
      const greater = skillA.translation > skillB.translation
      return greater ? 1 : -1
    })
  return sorted
}

export default Vue.extend({
  components: {
    SkillInput,
    SkillRoller,
    SvgIcon,
  },
  props: {
    // TODO: Send in characterData object instead
    profession: {
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
      return calcSkillPoints(this.ageType)
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
    ageType() {
      return getAgeType(this.charData.age, this.charData.kin)
    },
    skills() {
      return skillsSortedByTranslation(this, this.charData.skills)
    },
  },
  data() {
    return {
      SKILLS,
      skillRollerOpen: null,
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
      if (this.characterStatus !== "new") return false
      return isClassSkill(skillId, profession)
    },
    skillChanged(skillId, value) {
      if (this.characterStatus === "levelup") {
        this.charData.experience += value
      }
    },
    skillLabelClicked(skill) {
      if (this.characterStatus !== "active") return
      this.skillRollerOpen = skill
    },
  },
})
</script>

<template>
  <div>
    <div v-if="characterStatus === 'new'">
      {{ $t("Remaining") }}: {{ skillPoints - pointsSpent() }}
    </div>
    <div :class="['skillbox', canEditSkills ? 'skillbox-edit' : '']">
      <div
        v-for="skill in skills"
        :key="skill.id"
        :class="['skillrow', canEditSkills ? 'skillrow-edit' : '']"
        @click="skillLabelClicked(skill)"
      >
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
          <div class="inline-block">{{ $t(skill.id) }}</div>
        </label>
        <div v-if="!canEditSkills" class="skill-view">
          {{ charData.skills[skill.id].rank }}
        </div>
        <SkillInput
          v-if="canEditSkills"
          class="skill-input"
          :status="characterStatus"
          :experience="charData.experience"
          :max="getSkillMaxRank(skill.id)"
          v-model.number="charData.skills[skill.id].rank"
          @xp-change="skillChanged(skill.id, $event)"
        />
      </div>
    </div>

    <SkillRoller
      v-if="skillRollerOpen"
      @close="skillRollerOpen = null"
      :skill="skillRollerOpen"
      :charData="charData"
    />

    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
.inline-block {
  display: inline-block;
}

.attribute-icon {
  flex-shrink: 0;
}

.skillbox {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  &.skillbox-edit {
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  }
  row-gap: 1rem;
  column-gap: 3px;
  margin: 1rem 0;
}

.skillrow {
  align-items: center;
  display: grid;
  grid-template-columns: auto 2fr 1fr;
  &.skillrow-edit {
    grid-template-columns: auto 2fr;
  }
  grid-gap: 3px;
}

.class-skill {
  font-weight: bold;
}

.skill-name {
  text-transform: capitalize;
  overflow-x: scroll;
  scrollbar-width: none;
}
.skill-name::-webkit-scrollbar {
  display: none; // Safari and Chrome
}

.skill-input {
  grid-column-start: 2;
  justify-content: center;
  align-items: center;
  align-self: center;
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
