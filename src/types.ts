// Project wide types
export type Age = "young" | "adult" | "old" | ""

export type Attribute = "strength" | "agility" | "wits" | "empathy"

export type DiceSides = 0 | 6 | 8 | 10 | 12 | 66 | 666 // 0 is no dice

export type DiceTypes = "white" | "red" | "black" | "green" | "blue" | "orange"

export type CombatAction = "parry" | "dodge" | "cast" | "melee" | "shoot"

export type KinName =
  | "dwarf"
  | "elf"
  | "goblin"
  | "halfelf"
  | "halfling"
  | "human"
  | "orc"
  | "wolfkin"

export type ExtendedKinName = KinName | "alderlander" | "ailander" | "aslene"

export type Profession =
  | "druid"
  | "fighter"
  | "hunter"
  | "minstrel"
  | "peddler"
  | "rider"
  | "rogue"
  | "sorcerer"

export type Skill =
  | "animal handling"
  | "crafting"
  | "endurance"
  | "healing"
  | "insight"
  | "lore"
  | "manipulation"
  | "marksmanship"
  | "melee"
  | "might"
  | "move"
  | "performance"
  | "scouting"
  | "sleight of hand"
  | "stealth"
  | "survival"
export type TSkillId = Skill

export type Sex = "male" | "female" | "unset"

export type TalentKin =
  | "Adaptive"
  | "Hard to Catch"
  | "Hunting Instincts"
  | "Inner Peace"
  | "Psychic Power"
  | "Sneaky"
  | "True Grit"
  | "Unbreakable"

export type TalentGeneral =
  // General
  | "ambidextrous"
  | "axe fighter"
  | "berserker"
  | "bowyer"
  | "brawler"
  | "builder"
  | "chef"
  | "cold blooded"
  | "defender"
  | "dragonslayer"
  | "executioner"
  | "fast footwork"
  | "fast shooter"
  | "fearless"
  | "firm grip"
  | "fisher"
  | "hammer fighter"
  | "herbalist"
  | "horseback fighter"
  | "incorruptible"
  | "knife fighter"
  | "lightning fast"
  | "lockpicker"
  | "lucky"
  | "master of the hunt"
  | "melee charge"
  | "pack rat"
  | "pain resistant"
  | "pathfinder"
  | "poisoner"
  | "quartermaster"
  | "quickdraw"
  | "sailor"
  | "sharpshooter"
  | "sharp tongue"
  | "shield fighter"
  | "sixth sense"
  | "smith"
  | "spear fighter"
  | "steady feet"
  | "sword fighter"
  | "tailor"
  | "tanner"
  | "threatening"
  | "throwing arm"
  | "wanderer"

export type TalentDruid =
  | "Path of Healing"
  | "Path of Shifting Shapes"
  | "Path of Sight"

export type TalentFighter =
  | "Path of the Blade"
  | "Path of the Enemy"
  | "Path of the Shield"

export type TalentHunter =
  | "Path of the Arrow"
  | "Path of the Beast"
  | "Path of the Forest"

export type TalentMinstrel =
  | "Path of the Hymn"
  | "Path of the Song"
  | "Path of the Warcry"

export type TalentPeddler =
  | "Path of Gold"
  | "Path of Lies"
  | "Path of Many Things"

export type TalentRider =
  | "Path of the Companion"
  | "Path of the Knight"
  | "Path of the Plains"

export type TalentRogue =
  | "Path of the Face"
  | "Path of the Killer"
  | "Path of Poison"

export type TalentSorcerer =
  | "Path of Blood"
  | "Path of Death"
  | "Path of Signs"
  | "Path of Stone"

export type TalentProfession =
  | TalentDruid
  | TalentFighter
  | TalentHunter
  | TalentMinstrel
  | TalentPeddler
  | TalentRider
  | TalentRogue
  | TalentSorcerer

export type TalentAll = TalentKin | TalentGeneral | TalentProfession
