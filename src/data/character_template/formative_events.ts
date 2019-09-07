// Formative events

import { Skill, TalentGeneral } from "@/types.ts"

type Skills = { readonly [S in Skill]?: number }

interface FormativeEvent {
  readonly name: string
  readonly story: string
  readonly items: string
  readonly talent: TalentGeneral
  readonly skills: Skills
}
// TODO: Refactor TalentGeneral to use lower case for everything

export const druid: FormativeEvent[] = [
  {
    // Data for #1
    name: "pilgrimage",
    story:
      "You performed a pilgrimage that lead you across the Forbidden Lands. You reached your destination after many hardships, but you will never forget your perilous journey.",
    items: "Receive a staff, a backpack, and a waterskin.",
    skills: {
      lore: 1,
      survival: 1,
    },
    talent: "wanderer",
  },
  {
    // Partial data for #2, please fill in the details
    name: "hunted",
    story:
      "Something happened that forced you to run for your life. Maybe you rubbed the wrong person the wrong way, maybe you were accused of something you hadn't done.",
    items: "Receive D3 doses sleeping poison and a dagger.",
    skills: {
      melee: 1,
      move: 1,
      // add skills as above
    },
    talent: "sixth sense",
  },
  {
    // #3
    name: "unexpected find",
    story:
      "You found a treasure marked with the sign of your god. You saw this as a sign that your mission was righteous, but others didn't see it the same way. Maybe there is still someone looking for the treasure?",
    items:
      "Roll once on the table for Valuable finds in the lair, reroll if the result is below 32.",
    skills: {
      crafting: 1,
      survival: 1,
      // add skills as above
    },
    talent: "lucky",
  },
  {
    // #4
    name: "studied with a master",
    story:
      "A wise druid took you under his/her wing and taught you for a long period. It was an intense time, but also educational. Maybe your master is still alive somewhere, maybe he/she was killed by the Iron Guard.",
    items: "Receive parchment, ink, and quill.",
    skills: {
      lore: 1,
      healing: 1,
      // add skills as above
    },
    talent: "sharp tongue",
  },
  {
    // #5
    name: "protected the forest",
    story:
      "You took it upon yourself to protect a forest against the evil and violence of strangers. You lived in the cover of proud trees, one with the beings of the forest.",
    items: "Receive a short bow and a D12 Resource Die for arrows. ",
    skills: {
      "marksmanship": 1,
      "animal handling": 1,
      // add skills as above
    },
    talent: "herbalist",
  },
  {
    // #6
    name: "lived as a hermit",
    story:
      "You sought the beauty of nature, away from the violent conflicts of the Forbidden Lands. When you finally returned to the land, you did so with newfound strength.",
    items: "Receive a tent and a field kitchen.",
    skills: {
      endurance: 1,
      survival: 1,
      // add skills as above
    },
    talent: "pathfinder",
  },
]

