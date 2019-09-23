// Childhood
import { Attribute, Skill } from "@/types.ts"

type Skills = { readonly [S in Skill]?: number }
type Attributes = { readonly [A in Attribute]: number }

interface Childhood {
  readonly name: string
  readonly story: string
  readonly attributes: Attributes
  skills: Skills
}

export const alderlander: Childhood[] = [
  {
    // #1
    name: "orphaned",
    story: `You have never met your mother or father, never had a family. Since you were little, you've had to care for yourself. It has hardened you and made you strong, but a feeling of rootlessness gnaws within you.`,
    attributes: {
      strength: 3,
      agility: 5,
      wits: 3,
      empathy: 4,
    },
    skills: {
      "endurance": 1,
      "melee": 1,
      "scouting": 1,
      "sleight of hand": 1,
      "survival": 1,
      "insight": 1,
    },
  },
  {
    // #2
    name: "herder",
    story:
      "You were taught as a child that livestock are the source of life. As an apprentice, you wandered the plains of the Forbidden Lands, guarding your herd. You spent your nights under starry skies, dreaming of adventure.", // Fill in story between quotes here; make sure to avoid newlines between the quotes!
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "might": 1,
      "crafting": 1,
      "scouting": 2,
      "animal handling": 2,
    },
  },
  {
    // #3
    name: "vagabond", // Fill in childhood label between quotes here
    story:
      "You and your family traveled from village to village, making a living doing simple jobs. You never had a real home, every day was a new adventure. You learned to live off the land, and the importance of staying together", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 4,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      endurance: 1,
      melee: 1,
      scouting: 1,
      survival: 2,
      insight: 1,
    },
  },
  {
    // #4
    name: "squire", // Fill in childhood label between quotes here
    story:
      "You served a proud warrior. Carried her weapons and gear, took care of her horse, and learned everything you could. You dreamed of making a name for yourself in the Forbidden Lands, of one day being your own master", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      endurance: 1,
      melee: 2,
      marksmanship: 1,
      move: 1,
      healing: 1,
    },
  },
  {
    // #5
    name: "laborer", // Fill in childhood label between quotes here
    story:
      "You worked on a farm performing menial laborious chores. You know everything about grains, cattle, and crops. But deep inside you longed for something else.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 5,
      agility: 3,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "might": 2,
      "melee": 1,
      "crafting": 1,
      "survival": 1,
      "animal handling": 1,
    },
  },
  {
    // #6
    name: "hard studies", // Fill in childhood label between quotes here
    story:
      "A learned man or woman took you under his/her wing and set you to studying the elder writings. The days were long, the learning hard, but in the end, you found that knowledge was the key to the world.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 3,
      wits: 5,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      crafting: 1,
      lore: 3,
      insight: 1,
      manipulation: 1,
    },
  },
]

