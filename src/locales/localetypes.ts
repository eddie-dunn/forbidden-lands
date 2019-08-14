import { Age, Attribute, KinName, Profession, Skill, TalentAll } from "@/types"

export type AttributeTranslations = {
  [key in Attribute | "attributes"]: string
}

export type KinTranslations = {
  [key in KinName | "kin" | "alderlander" | "aslene" | "ailander"]: string
}

export type ProfessionTranslations = { [key in Profession]: string }

export type SkillTranslations = { [key in Skill | "skills"]: string }

export type AgeTranslations = { [key in Age | "age"]: string }

export type TalentTranslations = { [key in TalentAll]: string }

export type GearDescriptionKeys =
  | "gear_druid"
  | "gear_fighter"
  | "gear_hunter"
  | "gear_minstrel"
  | "gear_peddler"
  | "gear_rider"
  | "gear_rogue"
  | "gear_sorcerer"

export type GearDescriptionTranslations = {
  [key in GearDescriptionKeys]: string
}