export const hunter: FormativeEvent[] = [
  {
    // #1
    name: "hunted a beast",
    story:
      "The hunt was everything. You tracked the beast over land, water, and mountain. At times, the roles were reversed, maybe at times you were the prey?",
    items: "Receive a short spear and a bear trap.",
    skills: {
      melee: 1,
      scouting: 1,
      // add skills as above
    },
    talent: "spear fighter",
  },
  {
    // #2
    name: "lived off the forest",
    story:
      "You dwelt in the forest and lived off it. During the days you hunted, and at night, you slept under the open sky. It was a simple but good life. It had to end one day.",
    items: "Receive a throwing spear and a dagger.",
    skills: {
      marksmanship: 1,
      survival: 1,
      // add skills as above
    },
    talent: "master of the hunt",
  },
  {
    // #3
    name: "tamed a mount",
    story:
      "You caught a wild horse (or another suitable animal). It wasn't easy, but after a long time you tamed the creature and in time you became inseparable.",
    items: "Receive a mount of your choice. It cannot be a warhorse.",
    skills: {
      "animal handling": 2,
      // add skills as above
    },
    talent: "horseback fighter",
  },
  {
    // #4
    name: "won an archery competition",
    story:
      "You realized early on that you had a natural talent for archery, and set out to become even better. When you visited a large village or castle, you participated in a competition and won.",
    items: "Receive a longbow and a D12 Resource Die for arrows.",
    skills: {
      marksmanship: 2,
      // add skills as above
    },
    talent: "sharpshooter",
  },
  {
    // #5
    name: "guide",
    story:
      "You loaned your talents as a guide to those who paid the best. You led caravans of peddlers, troops of soldiers, and curious adventurers. You learned the art of traversing the Forbidden Lands and living off of it.",
    items: "Receive a tent, a cauldron, and a blanket.",
    skills: {
      scouting: 2,
      // add skills as above
    },
    talent: "pathfinder",
  },
  {
    // #6
    name: "hunted for a lord",
    story:
      "A nobleman noticed your skills and hired you as his forester. You lived a good life, half of the time in comfort in the lord's castle, the rest of the time hunting in the woods.",
    items: "Receive a well-sewn cloak and a sleeping fur.",
    skills: {
      marksmanship: 1,
      insight: 1,
      // add skills as above
    },
    talent: "sixth sense",
  },
]

export const fighter: FormativeEvent[] = [
  {
    // #1
    name: "captured",
    story:
      "You were shamefully captured by enemies. You were thrown in a dungeon to be forgotten and die. When the opportunity arose to escape, you took it.",
    items: "Receive studded leather armor.",
    skills: {
      might: 1,
      survival: 1,
      // add skills as above
    },
    talent: "pain resistant",
  },
  {
    // #2
    name: "bloody battle",
    story:
      "You took part in a terrible battle and were badly injured. When dawn broke, your friends had been defeated to the last man, and the enemy had left you to the ravens.",
    items: "Receive a longsword.",
    skills: {
      melee: 2,
      // add skills as above
    },
    talent: "sword fighter",
  },
  {
    // #3
    name: "a long march",
    story:
      "You signed on as a soldier and marched across the Forbidden Lands. You barely remember what you fought for, or who your enemies were. But you remember how the forces of nature took your friends one by one.",
    items: "Receive a tent, a blanket, and a cauldron.",
    skills: {
      survival: 1,
      healing: 1,
      // add skills as above
    },
    talent: "pack rat",
  },
  {
    // #4
    name: "on horseback",
    story:
      "You learned to ride and signed on as a knight with a lord. You fought in skirmishes, patrolled and guarded the country from enemies.",
    items: "Receive a mount of your choice (not warhorse)",
    skills: {
      "melee": 1,
      "animal handling": 1,
      // add skills as above
    },
    talent: "horseback fighter",
  },
  {
    // #5
    name: "scout",
    story:
      "You signed on with a company of soldiers and were placed in the vanguard as a scout. Your task to discover the enemy before they discovered you, and you were good at it. Maybe something happened to your squad, maybe you weren't paying much attention just that once?",
    items: "Receive a light crossbow and a D12 Resource Die for arrows.",
    skills: {
      scouting: 1,
      marksmanship: 1,
      // add skills as above
    },
    talent: "defender",
  },
  {
    // #6
    name: "commander",
    story:
      "You commanded a squad of soldiers. Your comrades looked up to you and would die for you. But something happened, maybe you were betrayed, maybe defeated in an ambush. Your comrades fell or fled, but you survived.",
    items: "Receive chainmail armor and a closed helmet.",
    skills: {
      lore: 1,
      manipulation: 1,
      // add skills as above
    },
    talent: "cold blooded",
  },
]

