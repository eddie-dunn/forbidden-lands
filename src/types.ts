// Project wide types
export type Age = "young" | "adult" | "old" | ""

export type Attribute = "strength" | "agility" | "wits" | "empathy"

export type DiceSides = 0 | 6 | 8 | 10 | 12 // 0 is no dice

export type KinName =
  | "dwarf"
  | "elf"
  | "goblin"
  | "halfelf"
  | "halfling"
  | "human"
  | "orc"
  | "wolfkin"

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
  | ""

export type TalentGeneral =
  // General
  | "Ambidextrous"
  | "Axe Fighter"
  | "Berserker"
  | "Bowyer"
  | "Brawler"
  | "Builder"
  | "Chef"
  | "Cold Blooded"
  | "Defender"
  | "Dragonslayer"
  | "Executioner"
  | "Fast Footwork"
  | "Fast Shooter"
  | "Fearless"
  | "Firm Grip"
  | "Fisher"
  | "Hammer Fighter"
  | "Herbalist"
  | "Horseback Fighter"
  | "Incorruptible"
  | "Knife Fighter"
  | "Lightning Fast"
  | "Lockpicker"
  | "Lucky"
  | "Master of the Hunt"
  | "Melee Charge"
  | "Pack Rat"
  | "Pain Resistant"
  | "Pathfinder"
  | "Poisoner"
  | "Quartermaster"
  | "Quickdraw"
  | "Sailor"
  | "Sharpshooter"
  | "Sharp Tongue"
  | "Shield Fighter"
  | "Sixth Sense"
  | "Smith"
  | "Spear Fighter"
  | "Steady Feet"
  | "Sword Fighter"
  | "Tailor"
  | "Tanner"
  | "Threatening"
  | "Throwing Arm"
  | "Wanderer"

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
  | ""

export type TalentMinstrel =
  | "Path of the Hymn"
  | "Path of the Song"
  | "Path of the Warcry"
  | ""

export type TalentPeddler =
  | "Path of Gold"
  | "Path of Lies"
  | "Path of Many Things"
  | ""

export type TalentRider =
  | "Path of the Companion"
  | "Path of the Knight"
  | "Path of the Plains"
  | ""

export type TalentRogue =
  | "Path of the Face"
  | "Path of the Killer"
  | "Path of Poison"
  | ""

export type TalentSorcerer =
  | "Path of Blood"
  | "Path of Death"
  | "Path of Signs"
  | "Path of Stone"
  | ""

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
