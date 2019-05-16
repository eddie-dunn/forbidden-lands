import {
  AgeTranslations,
  AttributeTranslations,
  GearDescriptionTranslations,
  KinTranslations,
  ProfessionTranslations,
  SkillTranslations,
  TalentTranslations,
} from "./localetypes"

const age: AgeTranslations = {
  "age": "age",
  "adult": "adult",
  "old": "old",
  "young": "young",
  "": "?",
}

const professions: ProfessionTranslations = {
  sorcerer: "sorcerer",
  druid: "druid",
  fighter: "fighter",
  hunter: "hunter",
  minstrel: "minstrel",
  peddler: "peddler",
  rider: "rider",
  rogue: "rogue",
}

const attributes: AttributeTranslations = {
  attributes: "attributes",
  agility: "agility",
  empathy: "empathy",
  strength: "strength",
  wits: "wits",
}

const kin: KinTranslations = {
  kin: "kin",
  dwarf: "dwarf",
  elf: "elf",
  goblin: "goblin",
  halfelf: "halfelf",
  halfling: "halfling",
  human: "human",
  orc: "orc",
  wolfkin: "wolfkin",
}

const talents = {
  talents: "talents",
  // Kin
  TRUE_GRIT: "True Grit", // dwarf
  INNER_PEACE: "Inner Peace", // elf
  SNEAKY: "Sneaky", // goblin
  PSYCHIC_POWER: "Psychic Power", // half-elf
  HARD_TO_CATCH: "Hard to Catch", // halfling
  ADAPTIVE: "Adaptive", // human
  UNBREAKABLE: "Unbreakable", // orc
  HUNTING_INSTINCTS: "Hunting Instincts", // wolfkin

  // General
  AMBIDEXTROUS: "Ambidextrous",
  AXE_FIGHTER: "Axe Fighter",
  BERSERKER: "Berserker",
  BOWYER: "Bowyer",
  BRAWLER: "Brawler",
  BUILDER: "Builder",
  CHEF: "Chef",
  COLD_BLOODED: "Cold Blooded",
  DEFENDER: "Defender",
  DRAGONSLAYER: "Dragonslayer",
  EXECUTIONER: "Executioner",
  FAST_FOOTWORK: "Fast Footwork",
  FAST_SHOOTER: "Fast Shooter",
  FEARLESS: "Fearless",
  FIRM_GRIP: "Firm Grip",
  FISHER: "Fisher",
  HAMMER_FIGHTER: "Hammer Fighter",
  HERBALIST: "Herbalist",
  HORSEBACK_FIGHTER: "Horseback Fighter",
  INCORRUPTIBLE: "Incorruptible",
  KNIFE_FIGHTER: "Knife Fighter",
  LIGHTNING_FAST: "Lightning Fast",
  LOCKPICKER: "Lockpicker",
  LUCKY: "Lucky",
  MASTER_OF_THE_HUNT: "Master of the Hunt",
  MELEE_CHARGE: "Melee Charge",
  PACK_RAT: "Pack Rat",
  PAIN_RESISTANT: "Pain Resistant",
  PATHFINDER: "Pathfinder",
  POISONER: "Poisoner",
  QUARTERMASTER: "Quartermaster",
  QUICKDRAW: "Quickdraw",
  SAILOR: "Sailor",
  SHARPSHOOTER: "Sharpshooter",
  SHARP_TONGUE: "Sharp Tongue",
  SHIELD_FIGHTER: "Shield Fighter",
  SIXTH_SENSE: "Sixth Sense",
  SMITH: "Smith",
  SPEAR_FIGHTER: "Spear Fighter",
  STEADY_FEET: "Steady Feet",
  SWORD_FIGHTER: "Sword Fighter",
  TAILOR: "Tailor",
  TANNER: "Tanner",
  THREATENING: "Threatening",
  THROWING_ARM: "Throwing Arm",
  WANDERER: "Wanderer",

  // Druid
  PATH_OF_HEALING: "Path of Healing",
  PATH_OF_SHIFTING_SHAPES: "Path of Shifting Shapes",
  PATH_OF_SIGHT: "Path of Sight",

  // Fighter
  PATH_OF_THE_BLADE: "Path of the Blade",
  PATH_OF_THE_ENEMY: "Path of the Enemy",
  PATH_OF_THE_SHIELD: "Path of the Shield",

  // HUNTER
  PATH_OF_THE_ARROW: "Path of the Arrow",
  PATH_OF_THE_BEAST: "Path of the Beast",
  PATH_OF_THE_FOREST: "Path of the Forest",

  // MINSTREL
  PATH_OF_THE_HYMN: "Path of the Hymn",
  PATH_OF_THE_SONG: "Path of the Song",
  PATH_OF_THE_WARCRY: "Path of the Warcry",

  // Peddler
  PATH_OF_GOLD: "Path of Gold",
  PATH_OF_LIES: "Path of Lies",
  PATH_OF_MANY_THINGS: "Path of Many Things",

  // Rider
  PATH_OF_THE_COMPANION: "Path of the Companion",
  PATH_OF_THE_KNIGHT: "Path of the Knight",
  PATH_OF_THE_PLAINS: "Path of the Plains",

  // Rogue
  PATH_OF_THE_FACE: "Path of the Face",
  PATH_OF_THE_KILLER: "Path of the Killer",
  PATH_OF_POISON: "Path of Poison",

  // Sorcerer
  PATH_OF_BLOOD: "Path of Blood",
  PATH_OF_DEATH: "Path of Death",
  PATH_OF_SIGNS: "Path of Signs",
  PATH_OF_STONE: "Path of Stone",
}

