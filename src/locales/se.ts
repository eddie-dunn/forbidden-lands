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
  druid: "druid",
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

  alderlander: "alderlänning",
  aslene: "aslen",
  ailander: "eländer",
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
  "ambidextrous": "dubbelhänt",
  "axe fighter": "yxkämpe",
  "berserker": "bärsärk",
  "bowyer": "bågmakare",
  "brawler": "slagskämpe",
  "builder": "byggare",
  "chef": "kock",
  "cold blooded": "kallblodig",
  "defender": "defensiv",
  "dragonslayer": "drakdräpare",
  "executioner": "bödel",
  "fast footwork": "hal som en ål",
  "fast shooter": "snabbskytt",
  "fearless": "orädd",
  "firm grip": "järngrepp",
  "fisher": "fiskare",
  "hammer fighter": "hammarkämpe",
  "herbalist": "örtakännare",
  "horseback fighter": "ryttarkämpe",
  "incorruptible": "omutlig",
  "knife fighter": "knivkämpe",
  "lightning fast": "blixtsnabb",
  "lockpicker": "låsdyrkare",
  "lucky": "tursam",
  "master of the hunt": "jaktmästare",
  "melee charge": "stormare",
  "pack rat": "packåsna",
  "pain resistant": "smärttålig",
  "pathfinder": "stigfinnare",
  "poisoner": "giftkokare",
  "quartermaster": "kvartermästare",
  "quickdraw": "snabbdrag",
  "sailor": "skeppare",
  "sharpshooter": "prickskytt",
  "sharp tongue": "vass tunga",
  "shield fighter": "sköldkämpe",
  "sixth sense": "ögon i nacken",
  "smith": "smed",
  "spear fighter": "spjutkämpe",
  "steady feet": "stadig på foten",
  "sword fighter": "svärdskämpe",
  "tailor": "skräddare",
  "tanner": "garvare",
  "threatening": "hotfull",
  "throwing arm": "kastarm",
  "wanderer": "vandrare",

  // Druid
  "Path of Healing": "Helandets Väg",
  "Path of Shifting Shapes": "Hamnskiftets Väg",
  "Path of Sight": "Synens Väg",

  // Fighter
  "Path of the Blade": "Klingans Väg",
  "Path of the Enemy": "Fiendens Väg",
  "Path of the Shield": "Sköldens Väg",

  // HUNTER
  "Path of the Arrow": "Pilens Väg",
  "Path of the Beast": "Djurets Väg",
  "Path of the Forest": "Skogens Väg",

  // MINSTREL
  "Path of the Hymn": "Hymnens Väg",
  "Path of the Song": "Stämmans Väg",
  "Path of the Warcry": "Stridsropets Väg",

  // Peddler
  "Path of Gold": "Guldets Väg",
  "Path of Lies": "Lögnens Väg",
  "Path of Many Things": "Kappsäckens Väg",

  // Rider
  "Path of the Companion": "Följeslagarens Väg",
  "Path of the Knight": "Riddarens Väg",
  "Path of the Plains": "Viddernas Väg",

  // Rogue
  "Path of the Face": "Ansiktets Väg",
  "Path of the Killer": "Mördarens Väg",
  "Path of Poison": "Giftets Väg",

  // Sorcerer
  "Path of Blood": "Blodets Väg",
  "Path of Death": "Dödens Väg",
  "Path of Signs": "Tecknets Väg",
  "Path of Stone": "Stenens Väg",
}

