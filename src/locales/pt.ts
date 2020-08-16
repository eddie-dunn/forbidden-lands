import {
  AgeTranslations,
  AttributeTranslations,
  GearDescriptionTranslations,
  KinTranslations,
  ProfessionTranslations,
  SkillTranslations,
  TalentTranslations,
} from "./localetypes"
import en from "./en"

const age: AgeTranslations = {
  "age": "idade",
  "adult": "adulto",
  "old": "idoso",
  "young": "jovem",
  "": "?",
}

const professions: ProfessionTranslations = {
  sorcerer: "feiticeiro",
  druid: "druida",
  fighter: "guerreiro",
  hunter: "caçador",
  minstrel: "menestrel",
  peddler: "mascate",
  rider: "cavaleiro",
  rogue: "ladrão",
}

const attributes: AttributeTranslations = {
  attributes: "atributos",
  agility: "agilidade",
  empathy: "empatia",
  strength: "força",
  wits: "perspicácia",
}

const kin: KinTranslations = {
  kin: "parentesco",
  dwarf: "anão",
  elf: "elfo",
  goblin: "goblin",
  halfelf: "meio-elfo",
  halfling: "halfling",
  human: "humano",
  orc: "orc",
  wolfkin: "lupino",

  alderlander: "alderlander",
  aslene: "aslene",
  ailander: "ailander",
}

const talents: TalentTranslations = {
  // Kin
  "True Grit": "Verdadeira coragem", // dwarf
  "Inner Peace": "Paz interior", // elf
  "Sneaky": "Furtivo", // goblin
  "Psychic Power": "Poder psíquico", // half-elf
  "Hard to Catch": "Difícil de apanhar", // halfling
  "Adaptive": "Adaptável", // human
  "Unbreakable": "Inquebrável", // orc
  "Hunting Instincts": "Instintos de Caçador", // wolfkin

  "ambidextrous": "Ambidestro",
  "axe fighter": "Lutador de Machados",
  "berserker": "Berserker",
  "bowyer": "Bowyer",
  "brawler": "Brigão",
  "builder": "Construtor",
  "chef": "Chef",
  "cold blooded": "Sangue Frio",
  "defender": "Defensor",
  "dragonslayer": "Matador de Dragões",
  "executioner": "Carrasco",
  "fast footwork": "Fast Footwork",
  "fast shooter": "Atirador Rápido",
  "fearless": "Destemido",
  "firm grip": "Pulso firme",
  "fisher": "Pescador",
  "hammer fighter": "Lutador de Martelos",
  "herbalist": "Herborista",
  "horseback fighter": "Lutador a Cavalos",
  "incorruptible": "Incorruptível",
  "knife fighter": "Lutador de Facas",
  "lightning fast": "Rápido como Relâmpago",
  "lockpicker": "Arrombador",
  "lucky": "Sortudo",
  "master of the hunt": "Mestre da Caça",
  "melee charge": "Carga corpo a corpo",
  "pack rat": "pack rat",
  "pain resistant": "Resistente a dor",
  "pathfinder": "Desbravador",
  "poisoner": "Envenenador",
  "quartermaster": "quartermaster",
  "quickdraw": "Quickdraw",
  "sailor": "Marinheiro",
  "sharpshooter": "Bom atirador",
  "sharp tongue": "Língua Afiada",
  "shield fighter": "Lutador com Escudos",
  "sixth sense": "Sexto Sentido",
  "smith": "Ferreiro",
  "spear fighter": "Lutador com Lanças",
  "steady feet": "Pés firmes",
  "sword fighter": "Lutador de Espadas",
  "tailor": "Alfaiate",
  "tanner": "Curtidor",
  "threatening": "Ameaçador",
  "throwing arm": "Braço Arremessador",
  "wanderer": "Andarilho",

  // Druid
  "Path of Healing": "Caminho da Cura",
  "Path of Shifting Shapes": "Caminho da Mudança de Forma",
  "Path of Sight": "Caminho da Visão",

  // Fighter
  "Path of the Blade": "Caminho da Lâmina",
  "Path of the Enemy": "Caminho dos Inimigo",
  "Path of the Shield": "Caminho do Escudo",

  // HUNTER
  "Path of the Arrow": "Caminho da Flecha",
  "Path of the Beast": "Caminho da Besta",
  "Path of the Forest": "Caminho da Floresta",

  // MINSTREL
  "Path of the Hymn": "Caminho do Hino",
  "Path of the Song": "Caminho da Canção",
  "Path of the Warcry": "Caminho do Grito de Guerra",

  // Peddler
  "Path of Gold": "Caminho do Ouro",
  "Path of Lies": "Caminho das Mentiras",
  "Path of Many Things": "Caminho de Muitas Coisas",

  // Rider
  "Path of the Companion": "Caminho do Companheiro",
  "Path of the Knight": "Caminho do Cavaleiro",
  "Path of the Plains": "Caminho das Planícies",

  // Rogue
  "Path of the Face": "Caminho do Rosto",
  "Path of the Killer": "Caminho do Assassino",
  "Path of Poison": "Caminho do Veneno",

  // Sorcerer
  "Path of Blood": "Caminho do Sangue",
  "Path of Death": "Caminho da Morte",
  "Path of Signs": "Caminho dos Sinais",
  "Path of Stone": "Caminho da Pedra",
}

const skills: SkillTranslations = {
  "skills": "Habilidades",
  "animal handling": "Trato com Animais",
  "crafting": "Criação",
  "endurance": "Resistência",
  "healing": "Cura",
  "insight": "Percepção",
  "lore": "Tradição",
  "manipulation": "Manipulação",
  "marksmanship": "Pontaria",
  "melee": "Corpo a corpo",
  "might": "Poder",
  "move": "Mover",
  "performance": "Desempenho",
  "scouting": "Patrulhar",
  "sleight of hand": "Truques",
  "stealth": "Furtividade",
  "survival": "Sobrevivência",
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
  ...en, // Adding English strings for convenience; comment out to test missing translations

  ...age,
  ...attributes,
  ...kin,
  ...professions,
  ...skills,
  ...talents,
  ...GearDescriptions,
  ...weapons,

  // Mixed case

  "About FLC": "About FLC",
  "About": "About",
  "Activate": "Activate",
  "Active": "Active",
  "Add XP/Reputation": "Add XP/Reputation",
  "Add item": "Add item",
  "Add": "Add",
  "Add talent": "Add Talent",
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
  "blunt": "blunt",
  "character": "character",
  "childhood": "childhood",
  "confirm": "confirm",
  "create from template": "create from template",
  "dmg": "dmg",
  "edged": "edged",
  "epic": "epic",
  "female": "female",
  "formative event": "formative event",
  "helmets": "helmets",
  "hook": "hook",
  "legendary": "legendary",
  "long": "long",
  "male": "male",
  "melee weapons": "melee weapons",
  "mighty": "mighty",
  "movement rate": "movement rate",
  "name": "name",
  "near": "near",
  "no character": "no character",
  "or more": "or more",
  "other": "other",
  "parrying": "parrying",
  "pointed": "pointed",
  "probability": "probability",
  "properties": "properties",
  "ranged weapons": "ranged weapons",
  "select character": "select character",
  "sex": "sex",
  "shields": "shields",
  "short": "short",
  "slow_loading": "slow loading",
  "talents": "talents",

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