const talents2: TalentTranslations = {
  // Kin
  "True Grit": "Bita ihop", // dwarf
  "Inner Peace": "Inre frid", // elf
  "Sneaky": "Lömsk", // goblin
  "Psychic Power": "Psykisk kraft", // half-elf
  "Hard to Catch": "Kvickfotad", // halfling
  "Adaptive": "Adaptiv", // human
  "Unbreakable": "Stryktålig", // orc
  "Hunting Instincts": "Jaktsinne", // wolfkin

  // General
  "Ambidextrous": "Ambidextrous",
  "Axe Fighter": "Axe Fighter",
  "Berserker": "Berserker",
  "Bowyer": "Bowyer",
  "Brawler": "Brawler",
  "Builder": "Builder",
  "Chef": "Chef",
  "Cold Blooded": "Cold Blooded",
  "Defender": "Defender",
  "Dragonslayer": "Dragonslayer",
  "Executioner": "Executioner",
  "Fast Footwork": "Fast Footwork",
  "Fast Shooter": "Fast Shooter",
  "Fearless": "Fearless",
  "Firm Grip": "Firm Grip",
  "Fisher": "Fisher",
  "Hammer Fighter": "Hammer Fighter",
  "Herbalist": "Herbalist",
  "Horseback Fighter": "Horseback Fighter",
  "Incorruptible": "Incorruptible",
  "Knife Fighter": "Knife Fighter",
  "Lightning Fast": "Lightning Fast",
  "Lockpicker": "Lockpicker",
  "Lucky": "Lucky",
  "Master of the Hunt": "Master of the Hunt",
  "Melee Charge": "Melee Charge",
  "Pack Rat": "Pack Rat",
  "Pain Resistant": "Pain Resistant",
  "Pathfinder": "Pathfinder",
  "Poisoner": "Poisoner",
  "Quartermaster": "Quartermaster",
  "Quickdraw": "Snabbdrag",
  "Sailor": "Sailor",
  "Sharpshooter": "Sharpshooter",
  "Sharp Tongue": "Sharp Tongue",
  "Shield Fighter": "Shield Fighter",
  "Sixth Sense": "Sixth Sense",
  "Smith": "Smith",
  "Spear Fighter": "Spear Fighter",
  "Steady Feet": "Steady Feet",
  "Sword Fighter": "Sword Fighter",
  "Tailor": "Tailor",
  "Tanner": "Tanner",
  "Threatening": "Threatening",
  "Throwing Arm": "Throwing Arm",
  "Wanderer": "Wanderer",

  // Druid
  "Path of Healing": "Path of Healing",
  "Path of Shifting Shapes": "Path of Shifting Shapes",
  "Path of Sight": "Path of Sight",

  // Fighter
  "Path of the Blade": "Path of the Blade",
  "Path of the Enemy": "Path of the Enemy",
  "Path of the Shield": "Path of the Shield",

  // HUNTER
  "Path of the Arrow": "Path of the Arrow",
  "Path of the Beast": "Path of the Beast",
  "Path of the Forest": "Path of the Forest",

  // MINSTREL
  "Path of the Hymn": "Path of the Hymn",
  "Path of the Song": "Path of the Song",
  "Path of the Warcry": "Path of the Warcry",

  // Peddler
  "Path of Gold": "Path of Gold",
  "Path of Lies": "Path of Lies",
  "Path of Many Things": "Path of Many Things",

  // Rider
  "Path of the Companion": "Path of the Companion",
  "Path of the Knight": "Path of the Knight",
  "Path of the Plains": "Path of the Plains",

  // Rogue
  "Path of the Face": "Path of the Face",
  "Path of the Killer": "Path of the Killer",
  "Path of Poison": "Path of Poison",

  // Sorcerer
  "Path of Blood": "Path of Blood",
  "Path of Death": "Path of Death",
  "Path of Signs": "Path of Signs",
  "Path of Stone": "Path of Stone",
}

