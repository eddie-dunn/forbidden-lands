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
import { ACTION_FAST, ACTION_SLOW } from "@/data/combat/typesCombat"

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

const talents: TalentTranslations = {
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

const templateGear = {
  // Shields
  "small shield": "liten sköld",
  "large shield": "stor sköld",
  // Helmets
  "studded leather cap": "nitläderhuva",
  "open helmet": "öppen hjälm",
  "closed helmet": "täckt hjälm",
  "great helm": "tunnhjälm",
  // Armor
  "leather armor": "läderrustning",
  "studded leather": "nitläder",
  "chainmail": "ringbrynja",
  "plate armor": "helrustning",
  // Ranged Weapons
  "rock": "sten",
  "throwing knife": "kastkniv",
  "throwing axe": "kastyxa",
  "throwing spear": "kastspjut",
  "sling": "slunga",
  "short bow": "kortbåge",
  "longbow": "långbåge",
  "light crossbow": "lätt armborst",
  "heavy crossbow": "tungt armborst",
  // Melee Weapons
  "knife": "kniv",
  "dagger": "dolk",
  "falchion": "huggare",
  "shortsword": "kortsvärd",
  "broadsword": "bredsdvärd",
  "longsword": "slagsvärd",
  "two handed sword": "tvåhandssvärd",
  "scimitar": "kroksabel",
  "handaxe": "handyxa",
  "battleaxe": "stridsyxa",
  "two handed axe": "tvåhandsyxa",
  "mace": "stridsklubba",
  "morningstar": "morgonstjärna",
  "warhammer": "stridshammare",
  "heavy warhammer": "tung stridshammare",
  "flail": "stridsgissel",
  "wooden club": "träklubba",
  "large wooden club": "stor träklubba",
  "staff": "trästav",
  "short spear": "kortspjut",
  "long spear": "långspjut",
  "halberd": "hillebard",
  "trident": "treudd",
  "pike": "pik",
}

const combatActionsSlow: { [value in ACTION_SLOW]: string } = {
  "action-break_free": "bryta grepp",
  "action-cast": "besvärja",
  "action-charge": "storma",
  "action-crawl": "krypa",
  "action-flee": "fly",
  "action-grapple": "grepp",
  "action-persuade": "övertala",
  "action-shoot": "avlossa",
  "action-slash": "hugg",
  "action-stab": "stöt",
  "action-taunt": "håna",
  "action-unarmed_attack": "slag/spark/bett",
  "": "",
}

const combatActionsFast: { [value in ACTION_FAST]: string } = {
  "action-aim": "sikta",
  "action-disarm": "avväpna",
  "action-dodge": "ducka",
  "action-draw_weapon": "drag vapen",
  "action-feint": "finta",
  "action-get_up": "resa sig",
  "action-grapple_attack": "tjuvnup",
  "action-parry": "parera",
  "action-power_word": "kraftord",
  "action-ready_weapon": "lägga an",
  "action-retreat": "retirera",
  "action-run": "springa",
  "action-shove": "knuffa",
  "action-swing_weapon": "tag sats",
  "action-use_item": "använda föremål",
  "": "",
}

const keyedTranslations = {
  PHB_ref: "Sida {page} i Spelarhandboken",
  ATTRIB_REMAINING: "Kvar",
  CONFIRM_DELETE_CHAR: "Vill du verkligen radera din rollperson?",
}

const multiLine = {
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
  "GENERATE_DOWNLOAD_LINK": "Generera nedladdningslänk",
  "IMPORT_WARNING":
    "Varning: En import skriver över alla dina nuvarande rollpersoner och inställningar",
}

const mixedCase = {
  "About FLC": "Om FLC",
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
  "Back": "Tillbaka",
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
  "Comment": "Kommentar",
  "Conditions": "Tillstånd",
  "Consumables": "Förbrukningsvaror",
  "Create new character": "Skapa ny rollperson",
  "Create": "Skapa",
  "D": "T",
  "Damage": "Skada",
  "Dark secret": "Mörk hemlighet",
  "Deactivate": "Gör inaktiv",
  "Dehydrated": "Uttorkad",
  "Delete": "Ta bort",
  "Details": "Detaljer",
  "Dice roller": "Kasta tärning",
  "Dice": "Tärningar",
  "Download data": "Ladda ner",
  "Drop": "Släng",
  "Edit": "Redigera",
  "Encumbrance": "Belastning",
  "Enter external URL": "Extern URL",
  "Experience gained": "Ökning erfarenhet",
  "Experience": "Erfarenhet",
  "Face": "Ansikte",
  "Features": "Egenskaper",
  "Female": "Kvinna",
  "Filter": "Filter",
  "Food": "Mat",
  "Forbidden Lands Companion": "Forbidden Lands Companion",
  "Gallery": "Galleri",
  "Gear": "Utrustning",
  "General talent": "Allmän talang",
  "General talents": "Allmänna talanger",
  "General": "Allmän",
  "Get from URL": "Hämta från URL",
  "Get": "Hämta",
  "Heavy": "Tung",
  "Helmet": "Hjälm",
  "Import backup": "Importera backup",
  "Inactive": "Inaktiva",
  "Inventory": "Ägodelar",
  "Kin talent": "Släktestalang",
  "Kin": "Släkte",
  "Language": "Språk",
  "Light": "Lätt",
  "Long": "Lång",
  "Male": "Man",
  "Miscellaneous": "Övrigt",
  "Mount": "Riddjur",
  "Mounted": "Ridande",
  "Move to backpack": "Flytta till ryggsäck",
  "Move to mount": "Flytta till riddjur",
  "Multiplay": "Multiplay",
  "Multiplayer": "Multiplayer",
  "Name": "Namn",
  "Near": "Nära",
  "New": "Nya",
  "Next": "Nästa",
  "None selected": "Ingen vald",
  "Notes": "Anteckningar",
  "Open": "Öppna",
  "Options": "Alternativ",
  "Other": "Annat",
  "Personality": "Personlighet",
  "Please select the following in": "Vänligen välj följande i",
  "Portrait": "Porträtt",
  "Post session": "Efter session",
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
  "Roll dice": "Kasta tärning",
  "Sandbox": "Sandbox",
  "Save & Close": "Spara & Stäng",
  "Save": "Spara",
  "Select import file": "Välj fil att importera",
  "Select picture": "Välj bild",
  "Select talent": "Välj talang",
  "Shield": "Sköld",
  "Short": "Kort",
  "Spend XP": "Spendera ERF",
  "Starting gear": "Utrustning vid start",
  "Starving": "Utsvulten",
  "TEMPLATE_VALID_WARNING": "[TRANSLATE ME]",
  "Talent": "Talang",
  "Template": "Mall",
  "Tiny": "Småsak",
  "Tired": "Sömnlös",
  "Torches": "Facklor",
  "Total spent": "Spenderat totalt",
  "Type": "Typ",
  "Use gear": "Använd utrustning",
  "View": "Visa",
  "WP": "KP",
  "Water": "Vatten",
  "Weapon": "Vapen",
  "Weapons": "Vapen",
  "Weight": "Vikt",
  "Willpower": "Kraftpoäng",
  "XP": "ERF",
}

const lowercase = {
  "action": "handling",
  "animal companion": "djurkompanjon",
  "armor": "rustning",
  "armslength": "armslängd",
  "artifact": "artefakt",
  "attribute": "grundegenskap",
  "axe": "yxa",
  "blunt": "trubbig",
  "bonus": "bonus",
  "bow": "pilbåge",
  "category": "kategori",
  "character": "karaktär",
  "childhood": "uppväxt",
  "combat": "strid",
  "combat-action-fast": "kort handling",
  "combat-action-fast-performed": "kort handling utförd",
  "combat-action-slow": "lång handling",
  "combat-action-slow-performed": "lång handling utförd",
  "confirm": "bekräfta",
  "create from template": "skapa från mall",
  "crossbow": "armborst",
  "description": "beskrivning",
  "dmg": "skada",
  "fighting monster": "attackera monster",
  "edged": "egg",
  "epic": "episk",
  "female": "kvinna",
  "formative event": "livshändelse",
  "helmets": "hjälmar",
  "hook": "krok",
  "humanoid": "humanoid",
  "initiative": "initiativ",
  "item": "föremål",
  "knife": "kniv",
  "legendary": "legendarisk",
  "long": "lång",
  "male": "man",
  "melee weapons": "närstridsvapen",
  "mighty": "mäktig",
  "monster": "monster",
  "movement rate": "förflyttningsvärde",
  "name": "namn",
  "near": "nära",
  "next round": "ny runda",
  "no character": "ingen rollperson",
  "no suitable weapon equipped": "inget lämpligt vapen i hand",
  "none": "ingen",
  "opponent": "motståndare",
  "options": "inställningar",
  "or more": "eller fler",
  "other": "övrigt",
  "parry": "parera",
  "parrying": "parera",
  "pointed": "spets",
  "polearm": "stångvapen",
  "probability": "sannolikhet",
  "properties": "egenskaper",
  "ranged weapons": "avståndsvapen",
  "select character": "välj rollperson",
  "sex": "kön",
  "shields": "sköldar",
  "short": "kort",
  "skill": "färdighet",
  "slow_loading": "långsam",
  "sword": "svärd",
  "talents": "talanger",
  "thrown": "kastvapen",
  "unarmed": "obeväpnad",
}

export default {
  ...age,
  ...attributes,
  ...kin,
  ...professions,
  ...skills,
  ...talents,
  ...GearDescriptions,
  ...templateGear,
  ...combatActionsFast,
  ...combatActionsSlow,
  ...mixedCase,
  ...lowercase,
  ...keyedTranslations,
  ...multiLine,
}