export const aslene: Childhood[] = [
  {
    name: "born in the saddle", // Fill in childhood label between quotes here
    story:
      "You have always felt more kinship with animals than humans, and it is only on the back of your horse, with the wind whipping your face, that you feel truly free. Together you are one entity, riding across everlasting expanses in the name of the god Horn.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 5,
      wits: 3,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      "move": 2,
      "survival": 2,
      "animal handling": 2,
    },
  },
  {
    name: "dreamer", // Fill in childhood label between quotes here
    story:
      "You have always dreamed of gods, legends, and myhts. Ever since you were a tiny tot, you sat by the campfire listening to the clan's minstrel telling stories of the volcano god Horn, proud ancestors, and demonic invasions. It is in the dreams of your people, of heroes and legends, that you live to the fullest. Maybe one day you'll be able to create a legend of your own?", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 3,
      wits: 4,
      empathy: 5,
    },
    skills: {
      // Fill in skill names and their value here
      "lore": 2,
      "manipulation": 1,
      "performance": 1,
      "animal handling": 1,
    },
  },
  {
    name: "strongest of the clan", // Fill in childhood label between quotes here
    story:
      "Already as a child you learned that you were bigger and stronger than others. You had to work harder, be more responsible, fight the hardest. Some idolized you, others despised you.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 5,
      agility: 3,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "might": 2,
      "endurance": 1,
      "melee": 2,
      "animal handling": 1,
    },
  },
  {
    name: "taught by a wise women", // Fill in childhood label between quotes here
    story:
      "As a child you befriended a wise women of the clan. Soon you became her apprentice, and learned all about the history of your people, of ancient feats of heroism, and bloody wars.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 3,
      wits: 5,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "lore": 2,
      "insight": 1,
      "healing": 2,
      "animal handling": 1,
    },
  },
  {
    name: "hunter", // Fill in childhood label between quotes here
    story:
      "As a child you learned to live in tune with nature. The hunt is your task, and even if you learned to kill, you also learned to honor the value of the life of every animal.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 4,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "marksmanship": 2,
      "scouting": 2,
      "survival": 1,
      "animal handling": 1,
    },
  },
  {
    name: "child of the winds", // Fill in childhood label between quotes here
    story:
      "You were chosen as a Child of the Winds and set out on a long pilgrimage to the highlands and the mountains. All for the sake of your clan. You fulfilled your duty, but to this day you still unsure of where you feel at home.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "melee": 1,
      "marksmanship": 1,
      "endurance": 1,
      "survival": 2,
      "animal handling": 1,
    },
  },
]

export const ailander: Childhood[] = [
  {
    name: "child of the raven", // Fill in childhood label between quotes here
    story:
      "You grew up among the Raven Sisters, and learned to venerate the Raven god. You learned to fear the Rust Brothers, and to live off the land. It is in the wind that you feel the most free", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 4,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      crafting: 1,
      move: 1,
      scouting: 1,
      lore: 2,
      insight: 1,
    },
  },
  {
    name: "druid's apprentice", // Fill in childhood label between quotes here
    story:
      "You were apprenticed to a druid, and learned everything you could of the holy mysteries, of rituals and sorcery. Your master is long dead, but you still remember his/her words.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 5,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      "scouting": 1,
      "lore": 1,
      "survival": 2,
      "healing": 1,
      "animal handling": 1,
    },
  },
  {
    name: "guardian", // Fill in childhood label between quotes here
    story:
      "The Ailanders were always an oppressed and hunted people. You realized this early on, and were trained to protect your people from dangers with shield and sword in hand. You were soon hardened by battle, and wear the scars to prove it.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 5,
      agility: 4,
      wits: 3,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      might: 1,
      melee: 2,
      marksmanship: 2,
      move: 1,
    },
  },
  {
    name: "wanderer", // Fill in childhood label between quotes here
    story:
      "You had no fixed place in life, the road was your home, and the Forbidden Lands was your neighborhood. Already as a child, you had seen more of the land than most.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "endurance": 1,
      "melee": 1,
      "scouting": 1,
      "survival": 2,
      "animal handling": 1,
    },
  },
  {
    name: "laborer", // Fill in childhood label between quotes here
    story:
      "You worked on a farm performing menial laborious chores. You know everything about grains, cattle, and crops. But deep inside you longed for something else.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 5,
      agility: 3,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "might": 2,
      "melee": 1,
      "crafting": 1,
      "survival": 1,
      "animal handling": 1,
    },
  },
  {
    name: "herder",
    story:
      "You were taught as a child that livestock are the source of life. As an apprentice, you wandered the plains of the Forbidden Lands, guarding your herd. You spent your nights under starry skies, dreaming of adventure.", // Fill in story between quotes here; make sure to avoid newlines between the quotes!
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "might": 1,
      "crafting": 1,
      "scouting": 2,
      "animal handling": 2,
    },
  },
]