const talents = {
  // Kin
  TRUE_GRIT: "Bita ihop", // dwarf
  INNER_PEACE: "Inre frid", // elf
  SNEAKY: "Lömsk", // goblin
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
  WANDERER: "Vandrare",

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
  ...talents2,
  ...GearDescriptions,

  "CONFIRM_DELETE_CHAR": "Vill du verkligen radera din rollperson?",

  "About": "Om",
  "Activate": "Aktivera",
  "Active": "Aktiva",
  "Add XP/Reputation": "Öka ERF/Rykte",
  "Add item": "Lägg till Ägodel",
  "Add talent": "Lägg till talang",
  "Add": "Lägg till",
  "Appearance": "Utseende",
  "Armor": "Rustning",
  "Armslength": "Armslängd",
  "Arrows": "Pilar",
  "Artifact dice": "Artefakttärningar",
  "Attributes": "Grundegenskaper",
  "Base data": "Grunddata",
  "Basic dice": "Grundtärningar",
  "Body": "Kropp",
  "Cancel": "Avbryt",
  "Carried by mount": "Buret av riddjur",
  "Characters": "Rollpersoner",
  "Choose": "Välj",
  "Class talent": "Yrkestalang",
  "Class talents": "Yrkestalanger",
  "Close": "Stäng",
  "Clothing": "Klädsel",
  "Coins": "Mynt",
  "Cold": "Nedkyld",
  "Confirm": "Bekräfta",
  "Comment": "Kommentar",
  "Conditions": "Tillstånd",
  "Consumables": "Förbrukningsvaror",
  "Create new character": "Skapa ny rollperson",
  "D": "T",
  "Damage": "Skada",
  "Dark secret": "Mörk hemlighet",
  "Deactivate": "Gör inaktiv",
  "Dehydrated": "Uttorkad",
  "Delete": "Ta bort",
  "Dice": "Tärningar",
  "Drop": "Släng",
  "Edit": "Redigera",
  "Encumbrance": "Belastning",
  "Enter external URL...": "Extern URL",
  "Experience gained": "Ökning erfarenhet",
  "Experience": "Erfarenhet",
  "Face": "Ansikte",
  "Features": "Egenskaper",
  "Female": "Kvinna",
  "Food": "Mat",
  "Gallery": "Galleri",
  "Gear": "Utrustning",
  "General talent": "Allmän talang",
  "General talents": "Allmänna talanger",
  "General": "Allmän",
  "Get from URL": "Hämta från URL",
  "Get": "Hämta",
  "Heavy": "Tung",
  "Helmet": "Hjälm",
  "Inactive": "Inaktiva",
  "Inventory": "Ägodelar",
  "Kin talent": "Släktestalang",
  "Kin": "Släkte",
  "Light": "Lätt",
  "List": "Lista",
  "Long": "Lång",
  "Male": "Man",
  "Miscellaneous": "Övrigt",
  "Mount": "Riddjur",
  "Mounted": "Ridande",
  "Move to backpack": "Flytta till ryggsäck",
  "Move to mount": "Flytta till riddjur",
  "Move": "Flytta",
  "Name": "Namn",
  "Near": "Nära",
  "New": "Nya",
  "Notes": "Anteckningar",
  "Open": "Öppna",
  "Other": "Annat",
  "Personality": "Personlighet",
  "Please select the following in": "Vänligen välj följande i",
  "Portrait": "Porträtt",
  "Post session": "Efter session",
  "Pre/post session": "Inför/efter session",
  "Pride": "Stolthet",
  "Profession": "Yrke",
  "Protection": "Skydd",
  "Push": "Pressa",
  "Range": "Räckvidd",
  "Relationships": "Relationer",
  "Remaining": "Återstående",
  "Remove": "Ta bort",
  "Reputation gained": "Ökning rykte",
  "Reputation": "Rykte",
  "Reset": "Återställ",
  "Roll dice": "Rulla",
  "Save & Close": "Spara & Stäng",
  "Save": "Spara",
  "Select picture": "Välj bild",
  "Select talent": "Välj talang",
  "Shield": "Sköld",
  "Short": "Kort",
  "Spend XP": "Spendera ERF",
  "Starting gear": "Utrustning vid start",
  "Starving": "Utsvulten",
  "Talent": "Talang",
  "Tiny": "Småsak",
  "Tired": "Sömnlös",
  "Torches": "Facklor",
  "Total spent": "Spenderat totalt",
  "Type": "Typ",
  "View": "Visa",
  "Water": "Vatten",
  "Weapon": "Vapen",
  "Weapons": "Vapen",
  "Weight": "Vikt",
  "Willpower": "Kraftpoäng",
  "XP": "ERF",

  // Lowercase
  "armslength": "armslängd",
  "blunt": "trubbig",
  "childhood": "uppväxt",
  "create from template": "skapa från mall",
  "edged": "egg",
  "female": "kvinna",
  "formative event": "livshändelse",
  "hook": "krok",
  "long": "lång",
  "male": "man",
  "near": "nära",
  "parrying": "parera",
  "pointed": "spets",
  "sex": "kön",
  "short": "kort",
  "slow_loading": "långsam",
  "talents": "talanger",

  // Param
  "PHB_ref": "Sida {page} i Spelarhandboken",

  // Long
  "Roll dice before session starts":
    "Kasta tärning efter att karaktären skapats",
  "XP_DESCR": `
    Du får dina ERF efter spelmötets slut. Ta ett eftersnack och låt hela
    spelbordet diskutera. För varje fråga nedan du kan svara ja på vinner du en
    ERF:

    Har du deltagit i spelmötet?

    Har du färdats genom minst en hexruta på kartan där ni inte har varit förut?

    Har du upptäckt en ny äventyrsplats?

    Har du besegrat ett eller flera monster?

    Har du hittat en skatt (värd minst 1 guld)?

    Har du givit en annan äventyrare en värdig begravning?

    Har du byggt en funktion i ert fäste?

    Har du aktiverat din stolthet?

    Har du påverkats av din mörka hemlighet?

    Har du riskerat livet för någon annan?

    Har du utfört en extraordinär handling som inte täcks av ovanstående frågor?
  `,
  "REP_DESCR": `
    Under spelets lopp kan ditt värde i Rykte öka. Efter ett spelpass där du
    har utfört ett (eller flera) stordåd av något slag, en handling som blev
    bevittnad och som kommer att omtalas i flera år framöver, ökar ditt Rykte
    ett steg. Vad som räknas som ett stordåd är upp till SL, men här följer
    några exempel:

    En viktig SLP dödades eller räddades från en säker död.

    Ett fruktat monster besegrades.

    En legendarisk artefakt hittades eller stals.

    Dådet förändrade permanent situationen i en äventyrsplats

    Dådet kommer att få betydande kon sekvenser för någon av makterna i Det
    glömda landet.

    Ni har byggt en viktig funktion i ert fäste (sid 156).
  `,
  "CONFIRM_ACTIVATE_INVALID_CHAR": `
    Din rollperson uppfyller inte reglerna för skapande av en ny rollperson.
    Är du säker på att du vill aktivera den?
  `,
  "Confirm activate": "Bekräfta aktivering",
}
