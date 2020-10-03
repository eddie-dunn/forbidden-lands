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
  "age": "Alter",
  "adult": "erwachsen",
  "old": "alt",
  "young": "jung",
  "": "?",
}

const professions: ProfessionTranslations = {
  sorcerer: "Zauberer",
  druid: "Druide",
  fighter: "Kämpfer",
  hunter: "Jäger",
  minstrel: "Barde",
  peddler: "Händler",
  rider: "Reiter",
  rogue: "Schurke",
}

const attributes: AttributeTranslations = {
  attributes: "Attribute",
  agility: "Geschicklichkeit",
  empathy: "Empathie",
  strength: "Stärke",
  wits: "Verstand",
}

const kin: KinTranslations = {
  kin: "Volk",
  dwarf: "Zwerg",
  elf: "Elf",
  goblin: "Goblin",
  halfelf: "Halbelf",
  halfling: "Halbling",
  human: "Mensch",
  orc: "Ork",
  wolfkin: "Wolfsmensch",

  alderlander: "Erlenländer",
  aslene: "Aslene",
  ailander: "Ailander",
}

const talents: TalentTranslations = {
  // Kin
  "True Grit": "Felsbeißer", // dwarf
  "Inner Peace": "Innere Ruhe", // elf
  "Sneaky": "Nachtaktiv", // goblin
  "Psychic Power": "Macht des Geistes", // half-elf
  "Hard to Catch": "Schwer zu fassen", // halfling
  "Adaptive": "Anpassungsfähig", // human
  "Unbreakable": "Unbezwingbar", // orc
  "Hunting Instincts": "Jagdinstikte", // wolfkin

  "ambidextrous": "Beidhändig",
  "axe fighter": "Axtkämpfer",
  "berserker": "Berserker",
  "bowyer": "Bogner",
  "brawler": "Raufbold",
  "builder": "Baumeister",
  "chef": "Koch",
  "cold blooded": "Kaltblütig",
  "defender": "Verteidiger",
  "dragonslayer": "Drachentöter",
  "executioner": "Scharfrichter",
  "fast footwork": "Flinke Füße",
  "fast shooter": "Schneller Schütze",
  "fearless": "Furchtlos",
  "firm grip": "Fester Griff",
  "fisher": "Fischer",
  "hammer fighter": "Hammerkämpfer",
  "herbalist": "Kräuterkundler",
  "horseback fighter": "Berittener Kämpfer",
  "incorruptible": "Unbestechlich",
  "knife fighter": "Messerkämpfer",
  "lightning fast": "Blitzschnell",
  "lockpicker": "Schlossknacker",
  "lucky": "Glückspilz",
  "master of the hunt": "Jagdmeister",
  "melee charge": "Sturmangriff",
  "pack rat": "Packesel",
  "pain resistant": "Schmerzresistent",
  "pathfinder": "Kundschafter",
  "poisoner": "Giftmischer",
  "quartermaster": "Quartiermeister",
  "quickdraw": "Schnellziehen",
  "sailor": "Seemann",
  "sharpshooter": "Scharfschütze",
  "sharp tongue": "Scharfe Zunge",
  "shield fighter": "Schildkämpfer",
  "sixth sense": "Sechster Sinn",
  "smith": "Schmied",
  "spear fighter": "Speerkämpfer",
  "steady feet": "Standfest",
  "sword fighter": "Schwertkämpfer",
  "tailor": "Schneider",
  "tanner": "Gerber",
  "threatening": "Bedrohlich",
  "throwing arm": "Wurfarm",
  "wanderer": "Wanderer",

  // Druid
  "Path of Healing": "Weg der Heilung",
  "Path of Shifting Shapes": "Weg der Gestaltwandlung",
  "Path of Sight": "Weg der Hellsicht",

  // Fighter
  "Path of the Blade": "Weg der Klinge",
  "Path of the Enemy": "Weg des Feindes",
  "Path of the Shield": "Weg des Schildes",

  // HUNTER
  "Path of the Arrow": "Weg des Pfeils",
  "Path of the Beast": "Weg des Tieres",
  "Path of the Forest": "Weg des Waldes",

  // MINSTREL
  "Path of the Hymn": "Weg des Lobgesangs",
  "Path of the Song": "Weg des Liedes",
  "Path of the Warcry": "Weg des Kampfschreis",

  // Peddler
  "Path of Gold": "Weg des Goldes",
  "Path of Lies": "Weg der Lügen",
  "Path of Many Things": "Weg der Vielen Dinge",

  // Rider
  "Path of the Companion": "Weg des Gefährten",
  "Path of the Knight": "Weg des Ritters",
  "Path of the Plains": "Weg der Ebenen",

  // Rogue
  "Path of the Face": "Weg der Maske",
  "Path of the Killer": "Weg des Meuchlers",
  "Path of Poison": "Weg des Gifts",

  // Sorcerer
  "Path of Blood": "Weg des Bluts",
  "Path of Death": "Weg des Todes",
  "Path of Signs": "Weg der Zeichen",
  "Path of Stone": "Weg der Steine",
}