export const halfelf: Childhood[] = [
  {
    name: "on the run", // Fill in childhood label between quotes here
    story:
      "You have always been on the run from something. Never felt safe, and never had a lasting home. You have traveled from village to village in the Forbidden Lands, but have never been able to sleep with your back to the door.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 5,
      wits: 3,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      melee: 1,
      stealth: 2,
      scouting: 2,
      insight: 1,
    },
  },
  {
    name: "artist", // Fill in childhood label between quotes here
    story:
      "Already as a child you discovered that you had a talent for artistic endeavors. It was in the arts and performance that you found peace, that was where you lived life to the fulest.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 3,
      wits: 4,
      empathy: 5,
    },
    skills: {
      // Fill in skill names and their value here
      crafting: 2,
      move: 1,
      lore: 1,
      performance: 2,
    },
  },
  {
    name: "student", // Fill in childhood label between quotes here
    story:
      "You always knew that you were a little wiser than your friends. When a sage teacher took you on, you immersed yourself in the mysteries of the world. What you found in books was all that you had ever dreamed of and more.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 5,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      crafting: 1,
      lore: 3,
      insight: 1,
      healing: 1,
    },
  },
  {
    name: "acrobat", // Fill in childhood label between quotes here
    story:
      "As a child you were agile and nimble, climbed everywhere, and discovered every nook in your neighborhood of the village. You learned the art of performance, and the importance of the beauty in the Forbidden Lands.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 5,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "stealth": 1,
      "move": 2,
      "sleight of hand": 2,
      "performance": 1,
    },
  },
  {
    name: "fighter", // Fill in childhood label between quotes here
    story:
      "You learned early on that you were talented with weapons. Soon, you were taken on by a warrior who taught you the mysteries of battle. You trained hard and long, and in time you became your master's equal.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 5,
      wits: 3,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      might: 1,
      endurance: 1,
      melee: 2,
      marksmanship: 2,
    },
  },
  {
    name: "ghost child", // Fill in childhood label between quotes here
    story:
      "You grew up without a real family or home. Instead, you sought out other youths who had run away or been cast out. You were called ghost children, and lived by stealing and performing odd jobs.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 4,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "melee": 1,
      "stealth": 2,
      "sleight of hand": 2,
      "insight": 1,
    },
  },
]

export const halfling: Childhood[] = [
  {
    name: "baker's apprentice", // Fill in childhood label between quotes here
    story: `You have always loved the scent of freshly baked bread. Since childhood,
    you have worked in the kitchen, baking bread that'd make anyone's mouth
    water.`,
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "crafting": 2,
      "sleight of hand": 1,
      "lore": 1,
      "survival": 1,
      "performance": 1,
    },
  },
  {
    name: "laborer", // Fill in childhood label between quotes here
    story:
      "You worked on a farm performing menial laborious chores. You know everything about grains, cattle, and crops. But deep inside you longed for something else.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "might": 2,
      "melee": 1,
      "crafting": 1,
      "survival": 1,
      "animal handling": 1,
    },
  },
  {
    name: "craftsman", // Fill in childhood label between quotes here
    story:
      "You were always skilled with your fingers, and learned to master a craft early on. You expressed yourself through the objects you created. But they also made you long to see the works of the real masters.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 4,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      melee: 1,
      crafting: 3,
      lore: 1,
      insight: 1,
    },
  },
  {
    name: "raised in the kitchen", // Fill in childhood label between quotes here
    story:
      "You spent almost all of your childhood in the kitchen. Among the scents of soups, stews, and brews. Your learned the secrets of spices and the joy of a well-cooked meal.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "crafting": 2,
      "sleight of hand": 1,
      "lore": 1,
      "survival": 1,
      "animal handling": 1,
    },
  },
  {
    name: "bookworm", // Fill in childhood label between quotes here
    story:
      "When other children played in the forest, you preffered to bury your nose in an old book, reading of myths, dragons, and treasures.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 3,
      wits: 5,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "lore": 3,
      "insight": 1,
      "manipulation": 1,
      "animal handling": 1,
    },
  },
  {
    name: "loner", // Fill in childhood label between quotes here
    story:
      "You have never felt at home among your people, always keeping to yourself. You grew up in the shadow of your comrades. You saw things they didn´t see, did things they never imagined.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 4,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      "melee": 1,
      "stealth": 2,
      "sleight of hand": 1,
      "scouting": 1,
      "manipulation": 1,
    },
  },
]

