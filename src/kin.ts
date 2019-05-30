import { Attribute, KinName, Profession, TalentKin } from "@/types"

export interface Kin {
  id: KinName
  key_attribute: Attribute
  kin_talent: TalentKin
  typical_professions: Profession[]
  typical_names_male: string[]
  typical_names_female: string[]
}

type KinList = { [key in KinName]: Kin }
// interface KinList {
//   [key: string]: Kin;
// }

// TODO: Add all typical names
export const KIN: KinList = {
  ["dwarf"]: {
    id: "dwarf",
    key_attribute: "strength",
    kin_talent: "True Grit",
    typical_professions: ["fighter", "minstrel", "peddler"],
    typical_names_male: ["Bodlo", "Gandeman", "Hargamar", "Tyrgar", " Wulfred"],
    typical_names_female: [
      "Hamhelda",
      "Hilleva",
      "Skorinda",
      "Torbenia",
      "Trindi",
    ],
  },
  ["elf"]: {
    id: "elf",
    key_attribute: "agility",
    kin_talent: "Inner Peace",
    typical_professions: ["druid", "minstrel", "hunter"],
    typical_names_male: [],
    typical_names_female: [],
  },
  ["goblin"]: {
    id: "goblin",
    key_attribute: "agility",
    kin_talent: "Sneaky",
    typical_professions: ["hunter", "rider", "rogue"],
    typical_names_male: [],
    typical_names_female: [],
  },
  ["halfelf"]: {
    id: "halfelf",
    key_attribute: "wits",
    kin_talent: "Psychic Power",
    typical_professions: ["fighter", "minstrel", "peddler"],
    typical_names_male: [],
    typical_names_female: [],
  },
  ["halfling"]: {
    id: "dwarf",
    key_attribute: "empathy",
    kin_talent: "Hard to Catch",
    typical_professions: [],
    typical_names_male: [],
    typical_names_female: [],
  },
  ["human"]: {
    id: "human",
    key_attribute: "empathy",
    kin_talent: "Adaptive",
    typical_professions: [],
    typical_names_male: [],
    typical_names_female: [],
  },
  ["orc"]: {
    id: "dwarf",
    key_attribute: "strength",
    kin_talent: "Unbreakable",
    typical_professions: [],
    typical_names_male: [],
    typical_names_female: [],
  },
  ["wolfkin"]: {
    id: "dwarf",
    key_attribute: "agility",
    kin_talent: "Hunting Instincts",
    typical_professions: [],
    typical_names_male: [],
    typical_names_female: [],
  },
  /*
  [K.ELF]: {
    id: K.ELF,
    key_attribute: K.AGILITY,
    kin_talent: "",
    typical_professions: [K.DRUID, K.MINSTREL, K.HUNTER],
    typical_names_male: [],
    typical_names_female: [],
  },
  [K.GOBLIN]: {
    id: K.GOBLIN,
    key_attribute: K.AGILITY,
    kin_talent: "",
    typical_professions: [K.HUNTER, K.RIDER, K.ROGUE],
    typical_names_male: [],
    typical_names_female: [],
  },
  [K.HALFELF]: {
    id: K.HALFELF,
    key_attribute: K.WITS,
    kin_talent: K.PSYCHIC_POWER,
    typical_professions: [K.DRUID, K.ROGUE, K.SORCERER],
    typical_names_male: [],
    typical_names_female: [],
  },
  [K.HALFLING]: {
    id: K.HALFLING,
    key_attribute: K.EMPATHY,
    kin_talent: "",
    typical_professions: [],
    typical_names_male: [],
    typical_names_female: [],
  },
  [K.HUMAN]: {
    id: K.HUMAN,
    key_attribute: K.EMPATHY,
    kin_talent: "",
    typical_professions: [],
    typical_names_male: [],
    typical_names_female: [],
  },
  [K.ORC]: {
    id: K.ORC,
    key_attribute: K.STRENGTH,
    kin_talent: "",
    typical_professions: [],
    typical_names_male: [],
    typical_names_female: [],
  },
  [K.WOLFKIN]: {
    id: K.WOLFKIN,
    key_attribute: K.AGILITY,
    kin_talent: "",
    typical_professions: [],
    typical_names_male: [],
    typical_names_female: [],
  },
  */
}

export default KIN
