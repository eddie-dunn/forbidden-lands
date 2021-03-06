import {
  AgeTranslations,
  AttributeTranslations,
  GearDescriptionTranslations,
  KinTranslations,
  ProfessionTranslations,
  SkillTranslations,
  TalentTranslations,
} from "./localetypes"
import {
  ICombatAction,
  ACTION_FAST,
  ACTION_SLOW,
} from "@/data/combat/typesCombat"

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

const talents: TalentTranslations = {
  // Kin
  "True Grit": "True grit", // dwarf
  "Inner Peace": "Inner peace", // elf
  "Sneaky": "Sneaky", // goblin
  "Psychic Power": "Psychic power", // half-elf
  "Hard to Catch": "Hard to catch", // halfling
  "Adaptive": "Adaptive", // human
  "Unbreakable": "Unbreakable", // orc
  "Hunting Instincts": "Hunting instincts", // wolfkin

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
  "quickdraw": "quick draw",
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
  "pike": "pike",
  "plate armor": "plate armor",
  "rock": "rock",
  "scimitar": "scimitar",
  "short bow": "short bow",
  "short spear": "short spear",
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
  "wooden club": "wooden club",
}

const combatActionsSlow: { [value in ACTION_SLOW]: string } = {
  "": "",
  "action-break_free": "break free",
  "action-cast": "cast spell",
  "action-charge": "charge",
  "action-crawl": "crawl",
  "action-flee": "flee",
  "action-grapple": "grapple",
  "action-persuade": "persuade",
  "action-shoot": "shoot",
  "action-slash": "slash",
  "action-stab": "stab",
  "action-taunt": "taunt",
  "action-unarmed_attack": "unarmed attack",
}

const combatActionsFast: { [value in ACTION_FAST]: string } = {
  "": "",
  "action-aim": "aim",
  "action-disarm": "disarm",
  "action-dodge": "dodge",
  "action-draw_weapon": "draw weapon",
  "action-feint": "feint",
  "action-get_up": "get up",
  "action-grapple_attack": "grapple attack",
  "action-parry": "parry",
  "action-power_word": "power word",
  "action-ready_weapon": "ready weapon",
  "action-retreat": "retreat",
  "action-run": "run",
  "action-shove": "shove",
  "action-swing_weapon": "swing weapon",
  "action-use_item": "use item",
}

const keyedTranslations = {
  ATTRIB_REMAINING: "Current",
  CONFIRM_DELETE_CHAR: "Are you sure you wish to delete this character?",
  PHB_ref: "Page {page} in the Player's Handbook",
  GENERATE_DOWNLOAD_LINK: "Genererate download link",
}