export const goblin: Childhood[] = [
  {
    name: "wolfling", // Fill in childhood label between quotes here
    story:
      "Your parents abandoned you when you were a child, but you found a new home with a wolf pack. You became one of the wolves, howled at the moon, loped across the plains, and ate raw flesh.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 5,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "endurance": 1,
      "melee": 1,
      "stealth": 1,
      "move": 1,
      "animal handling": 2,
    },
  },
  {
    name: "scrounger", // Fill in childhood label between quotes here
    story:
      "You learned as a child that the ownership of objects is nothing but a fleeting thought. You have always had a talent for acquiring things that aren't yours. It's like they just... appear.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 5,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      stealth: 2,
      scouting: 2,
      insight: 1,
      manipulation: 1,
    },
  },
  {
    name: "child of the woods", // Fill in childhood label between quotes here
    story:
      "You grew up under the cover of the forest. You climbed the trees, and felt the wind whisper among the leaves. It is in the forest that you feel safe, and you know that its creatures will always protect you.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 4,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      endurance: 1,
      move: 1,
      marksmanship: 1,
      scouting: 1,
      survival: 2,
    },
  },
  {
    name: "wildling", // Fill in childhood label between quotes here
    story:
      "Your clan was a bunch of mavericks who didn't care for old lineages and pacts. You grew up wild and free, no one has ever been able to tell you what to do.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      might: 1,
      melee: 2,
      move: 2,
      survival: 1,
    },
  },
  {
    name: "wanderer", // Fill in childhood label between quotes here
    story:
      "You had no fixed place in life, the road was your home, and the Forbidden Lands was your neighborhood. Already as a child, you had seen more of the land than most.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 4,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      "endurance": 1,
      "melee": 1,
      "scouting": 1,
      "survival": 2,
      "animal handling": 1,
    },
  },
  {
    name: "storyteller", // Fill in childhood label between quotes here
    story:
      "As a wee goblin, you sat by the fire, eyes like saucers, and listened to the legends of your people being told by the clan elder. In your mind, you traveled through time and space, and relived the fantastic stories. You made sure that you learned all you could from the old goblin, and it didn't take long before you became one of the clan's storytellers.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 3,
      empathy: 5,
    },
    skills: {
      // Fill in skill names and their value here
      lore: 1,
      manipulation: 2,
      performance: 3,
    },
  },
]

export const orc: Childhood[] = [
  {
    name: "minstrel",
    story:
      "It was in the stories of the suffering of your people that you found your true self. In your youth, you learned the songs of the betrayal of the elves, and the blood spilt in the wars. You will never forget.",
    attributes: {
      strength: 3,
      agility: 3,
      wits: 4,
      empathy: 5,
    },
    skills: {
      lore: 1,
      insight: 1,
      manipulation: 1,
      performance: 1,
    },
  },
  {
    name: "worker", // Fill in childhood label between quotes here
    story:
      "Life was hard, even as a young orc. You have toiled for as long as you can remember. Worked hard to be able to live your life as you please.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 5,
      agility: 4,
      wits: 3,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      might: 2,
      endurance: 2,
      crafting: 2,
    },
  },
  {
    name: "brigand", // Fill in childhood label between quotes here
    story:
      "A strong orc is an orc that can care for himself. You realized early on that you must steal to survive. And why not? The orcs have been betrayed time and time again.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 4,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      "melee": 2,
      "stealth": 1,
      "sleight of hand": 1,
      "scouting": 1,
      "survival": 1,
    },
  },
  {
    name: "drifter", // Fill in childhood label between quotes here
    story:
      "You grew up on the road, in the forest, and on the plains. You have never been able to settle in one place. Your restless legs won't let you.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "endurance": 1,
      "melee": 1,
      "scouting": 1,
      "survival": 2,
      "animal handling": 1,
    },
  },
  {
    name: "warrior", // Fill in childhood label between quotes here
    story:
      "You grew up on the battlefield. Had already slain your first enemy as a young orc. It was with weapon in hand that you felt respected for the first time.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 5,
      agility: 4,
      wits: 3,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      might: 1,
      melee: 2,
      marksmanship: 2,
      move: 1,
    },
  },
  {
    name: "loner", // Fill in childhood label between quotes here
    story:
      "You have never felt at home among your people, always keeping to yourself. You grew up in the shadow of your comrades. You saw things they didn´t see, did things they never imagined.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 3,
      wits: 5,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      melee: 1,
      scouting: 1,
      insight: 2,
      survival: 2,
    },
  },
]

