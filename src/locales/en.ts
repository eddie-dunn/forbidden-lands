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

  alderlander: "alderlander",
  aslene: "aslene",
  ailander: "ailander",
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
  "True Grit": "True grit", // dwarf
  "Inner Peace": "Inner peace", // elf
  "Sneaky": "Sneaky", // goblin
  "Psychic Power": "Psychic power", // half-elf
  "Hard to Catch": "Hard to catch", // halfling
  "Adaptive": "Adaptive", // human
  "Unbreakable": "Unbreakable", // orc
  "Hunting Instincts": "Hunting insticts", // wolfkin

  "ambidextrous": "ambidextrous",
  "axe fighter": "axe fighter",
  "berserker": "berserker",
  "bowyer": "bowyer",
  "brawler": "brawler",
  "builder": "builder",
  "chef": "chef",
  "cold blooded": "cold blooded",
  "defender": "defender",
  "dragonslayer": "dragonslayer",
  "executioner": "executioner",
  "fast footwork": "fast footwork",
  "fast shooter": "fast shooter",
  "fearless": "fearless",
  "firm grip": "firm grip",
  "fisher": "fisher",
  "hammer fighter": "hammer fighter",
  "herbalist": "herbalist",
  "horseback fighter": "horseback fighter",
  "incorruptible": "incorruptible",
  "knife fighter": "knife fighter",
  "lightning fast": "lightning fast",
  "lockpicker": "lockpicker",
  "lucky": "lucky",
  "master of the hunt": "master of the hunt",
  "melee charge": "melee charge",
  "pack rat": "pack rat",
  "pain resistant": "pain resistant",
  "pathfinder": "pathfinder",
  "poisoner": "poisoner",
  "quartermaster": "quartermaster",
  "quickdraw": "snabbdrag",
  "sailor": "sailor",
  "sharpshooter": "sharpshooter",
  "sharp tongue": "sharp tongue",
  "shield fighter": "shield fighter",
  "sixth sense": "sixth sense",
  "smith": "smith",
  "spear fighter": "spear fighter",
  "steady feet": "steady feet",
  "sword fighter": "sword fighter",
  "tailor": "tailor",
  "tanner": "tanner",
  "threatening": "threatening",
  "throwing arm": "throwing arm",
  "wanderer": "wanderer",

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