export const sorcerer: FormativeEvent[] = [
  {
    // #1
    name: "failed experiment",
    story:
      "You performed a magical experiment that failed catastrophically. Maybe someone was seriously injured, maybe you were banished from your home.",
    items: "Receive a D6 doses of hallucinogenic poison.",
    skills: {
      lore: 1,
      healing: 1,
      // add skills as above
    },
    talent: "poisoner",
  },
  {
    // #2
    name: "secluded studies",
    story:
      "You sought out a secluded location to immerse yourself in the study of magic. You lived off nature and your books and scrolls were your only companions.",
    items: "Receive a small tent and a cauldron.",
    skills: {
      lore: 1,
      survival: 1,
      // add skills as above
    },
    talent: "quartermaster",
  },
  {
    // #3
    name: "found strange artifact",
    story:
      "You found a strange artifact during your travels through the Forbidden Lands. You became obsessed with its history and the thought that it might hold magical powers.",
    items:
      "Roll once on the table for Valuable finds in the lair. Re-roll if the result is below 32.",
    skills: {
      crafting: 1,
      insight: 1,
      // add skills as above
    },
    talent: "incorruptible",
  },
  {
    // #4
    name: "court magician",
    story:
      "You took employment with a local lord and served as his arcane advisor. Maybe the lord had a hidden agenda, maybe you got into a conflict with higher ranking advisors. You learned much about people in positions of power.",
    items: "Receive a bottle of expensive wine and a cloak.",
    skills: {
      insight: 1,
      manipulation: 1,
      // add skills as above
    },
    talent: "sharp tongue",
  },
  {
    // #5
    name: "entertainer",
    story:
      "You worked as an entertainer, using your knowledge of magic to perform illusioins and tricks. Maybe you worked at a run down inn, maybe you were employed at a lord's court.",
    items: "Receive fine garments and a crystal ball.",
    skills: {
      manipulation: 2,
      // add skills as above
    },
    talent: "lightning fast",
  },
  {
    // #6
    name: "enlisted",
    story:
      "You were enlisted in a company of soldiers. You spent a long time in the field where you assisted with your magical expertise. You saw comrades killed, but you managed to make it out with just an ugly scar or two.",
    items: "Receive studded leather armor and a closed helmet.",
    skills: {
      melee: 1,
      healing: 1,
      // add skills as above
    },
    talent: "defender",
  },
]

export const peddler: FormativeEvent[] = [
  {
    // #1
    name: "caravan",
    story:
      "You were part of an arduous trade caravan that traveled through the Forbidden Lands. The caravan encountered many dangers, and not everyone made it to the final destination. Maybe someone was left behind on the way?",
    items: "Receive a donkey",
    skills: {
      "animal handling": 1,
      "manipulation": 1,
      // add skills as above
    },
    talent: "wanderer",
  },
  {
    // #2
    name: "local business",
    story:
      "You saw a financial opportunity and you made the most of it. Maybe you imported fruit to a lord's castle, maybe you sold fabrics from Alderland. Business went swimmingly - for a while.",
    items: "Receive a cart",
    skills: {
      insight: 1,
      manipulation: 1,
      // add skills as above
    },
    talent: "lucky",
  },
  {
    // #3
    name: "cheated",
    story:
      "A trusted companion deceived you and left you destitute. You learned and important lesson the hard way, and had to spend a long time rebuilding your life from the rubble. Maybe your old companion still alive?",
    items: "Receive a small tent, a blanket and a cauldron.",
    skills: {
      insight: 2,
      // add skills as above
    },
    talent: "incorruptible",
  },
  {
    // #4
    name: "side mission",
    story:
      "You teamed up with a group of adventurers and went on a great adventure in the Forbidden Lands. You had to face many dangers, and many perished on the journey, but you learned a lot about yourself on the way.",
    items: "Receive a chainmail armor and a small shield.",
    skills: {
      melee: 1,
      lore: 1,
      // add skills as above
    },
    talent: "fearless",
  },
  {
    // #5
    name: "smuggler",
    story:
      "You created a lucrative business by smuggling contraband between the settlements of the Forbidden Lands. Maybe you smuggled weapons, maybe forbidden drugs. You learned the importance of discretion and how to avoid attention.",
    items: "Receive a spyglass.",
    skills: {
      scouting: 1,
      insight: 1,
      // add skills as above
    },
    talent: "sixth sense",
  },
  {
    // #6
    name: "ran a shop",
    story:
      "You chose to settle in a village and run a shop for a period of your life. You could live off of it, but not very well. In the end, you realized that the quiet existance wasn't for you.",
    items: "Receive a scale, ink, a quill, and parchment.",
    skills: {
      manipulation: 2,
      // add skills as above
    },
    talent: "sharp tongue",
  },
]