export const wolfkin: Childhood[] = [
  {
    name: "howler", // Fill in childhood label between quotes here
    story:
      "You grew up among the howlers, wolfkin that moved between the clans, their own masters, free. You were trained in the telling of the tragic legends that have been told by generations of howlers before you.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 4,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      lore: 1,
      manipulation: 1,
      performance: 3,
      survival: 1,
    },
  },
  {
    name: "hunter", // Fill in childhood label between quotes here
    story:
      "Already as a young pup you learned that blood is life. The older hunters in the clan taught you to respect the animals, even as you kill them. The hunt is the basis of life.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 4,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      endurance: 1,
      melee: 1,
      scouting: 2,
      survival: 2,
    },
  },
  {
    name: "outcast", // Fill in childhood label between quotes here
    story:
      "When the other cubs ran with the pack, you were cast out. Alone, you learned to live off the forest, and that other kin could be more kind than your own. One day, you will find your way home.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 3,
      wits: 5,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      melee: 1,
      scouting: 1,
      insight: 2,
      survival: 2,
    },
  },
  {
    name: "tracker", // Fill in childhood label between quotes here
    story:
      "You learned early on that your sense of smell was better than your comrades, and you soon realized that you could find the most amazing things if you just followed your snout.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 5,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      stealth: 2,
      scouting: 3,
      survival: 1,
    },
  },
  {
    name: "fighter", // Fill in childhood label between quotes here
    story:
      "You were the strongest in your litter, and completely dominated your siblings' games. As you grew bigger, the elders in the clan saw that you were a natural fighter, and trained you in the secrets of battle.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 5,
      agility: 4,
      wits: 3,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      might: 2,
      melee: 3,
      move: 1,
    },
  },
  {
    name: "child of the forest", // Fill in childhood label between quotes here
    story:
      "Ever since you were a child, you've been drawn to the fruits of the forests, to flowers, herbs, and lakes. You learned everything you could from the clan's herbalist, the scent of every flower, and which plants nurtured life - or ended it.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 4,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      lore: 2,
      scouting: 1,
      survival: 3,
    },
  },
]

export const dwarf: Childhood[] = [
  {
    name: "smith's apprentice", // Fill in childhood label between quotes here
    story:
      "It has always in the sweltering heat of the forge that you felt most at home. You learned the mystery of steel during many long days in the glow of the fire.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 5,
      agility: 3,
      wits: 4,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      might: 1,
      endurance: 1,
      melee: 1,
      crafting: 3,
    },
  },
  {
    name: "mineborn", // Fill in childhood label between quotes here
    story:
      "Already as a child, you learned to navigate in the darkness, deep below the eart. It was in the presence of the rock and the cold that you felt most at home.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 4,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      endurance: 2,
      crafting: 1,
      scouting: 1,
      survival: 2,
    },
  },
  {
    name: "scout's apprentice", // Fill in childhood label between quotes here
    story:
      "You were always perceptive, always curious. It soon came to the attention of your clan members, and you were handpicked to learn the duties of a scout. Many long days where spent hiding, watching the dangers of the Forbidden Lands.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 4,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      melee: 1,
      stealth: 2,
      scouting: 2,
      survival: 1,
    },
  },
  {
    name: "guardian-in-training", // Fill in childhood label between quotes here
    story:
      "You were chosen to be a guardian-in-training, serving as something similar to a squire to a proud and powerful dwarven warrior. It was arduous work, but also educational. Your master taught you to handle weapons, to temper your courage, and to stand proud - no matter the dangers you face.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 5,
      agility: 4,
      wits: 3,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      might: 2,
      endurance: 1,
      melee: 2,
      marksmanship: 1,
    },
  },
  {
    name: "carver", // Fill in childhood label between quotes here
    story:
      "Dwarves have always burrowed inwards and downwards. Created life out of rock. As a child you were fascinated by the art of shaping the mountain after your image. You became a carver, an engineer and builder, who worked as much with the mind as with brute strength.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 3,
      wits: 5,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      might: 1,
      crafting: 2,
      lore: 2,
      survival: 1,
    },
  },
  {
    name: "hard studies", // Fill in childhood label between quotes here
    story:
      "A learned man or woman took you under his/her wing and set you to studying the elder writings. The days were long, the learning hard, but in the end, you found that knowledge was the key to the world.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 3,
      wits: 5,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      crafting: 1,
      lore: 3,
      insight: 1,
      manipulation: 1,
    },
  },
]