const weapons = {
  "battleaxe": "battleaxe",
  "broadsword": "broadsword",
  "chainmail": "chainmail",
  "closed helmet": "closed helmet",
  "dagger": "dagger",
  "falchion": "falchion",
  "flail": "flail",
  "great helm": "great helm",
  "halberd": "halberd",
  "handaxe": "handaxe",
  "heavy crossbow": "heavy crossbow",
  "heavy warhammer": "heavy warhammer",
  "knife": "knife",
  "large shield": "large shield",
  "large wooden club": "large wooden club",
  "leather armor": "leather armor",
  "light crossbow": "light crossbow",
  "long spear": "long spear",
  "longbow": "longbow",
  "longsword": "longsword",
  "mace": "mace",
  "morningstar": "morningstar",
  "open helmet": "open helmet",
  "plate armor": "plate armor",
  "rock": "rock",
  "scimitar": "scimitar",
  "short bow": "short bow",
  "short spear": "short spear",
  "shortbow": "shortbow",
  "shortsword": "shortsword",
  "sling": "sling",
  "small shield": "small shield",
  "staff": "staff",
  "studded leather cap": "studded leather cap",
  "studded leather": "studded leather",
  "throwing axe": "throwing axe",
  "throwing knife": "throwing knife",
  "throwing spear": "throwing spear",
  "trident": "trident",
  "two handed axe": "two handed axe",
  "two handed sword": "two handed sword",
  "warhammer": "warhammer",
  "wodden club": "wooden club",
  "wooden club": "wooden club",
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
  ...weapons,

  // Mixed case

  "About FLC": "About FLC",
  "About": "About",
  "Active": "Active",
  "Add XP/Reputation": "Add XP/Reputation",
  "Add item": "Add item",
  "Add": "Add",
  "Appearance": "Appearance",
  "Armor": "Armor",
  "Armslength": "Arm's length",
  "Arrows": "Arrows",
  "Artifact dice": "Artifact dice",
  "Back": "Back",
  "Base data": "Base data",
  "Basic dice": "Basic dice",
  "Body": "Body",
  "Cancel": "Cancel",
  "Characters": "Characters",
  "Choose": "Choose",
  "Class talent": "Class talent",
  "Class talents": "Class talents",
  "Close": "Close",
  "Clothing": "Clothing",
  "Coins": "Coins",
  "Cold": "Cold",
  "Comment": "Comment",
  "Conditions": "Conditions",
  "Consumables": "Consumables",
  "Create new character": "Create new character",
  "Create": "Create",
  "D": "D",
  "Damage": "Damage",
  "Dark secret": "Dark secret",
  "Deactivate": "Deactivate",
  "Dehydrated": "Dehydrated",
  "Details": "Details",
  "Dice roller": "Dice roller",
  "Dice": "Dice",
  "Drop": "Drop",
  "Edit": "Edit",
  "Encumbrance": "Encumbrance",
  "Experience gained": "Experience gained",
  "Experience": "Experience",
  "Face": "Face",
  "Features": "Features",
  "Female": "Female",
  "Filter": "Filter",
  "Food": "Food",
  "Forbidden Lands Companion": "Forbidden Lands Companion",
  "Gear": "Gear",
  "General talent": "General talent",
  "General talents": "General talents",
  "General": "General",
  "Heavy": "Heavy",
  "Helmet": "Helmet",
  "Inventory": "Inventory",
  "Kin talent": "Kin talent",
  "Kin": "Kin",
  "Language": "Language",
  "Light": "Light",
  "Male": "Male",
  "Miscellaneous": "Miscellaneous",
  "Mount": "Mount",
  "Move to mount": "Move to mount",
  "Multiplay": "Multiplay",
  "Multiplayer": "Multiplayer",
  "Name": "Name",
  "New": "New",
  "Next": "Next",
  "Notes": "Notes",
  "Other": "Other",
  "Personality": "Personality",
  "Please select the following in": "Please select the following in",
  "Portrait": "Portrait",
  "Post session": "Post session",
  "Pride": "Pride",
  "Profession": "Profession",
  "Protection": "Protection",
  "Push": "Push",
  "Range": "Range",
  "Relationships": "Relationships",
  "Remaining": "Remaining",
  "Remove": "Remove",
  "Reputation gained": "Reputation gained",
  "Reputation": "Reputation",
  "Reset": "Reset",
  "Roll dice": "Roll dice",
  "Save": "Save",
  "Select import file": "Select import file",
  "Select talent": "Select talent",
  "Shield": "Shield",
  "Spend XP": "Spend XP",
  "Starting gear": "Starting gear",
  "Starving": "Starving",
  "Talent": "Talent",
  "Template": "Template",
  "Tiny": "Tiny",
  "Tired": "Tired",
  "Torches": "Torches",
  "Total spent": "Total spent",
  "Type": "Type",
  "View": "View",
  "Water": "Water",
  "Weapon": "Weapon",
  "Weapons": "Weapons",
  "Weight": "Weight",
  "Willpower": "Willpower",
  "XP": "XP",

  // lowercase

  "armor": "armor",
  "armslength": "arm's length",
  "attribute": "attribute",
  "childhood": "childhood",
  "create from template": "create from template",
  "dmg": "dmg",
  "female": "female",
  "formative event": "formative event",
  "hello": "hello en",
  "helmets": "helmets",
  "long": "long",
  "male": "male",
  "melee weapons": "melee weapons",
  "message": "hello i18n !!",
  "name": "name",
  "near": "near",
  "no character": "no character",
  "other": "other",
  "ranged weapons": "ranged weapons",
  "select character": "select character",
  "sex": "sex",
  "shields": "shields",
  "short": "short",
  "slow_loading": "slow loading",

  // Param
  "PHB_ref": "Page {page} in the Player's Handbook",

  // Key
  "CONFIRM_DELETE_CHAR": "Are you sure you wish to delete this character?",

  // Longer
  "Roll dice before session starts": "Roll dice before session starts",
  "XP_DESCR": `
    You receive XP after the end of each game session. Talk it through and let
    the whole group discuss what has happened. For each of the below questions
    that you can reply “yes” to, you get one XP:

    Did you participate in the game session? You get one XP just for being
    there.

    Did you travel through at least one hex on the game map that you had not
    visited before?

    Did you discover a new adventure site?

    Did you defeat one or more monsters?

    Did you find a treasure (1 gold or more)?

    Did you build a function in your stronghold?

    Did you activate your Pride?

    Did you suffer from your Dark Secret?

    Did you risk your life for another PC?

    Did you perform an extraordinary action of some kind?
  `,
  "REP_DESCR": `
    During the game, your Reputation score will increase. After a game
    session, if you have performed one or more great or terrible deeds of
    some kind, your Reputation score increases one point. What counts as a
    "great or terrible deed" is up to the GM, but here are some examples:

    A prominent NPC was killed, or saved from certain death.

    A feared monster was slain.

    A legendary treasure or artifact was found or stolen.

    The deed permanently altered the overall situation in an adventure site.

    The deed will have significant consequences for one of the major powers
    in the Forbidden Lands.

    You have built a certain function in your stronghold (see page 160).
  `,
  "CONFIRM_ACTIVATE_INVALID_CHAR": `
    Your character does not validate; are you sure you wish to activate it?
  `,
  "TEMPLATE_VALID_WARNING": `
    N.B: Creating a character from a template may result in a character that
    does not validate according to the character creation rules.

    However, even if the stats are invalid it is still possible to save and
    activate your character, should you wish to do so.
  `,
  "GENERATE_DOWNLOAD_LINK": "Genererate download link",
  "IMPORT_WARNING":
    "Warning: Importing a backup will replace all your current settings and characters",
}