export const rider: FormativeEvent[] = [
  {
    // #1
    name: "enlisted",
    story:
      "You joined a company of soldiers. Maybe you joined of your own free will, maybe you were conscripted. With your comrades you braved many hardships: battles, long marches, and harsh weather. In the end, something happened to make you leave the company.",
    items: "Receive studded leather armor and a large shield.",
    skills: {
      melee: 1,
      marksmanship: 1,
      // add skills as above
    },
    talent: "horseback fighter",
  },
  {
    // #2
    name: "competed",
    story:
      "You earned a living as a competitive rider, and traveled from village to village, castle to castle and competed against other riders. As long as you were winning you had a good life, but when you started losing, it was time to move on.",
    items: "Receive a cloak.",
    skills: {
      "move": 1,
      "animal handling": 1,
      // add skills as above
    },
    talent: "fast footwork",
  },
  {
    // #3
    name: "traveled the land",
    story:
      "Your lust for adventure took over, and you went out for a long ride across the Forbidden Lands. You rode through miserable wastes, severe storms, and braves many dangers.",
    items: "Receive a small tent, a cauldron, and a blanket.",
    skills: {
      survival: 1,
      scouting: 1,
      // add skills as above
    },
    talent: "herbalist",
  },
  {
    // #4
    name: "caravan guard",
    story:
      "You took employment as a guard in a caravan, and escorted peddlers through dark forests and high mountains.",
    items: "Receive a short spear",
    skills: {
      melee: 1,
      scouting: 1,
      // add skills as above
    },
    talent: "pathfinder",
  },
  {
    // #5
    name: "cattle herder",
    story:
      "You herded livestock to greener pastures in the Forbidden Lands. In the daytime, you guarded the herd from horseback. At night, you slept under the open sky.",
    items: "Receive a lantern and a waterskin.",
    skills: {
      "move": 1,
      "animal handling": 1,
      // add skills as above
    },
    talent: "quartermaster",
  },
  {
    // #6
    name: "steppe rider",
    story:
      "You rode across the everlasting steppes of the Forbidden Lands and lived simply by hunting and selling meat and animals hides.",
    items: "Receive a short bow and a D12 Resource Die for arrows",
    skills: {
      "marksmanship": 1,
      "animal handling": 1,
      // add skills as above
    },
    talent: "tanner",
  },
]

