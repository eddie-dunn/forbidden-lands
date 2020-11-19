import { CharData } from "@/data/character/characterData"
import { IDiceConfigLogEntry, IDiceConfig, TDiceConfigLog } from "./diceTypes"

import { Item, WEAPON_CATEGORY } from "@/data/items/itemTypes"

import { ACTION_FAST, ACTION_SLOW, ACTION_ALL } from "@/data/combat/typesCombat"
import { TSkillId } from "@/types"
import { talentBonusLookup } from "./talentBonus"

// =============================================================================
// Dice configs logs
// =============================================================================

export function diceLogArmor(c: CharData): IDiceConfigLogEntry[] {
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

export function diceLogBonus(modifier: number): TDiceConfigLog {
  return [{ dice: "red", modifier, id: "bonus" }]
}

export function diceLogAttributes(
  c: CharData,
  skillId?: TSkillId
): TDiceConfigLog {
  if (!skillId) return []
  const skill = c.skills[skillId]
  const attrMax = Number(c.attributes[skill.attribute])
  const attrDmg = Number(c.attributeDmg[skill.attribute])
  const modifier = Math.max(attrMax - attrDmg, 0)
  return [{ dice: "white", modifier, id: skill.attribute }]
}

export function diceLogSkill(c: CharData, skillId?: TSkillId): TDiceConfigLog {
  if (!skillId || !c) return []
  const skill = c.skills[skillId]
  const id = skill.id
  const modifier = Number(skill.rank)

  // TODO: Check items with skill modifier
  // const itemBonus = c.gear.inventory
  //   .flatMap((item) => item.skillMods)
  //   .filter((skillMod) => skillMod?.id === skill.id)
  //   .reduce((a, b) => {
  //     return a + (b?.mod || 0)
  //   }, 0)
  // console.log({ itemBonus })
  return [{ dice: "red", modifier, id }]
}

export function diceLogItem(item?: Item): TDiceConfigLog {
  if (!item) return []
  const modifier = item.bonus
  const id = item.type
  const name = item.name
  return [{ dice: "black", modifier, id, name }]
}

export function diceLogCombat(
  c: CharData,
  actionId: ACTION_ALL,
  item?: Item,
  monster?: boolean
): TDiceConfigLog {
  const log: TDiceConfigLog = []
  c.talents.forEach((talent) => {
    const { id, rank } = talent
    const lookup = talentBonusLookup[id]
    if (
      lookup &&
      lookup.applicable({ monster, action: actionId, item, rank })
    ) {
      log.push(...lookup.bonus(rank || 0))
    }
  })

  return log
}

/*
export function diceLogCombat2(
  c: CharData,
  actionId: TCombatAction | "armor",
  // item: ItemWeapon | ItemShield | undefined,
  item?: Item,
  monster?: boolean
): TDiceConfigLog {
  if (actionId === "armor") {
    return diceLogArmor(c)
  }

  const log: TDiceConfigLog = []

  // const _rank = (rank: number, min: number = 1) =>
  //   rank > min ? `>${min}` : rank

  function fighterBonus(id: string, rank: number): TDiceConfigLog {
    const _log: TDiceConfigLog = []
    if (rank >= 1) {
      _log.push({
        dice: "red",
        modifier: 1,
        id,
        rank,
      })
    }
    if (rank === 3) {
      _log.push({ dice: "green", modifier: 1, id, rank })
    }
    return _log
  }

  const isAttack = [
    ACTION_SLOW.slash,
    ACTION_SLOW.stab,
    ACTION_SLOW.shoot,
    ACTION_SLOW.unarmed_attack,
    ACTION_SLOW.charge,
  ].includes(actionId as ACTION_SLOW)

  if (isAttack) {
    c.talents.forEach((talent) => {
      const { id, rank = 0 } = talent
      const itemCategory = item?.type === "weapon" ? item.category : null

      if (
        (id === "axe fighter" && itemCategory === WEAPON_CATEGORY.axe) ||
        (id === "hammer fighter" && itemCategory === WEAPON_CATEGORY.blunt) ||
        (id === "knife fighter" && itemCategory === WEAPON_CATEGORY.knife) ||
        (id === "spear fighter" && itemCategory === WEAPON_CATEGORY.polearm) ||
        (id === "sword fighter" && itemCategory === WEAPON_CATEGORY.sword) ||
        (id === "sharpshooter" && itemCategory === WEAPON_CATEGORY.bow) ||
        (id === "sharpshooter" && itemCategory === WEAPON_CATEGORY.crossbow) ||
        (id === "throwing arm" && itemCategory === WEAPON_CATEGORY.thrown) ||
        (id === "dragonslayer" && monster)
      ) {
        log.push(...fighterBonus(id, rank))
      }
      if (id === "melee charge" && actionId === ACTION_SLOW.charge) {
        if (rank >= 2) {
          log.push({ dice: "red", modifier: 1, id, rank })
        }
        if (rank === 3) {
          log.push({ dice: "green", modifier: 1, id, rank })
        }
      }

      if (id === "horseback fighter" && c.mount.mounted && rank >= 2) {
        log.push({ dice: "red", modifier: 1, id, rank })
      }
    })
  }

  if (actionId === ACTION_FAST.parry || actionId === ACTION_FAST.dodge) {
    c.talents.forEach((talent) => {
      const { id, rank = 0 } = talent

      if (id === "shield fighter" && item?.type === "shield") {
        log.push(...fighterBonus(id, rank))
      }
      if (
        (id === "defender" && rank >= 2 && actionId === ACTION_FAST.parry) ||
        (id === "fast footwork" && rank >= 2 && actionId === ACTION_FAST.dodge)
      ) {
        log.push({ dice: "red", modifier: 1, id, rank })
      }
    })
  }

  return log
}
*/

// =============================================================================
// Configs
// =============================================================================

/** Remove fields from an object if they contain falsy values */
function pruneConfig(config: any): IDiceConfig {
  const newObj: any = {}
  Object.keys(config).forEach((prop: any) => {
    if (config[prop]) {
      newObj[prop] = config[prop]
    }
  })
  return newObj
}

/** Calculate the number of dice to roll based on a dice config log.
 *
 * PROTIP:
 * If you have multiple separate logs, use Array.flat() to flatten logs
 * before sending in as a param:
 *   const log = [log1, log2].flat()
 *   const diceConfig = convertLogToConfig(log)
 */
export function convertLogToConfig(log: TDiceConfigLog): IDiceConfig {
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
  return pruneConfig(conf)
}