const skills: SkillTranslations = {
  "skills": "skills",
  "animal handling": "animal handling",
  "crafting": "crafting",
  "endurance": "endurance",
  "healing": "healing",
  "insight": "insight",
  "lore": "lore",
  "manipulation": "manipulation",
  "marksmanship": "marksmanship",
  "melee": "melee",
  "might": "might",
  "move": "move",
  "performance": "performance",
  "scouting": "scouting",
  "sleight of hand": "sleight of hand",
  "stealth": "stealth",
  "survival": "survival",
}

const GearDescriptions: GearDescriptionTranslations = {
  gear_druid: `
    Staff or knife, one item of your choice from the list of trade goods
    (see page 182 in the Player's Handbook)
  `,
  gear_fighter: `
    A one-handed weapon of your choice, studded leather armor, one item of
    your choice from the list of trade goods
    (see page 182 in the Player's Handbook)
  `,
  gear_hunter: `
    Bow or sling, two items of your choice from the list of trade goods
    (see page 182 in the Player's Handbook)
  `,
  gear_minstrel: `
    Lute or flute, knife, one item of your choice from the list of trade goods
    (see page 182 in the Player's Handbook)
  `,
  gear_peddler: `
    Knife, three items of your choice from the list of trade goods
    (see page 182 in the Player's Handbook)
  `,
  gear_rider: `
    A riding horse (choose one from the Forbidden Lands custom card deck if you
    have it), spear or handaxe, short bow or sling, one item of your choice from
    the list of trade goods
    (see page 182 in the Player's Handbook)
  `,
  gear_rogue: `
    Dagger, two items of your choice from the list of trade goods
    (see page 182 in the Player's Handbook)
  `,
  gear_sorcerer: `
    Staff or knife, one item of your choice from the list of trade goods
    (see page 182 in the Player's Handbook)
  `,
}

export default {
  ...age,
  ...attributes,
  ...kin,
  ...professions,
  ...skills,
  ...talents,
  ...talents2,
  ...GearDescriptions,

  "Appearance": "Appearance",
  "Arrows": "Arrows",
  "Base data": "Base data",
  "Body": "Body",
  "Class talent": "Class talent",
  "Class talents": "Class talents",
  "Clothing": "Clothing",
  "D": "D",
  "Dark secret": "Dark secret",
  "Face": "Face",
  "Female": "Female",
  "Food": "Food",
  "Gear": "Gear",
  "General talent": "General talent",
  "General talents": "General talents",
  "General": "General",
  "Kin talent": "Kin talent",
  "Kin": "Kin",
  "Male": "Male",
  "Miscellaneous": "Miscellaneous",
  "Name": "Name",
  "Pride": "Pride",
  "Profession": "Profession",
  "Relationships": "Relationships",
  "Remaining": "Återstående",
  "Reputation": "Reputation",
  "Roll dice before session starts": "Roll dice before session starts",
  "Starting gear": "Starting gear",
  "Talent": "Talent",
  "Torches": "Torches",
  "Water": "Water",
  "female": "female",
  "hello": "hello en",
  "male": "male",
  "message": "hello i18n !!",
  "name": "name",
  "sex": "sex",

  // Foo
}
