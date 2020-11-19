import { CharData } from "@/data/character/characterData"
import {
  IDiceConfigWithLog,
  IDiceConfigLogEntry,
  IDiceAction,
  IConfigBase,
  IConfigSkill,
  IConfigAttribute,
  IConfigCombat,
  IDiceConfig,
  TDiceConfigLog,
} from "./diceTypes"

import { ItemShield, ItemWeapon, WEAPON_CATEGORY } from "@/data/items/itemTypes"
// import {
//   Attribute as TAttribute,
//   Skill as TSkill,
//   DiceTypes as TDice,
// } from "@/types"

import * as T from "./translationKeys"
import { ACTION_FAST, ACTION_SLOW, ACTION_ALL } from "@/data/combat/typesCombat"

function pruneConfig(config: any): IDiceConfigWithLog {
  const newObj: any = {}
  Object.keys(config).forEach((prop: any) => {
    if (config[prop]) {
      newObj[prop] = config[prop]
    }
  })
  return newObj
}

/** Add the number of dice and logs of several dice configurations */
function addConfigs(...configs: IDiceConfigWithLog[]): IDiceConfigWithLog {
  const sumTwoConfigs = (c1: IDiceConfigWithLog, c2: IDiceConfigWithLog) => ({
    white: (c1.white || 0) + (c2.white || 0),
    red: (c1.red || 0) + (c2.red || 0),
    black: (c1.black || 0) + (c2.black || 0),
    blue: (c1.blue || 0) + (c2.blue || 0),
    green: (c1.green || 0) + (c2.green || 0),
    orange: (c1.orange || 0) + (c2.orange || 0),
    // log: [...(c1.log || []), ...(c2.log || [])],
    log: [...c1.log, ...c2.log],
  })
  return configs.reduce(sumTwoConfigs)
}

function getConfigBonus(config: IConfigBase): IDiceConfigWithLog {
  const red = config.bonus || 0
  const log: IDiceConfigLogEntry[] = red
    ? [
        {
          dice: "red",
          modifier: red,
          reason: T.DICE_CONF_BONUS_APPLIED,
          id: "bonus",
          rank: red,
        },
      ]
    : []
  return { red, log }
}

function getConfigAttribute(config: IConfigAttribute): IDiceConfigWithLog {
  const { charData, attributeType } = config
  const attrMax = Number(charData.attributes[attributeType])
  const attrDmg = Number(charData.attributeDmg[attributeType])
  const white = Math.max(attrMax - attrDmg, 0)
  const log: IDiceConfigLogEntry[] = [
    {
      dice: "white",
      modifier: white,
      reason: T.DICE_CONF_BASE_ATTRIBUTE,
      id: attributeType,
      rank: white,
    },
  ]
  return { white, log }
}

function getConfigSkill(config: IConfigSkill): IDiceConfigWithLog {
  const { charData, skill: skillId } = config
  const skill = charData.skills[skillId]
  const attributeType = skill.attribute
  const confAttributes = getConfigAttribute({
    type: "attribute",
    attributeType,
    charData,
  })
  const red = Number(skill.rank) || 0
  const log: IDiceConfigLogEntry[] = [
    {
      dice: "red",
      modifier: red,
      reason: T.DICE_CONF_FROM_SKILL,
      id: skill.id,
      rank: red,
    },
  ]
  // TODO: Apply bonus for items with applicable skill mods
  // const f = charData.gear.equipped.map((item) =>
  //   (item.skillMods || []).filter((s) => s.id === skill.id)
  // )
  return addConfigs(confAttributes, { red, log })
}

function getConfigCombat(config: IConfigCombat): IDiceConfigWithLog {
  const { charData } = config
  switch (config.action) {
    case "melee":
      return getConfigSkill({
        type: "skill",
        skill: "melee",
        charData,
      })
    // melee skill
    // log item dmg
    // add item bonus
    // if item applicable for talent, add dice based on that

    default:
      break
  }
  return { log: [] }
}

/**
 * Get a dice configuration based on a player's stats, and what type of dice
 * action they wish to perform.
 *
 * The config also includes a log with information on what effects lead to
 * adding/removing dice.
 */
export function getDice(config: IDiceAction): IDiceConfigWithLog {
  switch (config.type) {
    case "attribute":
      return pruneConfig(
        addConfigs(
          getConfigAttribute(config as IConfigAttribute),
          getConfigBonus(config)
        )
      )
    case "skill":
      return pruneConfig(
        addConfigs(
          getConfigSkill(config as IConfigSkill),
          getConfigBonus(config)
        )
      )

    case "combat":
      return pruneConfig(
        addConfigs(
          getConfigCombat(config as IConfigCombat),
          getConfigBonus(config)
        )
      )
    default:
      return { log: [] }
  }
}
export default getDice

