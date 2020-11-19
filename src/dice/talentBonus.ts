import { ACTION_ALL, ACTION_FAST, ACTION_SLOW } from "@/data/combat/typesCombat"
import { Item, ITEM_WEIGHT, WEAPON_CATEGORY } from "@/data/items/itemTypes"
import { IDiceConfigLogEntry, TDiceConfigLog } from "@/dice/diceTypes"
import { TalentAll, TalentGeneral } from "@/types"
import { getEnabledCategories } from "trace_events"

type TalentConfigLog = (IDiceConfigLogEntry & { id: TalentGeneral })[]

interface ITalent {
  id?: TalentGeneral
  applicable: (o: {
    monster: boolean | undefined
    action: ACTION_ALL
    item: Item | undefined
    rank: number | undefined
  }) => boolean
  bonus: (rank: number) => TalentConfigLog
}

//#region helpers
function fighterBonus(id: TalentGeneral, rank: number): TalentConfigLog {
  const _log: TalentConfigLog = []
  if (rank >= 1) {
    _log.push({
      dice: "red",
      modifier: 1,
      id,
      rank: 1,
    })
  }
  if (rank >= 3) {
    _log.push({ dice: "green", modifier: 1, id, rank: 3 })
  }
  return _log
}

function isWeaponCategory(
  cat: WEAPON_CATEGORY | WEAPON_CATEGORY[],
  item?: Item
) {
  return (
    item?.type === "weapon" &&
    (item.category === cat ||
      (Array.isArray(cat) && !!cat.find((c) => item.category === c)))
  )
}

const isMeleeAttack = (actionId?: string): boolean =>
  [
    ACTION_SLOW.slash,
    ACTION_SLOW.stab,
    ACTION_SLOW.unarmed_attack,
    ACTION_SLOW.charge,
  ].includes(actionId as ACTION_SLOW)
////#endregion helpers

//#region talent checkers
const dragonSlayer: ITalent = {
  id: "dragonslayer",
  applicable: (o) => !!o?.monster && isMeleeAttack(o.action),
  bonus: (rank: number) => fighterBonus("dragonslayer", rank),
}

const swordFighter: ITalent = {
  id: "sword fighter",
  applicable: (o) =>
    isWeaponCategory(WEAPON_CATEGORY.sword, o.item) && isMeleeAttack(o.action),
  bonus: (rank: number) => fighterBonus("sword fighter", rank),
}

const hammerFighter: ITalent = {
  id: "hammer fighter",
  applicable: (o) =>
    isWeaponCategory(WEAPON_CATEGORY.blunt, o.item) && isMeleeAttack(o.action),
  bonus: (rank: number) => fighterBonus("hammer fighter", rank),
}

const spearFighter: ITalent = {
  applicable: (o) =>
    isWeaponCategory(WEAPON_CATEGORY.polearm, o.item) &&
    isMeleeAttack(o.action),
  bonus: (rank: number) => fighterBonus("spear fighter", rank),
}

const axeFighter: ITalent = {
  applicable: (o) =>
    isWeaponCategory(WEAPON_CATEGORY.axe, o.item) && isMeleeAttack(o.action),
  bonus: (rank: number) => fighterBonus("axe fighter", rank),
}

const knifeFighter: ITalent = {
  applicable: (o) =>
    isWeaponCategory(WEAPON_CATEGORY.knife, o.item) && isMeleeAttack(o.action),
  bonus: (rank: number) => fighterBonus("knife fighter", rank),
}

const sharpshooter: ITalent = {
  applicable: (o) =>
    isWeaponCategory([WEAPON_CATEGORY.bow, WEAPON_CATEGORY.crossbow], o.item) &&
    o.action === ACTION_SLOW.shoot,
  bonus: (rank: number) => fighterBonus("sharpshooter", rank),
}

const throwingArm: ITalent = {
  applicable: (o) =>
    isWeaponCategory(WEAPON_CATEGORY.thrown, o.item) &&
    o.action === ACTION_SLOW.shoot,
  bonus: (rank: number) => fighterBonus("throwing arm", rank),
}

const nullTalent: ITalent = {
  applicable: () => false,
  bonus: () => [],
}

const meleeCharge: ITalent = {
  applicable: (o) => o.action === ACTION_SLOW.charge,
  bonus: (rank) => {
    const log: (IDiceConfigLogEntry & { id: TalentGeneral })[] = []
    if (rank >= 2) {
      log.push({ id: "melee charge", dice: "red", modifier: 1, rank: 2 })
    }
    if (rank >= 3) {
      log.push({ id: "melee charge", dice: "green", modifier: 1, rank: 3 })
    }
    return log
  },
}

const horsebackFighter: ITalent = {
  applicable: (o) => isMeleeAttack(o.action),
  bonus: (rank) => {
    const log: (IDiceConfigLogEntry & { id: TalentGeneral })[] = []
    if (rank >= 2) {
      log.push({ id: "horseback fighter", dice: "red", modifier: 1, rank: 2 })
    }
    return log
  },
}

const shieldFighter: ITalent = {
  applicable: (o) =>
    o.action === ACTION_FAST.parry && o.item?.type === "shield",
  bonus: (rank) => fighterBonus("shield fighter", rank),
}

const defender: ITalent = {
  applicable: (o) => o.action === ACTION_FAST.parry && Number(o?.rank) >= 2,
  bonus: (rank) =>
    rank >= 2 ? [{ id: "defender", dice: "red", modifier: 1, rank: 2 }] : [],
}

const fastFootWork: ITalent = {
  applicable: (o) => o.action === ACTION_FAST.dodge && Number(o?.rank) >= 2,
  bonus: (rank) =>
    rank >= 2
      ? [{ id: "fast footwork", dice: "red", modifier: 1, rank: 2 }]
      : [],
}
//#endregion talent checkers

export const talentBonusLookup: { [key in TalentAll]?: ITalent } = {
  "ambidextrous": nullTalent,

  "dragonslayer": dragonSlayer,
  "axe fighter": axeFighter,
  "knife fighter": knifeFighter,
  "spear fighter": spearFighter,
  "hammer fighter": hammerFighter,
  "sword fighter": swordFighter,
  "sharpshooter": sharpshooter,
  "throwing arm": throwingArm,
  "shield fighter": shieldFighter,

  "defender": defender,
  "fast footwork": fastFootWork,

  "melee charge": meleeCharge,
  "horseback fighter": horsebackFighter,
}
