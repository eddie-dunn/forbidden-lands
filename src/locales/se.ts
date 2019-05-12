import {
  AgeTranslations,
  AttributeTranslations,
  GearDescriptionTranslations,
  KinTranslations,
  ProfessionTranslations,
  SkillTranslations,
} from "./localetypes"

const age: AgeTranslations = {
  "age": "ålder",
  "adult": "medelålders",
  "old": "gammal",
  "young": "ung",
  "": "?",
}

const attributes: AttributeTranslations = {
  agility: "smidighet",
  attributes: "grundegenskaper",
  empathy: "karisma",
  strength: "styrka",
  wits: "intelligens",
}

const professions: ProfessionTranslations = {
  druid: "Druid",
  fighter: "krigare",
  hunter: "jägare",
  minstrel: "skald",
  peddler: "nasare",
  rider: "ryttare",
  rogue: "tjuv",
  sorcerer: "magiker",
}

const kin: KinTranslations = {
  kin: "släkte",
  dwarf: "dvärg",
  elf: "alv",
  goblin: "svartalf",
  halfelf: "halvalv",
  halfling: "halvling",
  human: "människa",
  orc: "orch",
  wolfkin: "vargfolk",
}

const skills: SkillTranslations = {
  "skills": "färdigheter",
  "animal handling": "djurhantering",
  "crafting": "hantverk",
  "endurance": "uthållighet",
  "healing": "läkekonst",
  "insight": "genomskåda",
  "lore": "bildning",
  "manipulation": "manipulera",
  "marksmanship": "skytte",
  "melee": "närkamp",
  "might": "styrkeprov",
  "move": "rörlighet",
  "performance": "skaldekonst",
  "scouting": "speja",
  "sleight of hand": "fingerfärdighet",
  "stealth": "smyga",
  "survival": "överlevnad",
}

const talents = {
  // Kin
  TRUE_GRIT: "Bita ihop", // dwarf
  INNER_PEACE: "Inre frid", // elf
  SNEAKY: "Sneaky", // goblin
  PSYCHIC_POWER: "Psykisk kraft", // half-elf
  HARD_TO_CATCH: "Kvickfotad", // halfling
  ADAPTIVE: "Adaptiv", // human
  UNBREAKABLE: "Stryktålig", // orc
  HUNTING_INSTINCTS: "Jaktsinne", // wolfkin

  // General
  AMBIDEXTROUS: "Dubbelhänt",
  AXE_FIGHTER: "Yxkämpe",
  BERSERKER: "Bärsärk",
  BOWYER: "Bågmakare",
  BRAWLER: "Slagskämpe",
  BUILDER: "Byggare",
  CHEF: "Kock",
  COLD_BLOODED: "Kallblodig",
  DEFENDER: "Defensiv",
  DRAGONSLAYER: "Drakdräpare",
  EXECUTIONER: "Bödel",
  FAST_FOOTWORK: "Hal som en ål",
  FAST_SHOOTER: "Snabbskytt",
  FEARLESS: "Orädd",
  FIRM_GRIP: "Järngrepp",
  FISHER: "Fiskare",
  HAMMER_FIGHTER: "Hammarkämpe",
  HERBALIST: "Örtakännare",
  HORSEBACK_FIGHTER: "Ryttarkämpe",
  INCORRUPTIBLE: "Omutlig",
  KNIFE_FIGHTER: "Knivkämpe",
  LIGHTNING_FAST: "Blixtsnabb",
  LOCKPICKER: "Låsdyrkare",
  LUCKY: "Tursam",
  MASTER_OF_THE_HUNT: "Jaktmästare",
  MELEE_CHARGE: "Stormare",
  PACK_RAT: "Packåsna",
  PAIN_RESISTANT: "Smärttålig",
  PATHFINDER: "Stigfinnare",
  POISONER: "Giftkokare",
  QUARTERMASTER: "Kvartermästare",
  QUICKDRAW: "Snabbdrag",
  SAILOR: "Skeppare",
  SHARPSHOOTER: "Prickskytt",
  SHARP_TONGUE: "Vass tunga",
  SHIELD_FIGHTER: "Sköldkämpe",
  SIXTH_SENSE: "Ögon i nacken",
  SMITH: "Smed",
  SPEAR_FIGHTER: "Spjutkämpe",
  STEADY_FEET: "Stadig på foten",
  SWORD_FIGHTER: "Svärdskämpe",
  TAILOR: "Skräddare",
  TANNER: "Garvare",
  THREATENING: "Hotfull",
  THROWING_ARM: "Kastarm",
  WANDERER: "Stigfinnare",

  // Druid
  PATH_OF_HEALING: "Helandets Väg",
  PATH_OF_SHIFTING_SHAPES: "Hamnskiftets Väg",
  PATH_OF_SIGHT: "Synens Väg",

  // Fighter
  PATH_OF_THE_BLADE: "Klingans Väg",
  PATH_OF_THE_ENEMY: "Fiendens Väg",
  PATH_OF_THE_SHIELD: "Sköldens Väg",

  // HUNTER
  PATH_OF_THE_ARROW: "Pilens Väg",
  PATH_OF_THE_BEAST: "Djurets Väg",
  PATH_OF_THE_FOREST: "Skogens Väg",

  // MINSTREL
  PATH_OF_THE_HYMN: "Hymnens Väg",
  PATH_OF_THE_SONG: "Stämmans Väg",
  PATH_OF_THE_WARCRY: "Stridsropets Väg",

  // Peddler
  PATH_OF_GOLD: "Guldets Väg",
  PATH_OF_LIES: "Lögnens Väg",
  PATH_OF_MANY_THINGS: "Kappsäckens Väg",

  // Rider
  PATH_OF_THE_COMPANION: "Följeslagarens Väg",
  PATH_OF_THE_KNIGHT: "Riddarens Väg",
  PATH_OF_THE_PLAINS: "Viddernas Väg",

  // Rogue
  PATH_OF_THE_FACE: "Ansiktets Väg",
  PATH_OF_THE_KILLER: "Mördarens Väg",
  PATH_OF_POISON: "Giftets Väg",

  // Sorcerer
  PATH_OF_BLOOD: "Blodets Väg",
  PATH_OF_DEATH: "Dödens Väg",
  PATH_OF_SIGNS: "Tecknets Väg",
  PATH_OF_STONE: "Stenens Väg",
}