function diceLogArmor(c: CharData): IDiceConfigLogEntry[] {
  const log: IDiceConfigLogEntry[] = []
  const armor = c.gear.inventory.find((i) => i.equipped && i.type === "armor")
  if (armor?.bonus) {
    log.push({
      dice: "black",
      modifier: armor.bonus,
      id: "armor",
      name: armor.name,
    })
  }

  const helmet = c.gear.inventory.find((i) => i.equipped && i.type === "helmet")
  if (helmet?.bonus) {
    log.push({
      dice: "black",
      modifier: helmet.bonus,
      id: "helmet",
      name: helmet.name,
    })
  }

  return log
}

export function diceLogCombat(
  c: CharData,
  action: ACTION_ALL,
  item: ItemWeapon | ItemShield,
  monster?: boolean
) {
  const log: IDiceConfigLogEntry[] = []

  function fighterBonus(id: string, rank: number): IDiceConfigLogEntry[] {
    const _log: IDiceConfigLogEntry[] = []
    if (rank >= 1) {
      _log.push({
        dice: "red",
        modifier: 1,
        id,
        rank: rank > 1 ? ">1" : rank,
      })
    }
    if (rank === 3) {
      _log.push({ dice: "green", modifier: 1, id, rank })
    }
    return _log
  }

  if (
    (action === ACTION_SLOW.slash || action === ACTION_SLOW.stab) &&
    item.type === "weapon" &&
    item.category
  ) {
    c.talents.forEach((talent) => {
      const { id, rank = 0 } = talent

      if (
        (id === "axe fighter" && item.category === WEAPON_CATEGORY.axe) ||
        (id === "sword fighter" && item.category === WEAPON_CATEGORY.sword) ||
        (id === "hammer fighter" && item.category === WEAPON_CATEGORY.blunt) ||
        (id === "knife fighter" && item.category === WEAPON_CATEGORY.knife) ||
        (id === "spear fighter" && item.category === WEAPON_CATEGORY.polearm)
      ) {
        if (rank >= 1) {
          log.push({
            dice: "red",
            modifier: 1,
            id,
            rank: rank > 1 ? ">1" : rank,
          })
        }
        if (talent.rank === 3) {
          log.push({ dice: "green", modifier: 1, id, rank })
        }
      }
    })
  }

  if (action === ACTION_SLOW.shoot && item.type === "weapon" && item.category) {
    c.talents.forEach((talent) => {
      const { id, rank = 0 } = talent

      if (
        item.category &&
        id === "sharpshooter" &&
        [WEAPON_CATEGORY.bow, WEAPON_CATEGORY.crossbow].includes(item.category)
      ) {
        if (rank >= 1) {
          log.push({
            dice: "red",
            modifier: 1,
            id,
            rank: rank > 1 ? ">1" : rank,
          })
        }
        if (talent.rank === 3) {
          log.push({ dice: "green", modifier: 1, id, rank })
        }
      }
    })
  }

  if (action === ACTION_FAST.parry) {
    c.talents.forEach((talent) => {
      const { id, rank = 0 } = talent
      if (
        id === "defender" &&
        (item.type === "shield" ||
          (item.type === "weapon" && item.features.parrying))
      ) {
        log.push({ dice: "red", modifier: 1, id, rank })
      }
      if (id === "shield fighter" && item.type === "shield") {
        log.push(...fighterBonus(id, rank))
      }
    })
  }

  return log
}

// /** Merge multiple dice config logs */
// function mergeLogs(logs: TDiceConfigLog[]): TDiceConfigLog {
//   // return logs.reduce((l1: TDiceConfigLog, l2: TDiceConfigLog) => {
//   //   return [...l1, ...l2]
//   // }, [])
//   return logs.flat()
// }

// /** Calculate number of dice to roll based on an array of dice config logs */
// export function convertLogsToConfig(logs: TDiceConfigLog[]): IDiceConfig {
//   // return convertLogToConfig(mergeLogs(logs))
//   return convertLogToConfig(logs.flat())
// }

/** Calculate the number of dice to roll based on a dice config log.
 *
 * PROTIP: If you have multiple separate logs, use Array.flat() to flatten logs
 * before sending in as a param:
 *   const log = [log1, log2].flat()
 *   const diceConfig = convertLogToConfig(log)
 */
export function convertLogToConfig(log: IDiceConfigLogEntry[]): IDiceConfig {
  const conf: IDiceConfig = {
    white: 0,
    red: 0,
    black: 0,
    green: 0,
    blue: 0,
    orange: 0,
  }
  log.forEach((log) => {
    conf[log.dice] = (conf[log.dice] || 0) + log.modifier
  })
  return conf
}