const skills: SkillTranslations = {
  "skills": "Fertigkeiten",
  "animal handling": "Tierkunde",
  "crafting": "Handwerk",
  "endurance": "Ausdauer",
  "healing": "Heilen",
  "insight": "Menschenkenntnis",
  "lore": "Wissen",
  "manipulation": "Manipulation",
  "marksmanship": "Fernkampf",
  "melee": "Nahkampf",
  "might": "Kraft",
  "move": "Bewegen",
  "performance": "Darbietung",
  "scouting": "Auskundschaften",
  "sleight of hand": "Fingerfertigkeit",
  "stealth": "Heimlichkeit",
  "survival": "Überleben",
}

const GearDescriptions: GearDescriptionTranslations = {
  gear_druid: `
    Stab oder Messer, ein Gegenstand deiner Wahl aus der Liste der Handelswaren
    (siehe S. 186 im Spielerhandbuch)
  `,
  gear_fighter: `
    Eine Einhandwaffe nach Wahl, verstärkte Lederrüstung, ein Gegenstand deiner Wahl aus der Liste der Handelswaren
    (siehe S. 186 im Spielerhandbuch)
  `,
  gear_hunter: `
    Bogen oder Schleuder, zwei Gegenstände deiner Wahl aus der Liste der Handelswaren
    (siehe S. 186 im Spielerhandbuch)
  `,
  gear_minstrel: `
    Laute oder Flöte, Messer, ein Gegenstand deiner Wahl aus der Liste der Handelswaren
    (siehe S. 186 im Spielerhandbuch)
  `,
  gear_peddler: `
    Messer, drei Gegenstände deiner Wahl aus der Liste der Handelswaren
    (siehe S. 186 im Spielerhandbuch)
  `,
  gear_rider: `
    Ein Reitpferd (aus dem Kartenset für Die Verbotenen Lande, falls vorhanden), Speer oder Handaxt, Kurzbogen oder Schleuder, ein Gegenstand deiner Wahl aus der Liste der Handelswaren
    (siehe S. 186 im Spielerhandbuch)
  `,
  gear_rogue: `
    Dolch, zwei Gegenstände deiner Wahl aus der Liste der Handelswaren
    (siehe S. 186 im Spielerhandbuch)
  `,
  gear_sorcerer: `
    Stab oder Messer, ein Gegenstand deiner Wahl aus der Liste der Handelswaren
    (siehe S. 186 im Spielerhandbuch)
  `,
}