const multiLine = {
  "Roll dice before session starts": "Roll dice before session starts",
  "XP_DESCR": `
    You receive XP after the end of each game session. Talk it through and let
    the whole group discuss what has happened. For each of the below questions
    that you can reply ???yes??? to, you get one XP:

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
  "IMPORT_WARNING":
    "Warning: Importing a backup will replace all your current settings and characters",
}

const mixedCase = {
  "About FLC": "About FLC",
  "About": "About",
  "Activate": "Activate",
  "Active": "Active",
  "Add XP/Reputation": "Add XP/Reputation",
  "Add item": "Add item",
  "Add talent": "Add Talent",
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
  "Carried by mount": "Carried by mount",
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
  "Delete": "Delete",
  "Details": "Details",
  "Dice roller": "Dice roller",
  "Dice": "Dice",
  "Download data": "Download data",
  "Drop": "Drop",
  "Edit": "Edit",
  "Encumbrance": "Encumbrance",
  "Enter external URL": "Enter external URL",
  "Experience gained": "Experience gained",
  "Experience": "Experience",
  "Face": "Face",
  "Features": "Features",
  "Female": "Female",
  "Filter": "Filter",
  "Food": "Food",
  "Forbidden Lands Companion": "Forbidden Lands Companion",
  "Gallery": "Gallery",
  "Gear": "Gear",
  "General talent": "General talent",
  "General talents": "General talents",
  "General": "General",
  "Get from URL": "Get from URL",
  "Get": "Get",
  "Heavy": "Heavy",
  "Helmet": "Helmet",
  "Import backup": "Import backup",
  "Inactive": "Inactive",
  "Inventory": "Inventory",
  "Kin talent": "Kin talent",
  "Kin": "Kin",
  "Language": "Language",
  "Light": "Light",
  "Long": "Long",
  "Male": "Male",
  "Miscellaneous": "Miscellaneous",
  "Mount": "Mount",
  "Mounted": "Mounted",
  "Move to backpack": "Move to backpack",
  "Move to mount": "Move to mount",
  "Multiplay": "Multiplay",
  "Multiplayer": "Multiplayer",
  "Name": "Name",
  "Near": "Near",
  "New": "New",
  "Next": "Next",
  "None selected": "None selected",
  "Notes": "Notes",
  "Options": "Options",
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
  "Sandbox": "Sandbox",
  "Save & Close": "Save & Close",
  "Save": "Save",
  "Select import file": "Select import file",
  "Select picture": "Select picture",
  "Select talent": "Select talent",
  "Shield": "Shield",
  "Short": "Short",
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
  "Use gear": "Use gear",
  "View": "View",
  "WP": "WP",
  "Water": "Water",
  "Weapon": "Weapon",
  "Weapons": "Weapons",
  "Weight": "Weight",
  "Willpower": "Willpower",
  "XP": "XP",
}

const lowercase = {
  "action": "action",
  "animal companion": "animal companion",
  "armor": "armor",
  "armslength": "arm's length",
  "artifact": "artifact",
  "attribute": "attribute",
  "axe": "axe",
  "blunt": "blunt",
  "bonus": "bonus",
  "bow": "bow",
  "category": "category",
  "character": "character",
  "childhood": "childhood",
  "combat": "combat",
  "combat-action-fast": "fast action",
  "combat-action-fast-performed": "fast action performed",
  "combat-action-slow": "slow action",
  "combat-action-slow-performed": "slow action performed",
  "confirm": "confirm",
  "create from template": "create from template",
  "crossbow": "crossbow",
  "description": "description",
  "dmg": "dmg",
  "edged": "edged",
  "epic": "epic",
  "female": "female",
  "fighting monster": "fighting monster",
  "formative event": "formative event",
  "helmets": "helmets",
  "hook": "hook",
  "humanoid": "humanoid",
  "initiative": "initiative",
  "item": "item",
  "knife": "knife",
  "legendary": "legendary",
  "long": "long",
  "male": "male",
  "melee weapons": "melee weapons",
  "mighty": "mighty",
  "monster": "monster",
  "movement rate": "movement rate",
  "name": "name",
  "near": "near",
  "next round": "next round",
  "no character": "no character",
  "no suitable weapon equipped": "no suitable weapon equipped",
  "none": "none",
  "opponent": "target",
  "options": "options",
  "or more": "or more",
  "other": "other",
  "parry": "parry",
  "parrying": "parrying",
  "pointed": "pointed",
  "polearm": "spear",
  "probability": "probability",
  "properties": "properties",
  "ranged weapons": "ranged weapons",
  "select character": "select character",
  "sex": "sex",
  "shields": "shields",
  "short": "short",
  "skill": "skill",
  "slow_loading": "slow loading",
  "sword": "sword",
  "talents": "talents",
  "thrown": "thrown",
  "unarmed": "unarmed",
}

export default {
  ...age,
  ...attributes,
  ...kin,
  ...professions,
  ...skills,
  ...talents,
  ...GearDescriptions,
  ...weapons,
  ...combatActionsFast,
  ...combatActionsSlow,
  ...keyedTranslations,
  ...mixedCase,
  ...lowercase,
  ...multiLine,
}