const GearDescriptions: GearDescriptionTranslations = {
  gear_druid: `
    Stav eller kniv, ett valfritt föremål ur listan över bruksföremål
    (s 176 i Spelarboken).
  `,
  gear_fighter: `
    Valfritt enhandsvapen, nitläder, ett valfritt föremål ur listan över
    bruksföremål
    (s 176 i Spelarboken)
  `,
  gear_hunter: `
    Valfri pilbåge eller slunga, kniv, två valfria föremål ur listan över
    bruksföremål
    (s 176 i Spelarboken).
  `,
  gear_minstrel: `
    Lyra eller flöjt, kniv, ett föremål ur listan över bruksföremål
    (s 176 i Spelarboken).
  `,
  gear_peddler: `
    Kniv, tre valfria föremål ur listan över bruksföremål
    (s 176 i Spelarboken).
  `,
  gear_rider: `
    Ridhäst (välj en ur kortleken till Svärdets sång om ni har den), spjut
    eller yxa, kortbåge eller slunga, ett valfritt föremål ur listan över
    bruksföremål
    (s 176 i Spelarboken).
  `,
  gear_rogue: `
    Dolk, två valfria föremål ur listan över bruksföremål
    (s 176 i Spelarboken).
  `,
  gear_sorcerer: `
    Stav eller kniv, ett valfritt föremål ur listan över bruksföremål
    (s 176 i Spelarboken).
  `,
}

export default {
  ...age,
  ...attributes,
  ...kin,
  ...professions,
  ...skills,
  ...talents,
  ...GearDescriptions,

  "Appearance": "Utseende",
  "Arrows": "Pilar",
  "Base data": "Grunddata",
  "Body": "Kropp",
  "Class talent": "Yrkestalang",
  "Class talents": "Yrkestalanger",
  "Clothing": "Klädsel",
  "D": "T",
  "Dark secret": "Mörk hemlighet",
  "Face": "Ansikte",
  "Female": "Kvinna",
  "Food": "Mat",
  "Gear": "Utrustning",
  "General talent": "Allmän talang",
  "General talents": "Allmänna talanger",
  "Kin talent": "Släktestalang",
  "Male": "Man",
  "Name": "Namn",
  "Please select the following in": "Vänligen välj följande i",
  "Portrait": "Porträtt",
  "Pride": "Stolthet",
  "Profession": "Yrke",
  "Relationships": "Relationer",
  "Remaining": "Återstående",
  "Reputation": "Rykte",
  "Roll dice": "Kasta tärning",
  "Starting gear": "Utrustning vid start",
  "Torches": "Facklor",
  "Water": "Vatten",
  "female": "kvinna",
  "male": "man",
  "sex": "kön",
  "talents": "talanger",

  "Roll dice before session starts":
    "Kasta tärning efter att karaktären skapats",
}