const weapons = {
  "battleaxe": "Streitaxt",
  "broadsword": "Breitschwert",
  "chainmail": "Kettenrüstung",
  "closed helmet": "Helm, geschlossen",
  "dagger": "Dolch",
  "falchion": "Falchion",
  "flail": "Flegel",
  "great helm": "Topfhelm",
  "halberd": "Hellebarde",
  "handaxe": "Handaxt",
  "heavy crossbow": "Schwere Armbrust",
  "heavy warhammer": "Schwerer Kriegshammer",
  "knife": "Messer",
  "large shield": "Schild, groß",
  "large wooden club": "Große Holzkeule",
  "leather armor": "Lederrüstung",
  "light crossbow": "Leichte Armbrust",
  "long spear": "Langspeer",
  "longbow": "Langbogen",
  "longsword": "Langschwert",
  "mace": "Streitkolben",
  "morningstar": "Morgenstern",
  "open helmet": "Helm, offen",
  "pike": "Spieß",
  "plate armor": "Plattenrüstung",
  "rock": "Stein",
  "scimitar": "Krummsäbel",
  "short bow": "Kurzbogen",
  "short spear": "Speer",
  "shortbow": "Kurzbogen",
  "shortsword": "Kurzschwert",
  "sling": "Schleuder",
  "small shield": "Schild, klein",
  "staff": "Kampfstab",
  "studded leather cap": "Verstärkte Lederkappe",
  "studded leather": "Verstärkte Lederrüstung",
  "throwing axe": "Wurfaxt",
  "throwing knife": "Wurfmesser",
  "throwing spear": "Wurfspeer",
  "trident": "Dreizack",
  "two handed axe": "Zweihandaxt",
  "two handed sword": "Bidenhänder",
  "warhammer": "Kriegshammer",
  "wooden club": "Holzkeule",
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

  // Keys
  "ATTRIB_REMAINING": "Aktuell",

  // Mixed case

  "About FLC": "Über FLC",
  "About": "Über",
  "Activate": "Aktivieren",
  "Active": "Aktive",
  "Add XP/Reputation": "EP/Reputation hinzufügen",
  "Add item": "Gegenstand hinzufügen",
  "Add": "Hinzufügen",
  "Add talent": "Talent hinzufügen",
  "Appearance": "Aussehen",
  "Armor": "Rüstung",
  "Armslength": "Armeslänge",
  "Arrows": "Pfeile",
  "Artifact dice": "Artefaktwürfel",
  "Back": "Zurück",
  "Base data": "Charaktereigenschaften eingeben",
  "Basic dice": "Basiswürfel",
  "Body": "Körper",
  "Cancel": "Abbrechen",
  "Carried by mount": "Von Reittier getragen",
  "Characters": "Charaktere",
  "Choose": "Auswählen",
  "Class talent": "Berufstalent",
  "Class talents": "Berufstalente",
  "Close": "Schliessen",
  "Clothing": "Kleidung",
  "Coins": "Münzen",
  "Cold": "Unterkühlt",
  "Comment": "Kommentar",
  "Conditions": "Conditions",
  "Consumables": "Verbrauchsgüter",
  "Create new character": "Neuen Charakter erstellen",
  "Create": "Erstellen",
  "D": "W",
  "Damage": "Schaden",
  "Dark secret": "Dunkles Geheimnis",
  "Deactivate": "Deaktivieren",
  "Dehydrated": "Durstig",
  "Delete": "Löschen",
  "Details": "Details",
  "Dice roller": "Würfeln",
  "Dice": "Würfel",
  "Download data": "Daten herunterladen",
  "Drop": "Fallenlassen",
  "Edit": "Bearbeiten",
  "Encumbrance": "Traglast",
  "Enter external URL": "Externe URL eingeben",
  "Experience gained": "erhaltene Erfahrungspunkte",
  "Experience": "Erfahrung",
  "Face": "Gesicht",
  "Features": "Eigenschaften",
  "Female": "weiblich",
  "Filter": "Filter",
  "Food": "Nahrung",
  "Forbidden Lands Companion": "Forbidden Lands Companion",
  "Gallery": "Galerie",
  "Gear": "Ausrüstung",
  "General talent": "Allgemeines Talent",
  "General talents": "Allgemeine Talente",
  "General": "General",
  "Get from URL": "Über URL auswählen",
  "Get": "Herunterladen",
  "Heavy": "Schwer",
  "Helmet": "Helm",
  "Import backup": "Backup importieren",
  "Inactive": "Inaktiv",
  "Inventory": "Im Rucksack getragen",
  "Kin talent": "Volkstalent",
  "Kin": "Volk",
  "Language": "Sprache",
  "Light": "Leicht",
  "Long": "Weit",
  "Male": "männlich",
  "Miscellaneous": "Verschiedenes",
  "Mount": "Reittier",
  "Mounted": "Beritten",
  "Move to backpack": "In den Rucksack",
  "Move to mount": "Auf das Reittier",
  "Multiplay": "Multiplay",
  "Multiplayer": "Multiplayer",
  "Name": "Name",
  "Near": "Nah",
  "New": "Neu",
  "Next": "Weiter",
  "None selected": "Nichts ausgewählt",
  "Notes": "Notizen",
  "Other": "Andere",
  "Personality": "Persönlichkeit",
  "Please select the following in": "Bitte zuerst folgende",
  "Portrait": "Portrait",
  "Post session": "Nach der Spielsitzung",
  "Pride": "Stolz",
  "Profession": "Profession",
  "Protection": "Rüstung",
  "Push": "Strapazieren",
  "Range": "Reichweite",
  "Relationships": "Beziehungen",
  "Remaining": "Noch verteilbar",
  "Remove": "Entfernen",
  "Reputation gained": "erhaltene Reputation",
  "Reputation": "Reputation",
  "Reset": "Zurücksetzen",
  "Roll dice": "Würfeln",
  "Save": "Speichern",
  "Save & Close": "Speichern & Schliessen",
  "Select import file": "Datei für Import wählen",
  "Select picture": "Bild auswählen",
  "Select talent": "Talent auswählen",
  "Shield": "Schild",
  "Short": "Kurz",
  "Spend XP": "EP ausgeben",
  "Starting gear": "Startausrüstung",
  "Starving": "Hungrig",
  "Talent": "Talent",
  "Template": "Vorlage",
  "Tiny": "Winzig",
  "Tired": "Müde",
  "Torches": "Fackeln",
  "Total spent": "Insgesamt ausgegeben",
  "Type": "Art",
  "Use gear": "Ausrüstung verwenden",
  "View": "Ansehen",
  "Water": "Wasser",
  "Weapon": "Waffe",
  "Weapons": "Waffen",
  "Weight": "Gewicht",
  "Willpower": "Willenskraft",
  "WP": "WP",
  "XP": "EP",

  // lowercase

  "animal companion": "Tiergefährte",
  "armor": "Rüstung",
  "armslength": "Armeslänge",
  "attribute": "Attribut",
  "blunt": "Stumpf",
  "character": "Charakter",
  "childhood": "Kindheit",
  "confirm": "Bestätigen",
  "create from template": "Aus Vorlage erstellen",
  "current": "Aktuell",
  "description": "Beschreibung",
  "dmg": "Schdn",
  "edged": "Scharf",
  "epic": "Episch",
  "female": "weiblich",
  "formative event": "Prägendes Ereignis",
  "helmets": "Helme",
  "hook": "Haken",
  "legendary": "Legendär",
  "long": "Weit",
  "male": "männlich",
  "melee weapons": "Nahkampfwaffen",
  "message": "Hallo i18n !!",
  "mighty": "Machtvoll",
  "movement rate": "Bewegungsrate",
  "name": "Name",
  "near": "Nah",
  "no character": "kein Charakter",
  "or more": "oder mehr",
  "other": "Andere",
  "parrying": "Parade",
  "pointed": "Stich",
  "probability": "Wahrscheinlichkeiten",
  "properties": "Eigenschaften",
  "ranged weapons": "Fernkampfwaffen",
  "select character": "Charakter auswählen",
  "sex": "Geschlecht",
  "shields": "Schilde",
  "short": "Kurz",
  "slow_loading": "langsames laden",
  "talents": "Talente",
  "unarmed": "Unbewaffnet",

  // Param
  "PHB_ref": "Seite {page} im Spielerhandbuch",

  // Key
  "CONFIRM_DELETE_CHAR": "Willst du den Charakter wirklich löschen?",

  // Longer
  "Roll dice before session starts": "vor der ersten Sitzung auswürfeln",
  "XP_DESCR": `
    Du erhältst EP am Ende jeder Spielsitzung. Sprich mit den anderen Spielern darüber, was passiert ist. Für jede der folgenden Fragen, die du mit „Ja“ beantworten kannst, erhältst du einen EP:

    Hast du an der Spielsitzung teilgenommen? Du erhältst einen EP einfach, weil du da warst.

    Bist du während der Spielsitzung durch mindestens ein Hexfeld auf der Karte gereist, das du zuvor noch nicht besucht hattest?

    Hast du einen neuen Abenteuerschauplatz entdeckt?

    Hast du ein oder mehrere Monster besiegt?

    Hast du einen Schatz gefunden (1 Goldmünze oder mehr)?

    Hast du eine Anlage in deiner Festung errichtet?

    Hast du deinen Stolz aktiviert?

    Hast du unter deinem Dunklen Geheimnis gelitten?

    Hast du dein Leben für einen anderen SC riskiert?

    Hast du irgendeine außergewöhnliche Handlung durchgeführt?
  `,
  "REP_DESCR": `
    Während des Spiels erhöht sich dein Reputation-Wert. Nach einer Spielsitzung, in der du eine oder mehrere großartige oder fürchterliche Taten vollbracht hast, Taten, von denen die Welt noch in Jahren sprechen wird, erhöht sich deine Reputation um 1 Punkt. Was als „großartige oder fürchterliche Tat“ gilt, liegt im Ermessen der Spielleiterin, aber hier sind einige Beispiele:

    Ein berühmter NSC wurde getötet oder vor dem sicheren Tod gerettet.

    Ein gefürchtetes Monster wurde erschlagen.

    Ein legendärer Schatz oder ein Artefakt wurde gefunden oder gestohlen.

    Die Tat hat die Gesamtsituation an einem Abenteuerschauplatz permanent verändert.

    Die Tat hat signifikante Auswirkungen für eine der wichtigen Mächtegruppen in den Verbotenen Landen.

    Ihr habt bestimmte Anlagen in eurer Festung errichtet (siehe S. 163).
  `,
  "CONFIRM_ACTIVATE_INVALID_CHAR": `
    Dein Charakter entspricht nicht den Regel-Vorgaben, soll er dennoch aktiviert werden?
  `,
  "TEMPLATE_VALID_WARNING": `
    N.B: Creating a character from a template may result in a character that
    does not validate according to the character creation rules.

    However, even if the stats are invalid it is still possible to save and
    activate your character, should you wish to do so.
  `,
  "GENERATE_DOWNLOAD_LINK": "Download-Link erstellen",
  "IMPORT_WARNING":
    "Achtung: Der Import eines Backups überschreibt alle aktuellen Einstellungen und Charaktere.",
}