export const minstrel: FormativeEvent[] = [
  {
    // #1
    name: "wrote a popular ballad",
    story:
      "A ballad or story that you wrote became immensely popular in the surrounding area. To this day, you hear local minstrels performing your piece.",
    items: "Receive ink, a feather, and parchment.",
    skills: {
      manipulation: 1,
      performance: 1,
      // add skills as above
    },
    talent: "lucky",
  },
  {
    // #2
    name: "worked as a minstrel",
    story:
      "You used your artistic talents to make a living as a minstre. Maybe you were of the traveling kind, maybe you worked at a more permanent location, like a tavern or a castle.",
    items: "Receive a lute.",
    skills: {
      performance: 2,
      // add skills as above
    },
    talent: "sharp tongue",
  },
  {
    // #3
    name: "inspirational journey",
    story:
      "You went on a journey across the Forbidden Lands, to learn of the kin, cultures, and legends. On your journey you encountered many adventures and gathered enough material to fill a smaller book of ballads.",
    items: "Receive a small tent, a blanket, and a cauldron.",
    skills: {
      lore: 1,
      survival: 1,
      // add skills as above
    },
    talent: "fearless",
  },
  {
    // #4
    name: "sang for a lord",
    story:
      "Your talent drew the attention of a local lord and he offered you a place as an entertainer at his court. Your time in the castle was filled with wine, delicious food, and clinking silver. But also insidious intrigue, assassinations, and jealousy.",
    items: "Receive fine garments and a dagger",
    skills: {
      insight: 1,
      performance: 1,
      // add skills as above
    },
    talent: "sixth sense",
  },
  {
    // #5
    name: "enlisted",
    story:
      "Life took an unexpected turn and you were enlisted in a company of soldiers. Life in the field was rough, but you made faithful friends and learned to live off the land.",
    items: "Receive leather armor and an open helmet.",
    skills: {
      melee: 1,
      survival: 1,
      // add skills as above
    },
    talent: "defender",
  },
  {
    // #6
    name: "dueled a rival",
    story:
      "A rival saw you as a thorn in his side. For a period, your fates were interwined in the most troublesome ways: love, money, and work. In the end, it was too much. You were challenged to a duel, and you were injured. Maybe your rival is still out somewhere.",
    items: "Receive a short sword.",
    skills: {
      melee: 1,
      healing: 1,
      // add skills as above
    },
    talent: "sword fighter",
  },
]

export const rogue: FormativeEvent[] = [
  {
    // #1
    name: "stole from the wrong person",
    story:
      "It was the perfect crime. For a while. You stole something valuable from the wrong person, at the wrong time. You were hunted and had to run for your life.",
    items: "Receive lockpicks.",
    skills: {
      "sleight of hand": 1,
      "move": 1,
      // add skills as above
    },
    talent: "lightning fast",
  },
  {
    // #2
    name: "imprisoned",
    story:
      "Guilty or not, you were caught and thrown in jail. You had to spend a long time in the darkness but never gave up. Finally, the chance to escape emerged, and you took it.",
    items: "Receive a dagger.",
    skills: {
      endurance: 1,
      survival: 1,
      // add skills as above
    },
    talent: "pain resistant",
  },
  {
    // #3
    name: "successful heist",
    story:
      "You planned and successfully performed a heist. Maybe it was against a rich peddler, maybe against a local lord.",
    items:
      "Receive an item from Valuable finds in a lair. Reroll if the result is below 33.",
    skills: {
      "sleight of hand": 1,
      "stealth": 1,
      // add skills as above
    },
    talent: "lucky",
  },
  {
    // #4
    name: "joined a guild of thieves",
    story:
      "You sought out an association of thieves and became part of the community. Together, you planned heists, and carried out dangerous missions.",
    items: "Receive leather armor.",
    skills: {
      insight: 1,
      scouting: 1,
      // add skills as above
    },
    talent: "sixth sense",
  },
  {
    // #5
    name: "enlisted",
    story:
      "You found yourself, probably against your will, enlisted in a company of soldiers. There you worked as a scout, and ranged far ahead of the others. Your time there was filled with misery and dangers, but also friendship.",
    items: "Receive a short bow and a D12 Resource Die for arrows.",
    skills: {
      marksmanship: 1,
      scouting: 1,
      // add skills as above
    },
    talent: "pathfinder",
  },
  {
    // #6
    name: "band of robbers",
    story:
      "You disappeared into the woods and joined a band of robbers that lived off peddlers and caravans who stumbled into their path. Life in the forest was carefree and good for as long as it lasted, but in the end, the robbers were ousted from the woods.",
    items: "Receive a short sword.",
    skills: {
      melee: 1,
      survival: 1,
      // add skills as above
    },
    talent: "lightning fast",
  },
]

export const formativeEventsAll: { [index: string]: FormativeEvent[] } = {
  druid,
  fighter,
  hunter,
  minstrel,
  peddler,
  rider,
  rogue,
  sorcerer,
}

export default formativeEventsAll