export const elf: Childhood[] = [
  {
    name: "loner", // Fill in childhood label between quotes here
    story:
      "You have never felt at home among your people, always keeping to yourself. You grew up in the shadow of your comrades. You saw things they didn´t see, did things they never imagined.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 3,
      wits: 5,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      melee: 1,
      scouting: 1,
      insight: 2,
      survival: 2,
    },
  },
  {
    name: "fighter", // Fill in childhood label between quotes here
    story:
      "You learned early on that you were talented with weapons. Soon, you were taken on by a warrior who taught you the mysteries of battle. You trained hard and long, and in time you became your master's equal.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 5,
      wits: 3,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      might: 1,
      endurance: 1,
      melee: 2,
      marksmanship: 2,
    },
  },
  {
    name: "child of the forest", // Fill in childhood label between quotes here
    story:
      "Ever since you were a child, you've been drawn to the fruits of the forests, to flowers, herbs, and lakes. You learned everything you could from the clan's herbalist, the scent of every flower, and which plants nurtured life - or ended it.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 4,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      lore: 2,
      scouting: 1,
      survival: 3,
    },
  },
  {
    name: "hard studies", // Fill in childhood label between quotes here
    story:
      "A learned man or woman took you under his/her wing and set you to studying the elder writings. The days were long, the learning hard, but in the end, you found that knowledge was the key to the world.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 3,
      wits: 5,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      crafting: 1,
      lore: 3,
      insight: 1,
      manipulation: 1,
    },
  },
  {
    name: "wanderer", // Fill in childhood label between quotes here
    story:
      "You had no fixed place in life, the road was your home, and the Forbidden Lands was your neighborhood. Already as a child, you had seen more of the land than most.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 4,
      agility: 4,
      wits: 3,
      empathy: 4,
    },
    skills: {
      // Fill in skill names and their value here
      "endurance": 1,
      "melee": 1,
      "scouting": 1,
      "survival": 2,
      "animal handling": 1,
    },
  },
  {
    name: "druid's apprentice", // Fill in childhood label between quotes here
    story:
      "You were apprenticed to a druid, and learned everything you could of the holy mysteries, of rituals and sorcery. Your master is long dead, but you still remember his/her words.", // Fill in story between quotes here
    attributes: {
      // Fill in correct attributes and values here
      strength: 3,
      agility: 4,
      wits: 5,
      empathy: 3,
    },
    skills: {
      // Fill in skill names and their value here
      "scouting": 1,
      "lore": 1,
      "survival": 2,
      "healing": 1,
      "animal handling": 1,
    },
  },
]

export const childhoodAll: { [index: string]: Childhood[] } = {
  ailander,
  alderlander,
  aslene,
  dwarf,
  elf,
  goblin,
  halfelf,
  halfling,
  orc,
  wolfkin,
}

export default childhoodAll
