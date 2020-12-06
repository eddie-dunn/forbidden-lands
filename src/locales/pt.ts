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
}
