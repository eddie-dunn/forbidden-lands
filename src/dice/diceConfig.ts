import {
  IDiceConfigWithLog,
  IDiceConfigLogEntry,
  IDiceAction,
  IConfigBase,
  IConfigSkill,
  IConfigAttribute,
  IConfigCombat,
} from "./diceTypes"

import * as T from "./translationKeys"

function pruneConfig(config: any): IDiceConfigWithLog {
  let newObj: any = {}
  Object.keys(config).forEach((prop: any) => {
    if (config[prop]) {
      newObj[prop] = config[prop]
    }
  })
  return newObj
}

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
    { dice: "white", modifier: white, reason: T.DICE_CONF_BASE_ATTRIBUTE },
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
    { dice: "red", modifier: red, reason: T.DICE_CONF_FROM_SKILL },
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

/*
Brainstorm

- Show dice stats; 
  - 1|2|..|nbr Dice success % (dropdown)
  - 1|2|..|nbr Dice white bane % (dropdown)
  - 1|2|..|nbr Dice black bane % (dropdown)

- Roll/push dice with buttons in expander

- Push disabled if 
  - roll-log length < 1
  - pushed and not dwarf
  - pushed and wp < 1

- Add ability to roll D66 && D666

- Add talent bonus die
  - Go through all weapons and add weapon class (blunt, polearm, sword,
  knife, axe, bow, xbow)
  - foo
  - add logic to match weapon class to talent


*/
