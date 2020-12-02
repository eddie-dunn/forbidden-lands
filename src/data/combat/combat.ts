import { CharData } from "@/data/character/characterData"
import { Item, ItemWeapon } from "@/data/items/itemTypes"
import {
  ICombatAction,
  ACTION_FAST,
  ACTION_SLOW,
  ICombatState,
  ACTION_ALL,
} from "./typesCombat"

const weaponEquipped = (item: Item): ItemWeapon | null => {
  if (item.type === "weapon" && item.equipped && item.bonus > 0) {
    return item
  }
  return null
}

export function isDmgAttack(action: ACTION_ALL) {
  if (!action) {
    return false
  }
  return [
    ACTION_FAST.grapple_attack,
    ACTION_SLOW.charge,
    ACTION_SLOW.shoot,
    ACTION_SLOW.slash,
    ACTION_SLOW.stab,
    ACTION_SLOW.unarmed_attack,
  ].includes(action)
}

export const isMeleeAttack = (actionId?: ACTION_ALL): boolean =>
  actionId
    ? [
        ACTION_SLOW.slash,
        ACTION_SLOW.stab,
        ACTION_SLOW.unarmed_attack,
        ACTION_SLOW.charge,
        ACTION_FAST.disarm,
        ACTION_FAST.shove,
      ].includes(actionId)
    : false

export const isAttack = (actionId?: ACTION_ALL): boolean =>
  isMeleeAttack(actionId) || ACTION_SLOW.shoot === actionId

/*
ACTION            PREREQUISITE                    SKILL
Slash             Edged or Blunt weapon           Melee
Stab              Pointed weapon                  Melee
Punch/Kick/Bite   Unarmed                         Melee
Grapple           Unarmed                         Melee
Break Free        You are Grappled                Melee
Shoot             Ranged weapon                   Marksmanship
Persuade          The opponent can hear you       Manipulation
Taunt             The opponent can hear you       Performance
Cast              Spell You are a Druid or        None, see Chapter 6
|                 a Sorcerer
Flee              No enemy at Arm’s Length        Move
Crawl             You are prone                   None
Charge            At Near range                   Melee, Charge talent
*/
export const actionsSlow: (ICombatAction & { id: ACTION_SLOW })[] = [
  // ACTION            PREREQUISITE                    SKILL
  // Slash             Edged or Blunt weapon           Melee
  {
    id: ACTION_SLOW.slash,
    prerequisite: () => "Edged or blunt weapon",
    prereqOk: (c: CharData) =>
      !!c.gear.inventory.find((item) => {
        const weapon = weaponEquipped(item)
        return weapon?.features.blunt || weapon?.features.edged
      }),
    skill: "melee",
  },
  // Stab              Pointed weapon                  Melee
  {
    id: ACTION_SLOW.stab,
    prerequisite: () => "Pointed weapon",
    prereqOk: (c: CharData) =>
      !!c.gear.inventory.find(
        (item) => weaponEquipped(item)?.features?.pointed
      ),
    skill: "melee",
  },
  // Punch/Kick/Bite   Unarmed                         Melee
  {
    id: ACTION_SLOW.unarmed_attack,
    prerequisite: () => "unarmed",
    prereqOk: (c: CharData) =>
      !c.gear.inventory.some((item) => weaponEquipped(item)),
    skill: "melee",
  },
  // Grapple           Unarmed                         Melee
  {
    id: ACTION_SLOW.grapple,
    prerequisite: () => "unarmed",
    prereqOk: (c: CharData) =>
      !c.gear.inventory.some((item) => weaponEquipped(item)),
    skill: "melee",
  },
  // Break Free        You are Grappled                Melee
  {
    id: ACTION_SLOW.break_free,
    prerequisite: () => "you are Grappled",
    prereqOk: () => true, // TODO
    skill: "melee",
  },
  // Shoot             Ranged weapon                   Marksmanship
  {
    id: ACTION_SLOW.shoot,
    prerequisite: () => "ranged weapon",
    prereqOk: (c: CharData) =>
      !!c.gear.inventory.find(
        (item) => (weaponEquipped(item)?.range || 0) > 1
        // Improve validation with 'ranged' field on weapon?
      ),
    skill: "marksmanship",
  },
  // Persuade          The opponent can hear you       Manipulation
  {
    id: ACTION_SLOW.persuade,
    prerequisite: () => "the opponent can hear you",
    prereqOk: () => true,
    skill: "manipulation",
  },
  // Taunt             The opponent can hear you       Performance
  {
    id: ACTION_SLOW.taunt,
    prerequisite: () => "the opponent can hear you",
    prereqOk: () => true,
    skill: "performance",
  },
  // Cast              Spell You are a Druid or        None, see Chapter 6
  // |                 a Sorcerer
  {
    id: ACTION_SLOW.cast_spell,
    prerequisite: () => "you are a Druid or Sorcerer",
    prereqOk: (c: CharData) => {
      return Boolean(c.profession === "druid" || c.profession === "sorcerer")
    },
    skill: null,
  },
  // Flee              No enemy at Arm’s Length        Move
  {
    id: ACTION_SLOW.flee,
    prerequisite: () => "no enemy at Arm's Length",
    prereqOk: () => true,
    skill: "move",
  },
  // Crawl             You are prone                   None
  {
    id: ACTION_SLOW.crawl,
    prerequisite: () => "you are prone",
    prereqOk: () => true,
    skill: null,
  },
  // Charge            At Near range                   Melee, Charge talent
  {
    id: ACTION_SLOW.charge,
    prerequisite: () => "enemy at Near range, Melee Charge talent",
    prereqOk: (c: CharData) => {
      return Boolean(c.talents.find((talent) => talent.id === "melee charge"))
    },
    skill: "melee",
  },
]

/*
FAST ACTION       PREREQUISITE                    SKILL
Dodge             –                               Move
Parry             Shield or Parrying weapon       Melee
Draw Weapon       –                               –
Swing Weapon      Heavy weapon, must be           -
|                 performed right before a
|                 close combat attack
Get Up            You are prone                   –
Shove             –                               Melee
Disarm            Your target holds a weapon      Melee
Feint             Enemy at Arm’s Length           –
Run               No enemy at Arm’s Length        Move (in Rough zone)
Retreat           Enemy at Arm’s Length           Move
Grapple Attack    You’ve Grappled an opponent     Melee
Ready Weapon      Ranged weapon                   –
Aim               Ranged, Short distance or more  –
Power Word        You are a Druid or a Sorcerer   None, see Chapter 6
Use Item          Varies                          Varies
*/
export const actionsFast: (ICombatAction & { id: ACTION_FAST })[] = [
  // FAST ACTION       PREREQUISITE                    SKILL
  // Dodge             –                               Move
  {
    id: ACTION_FAST.dodge,
    prerequisite: () => "-",
    prereqOk: () => true,
    skill: "move",
  },
  // Parry             Shield or Parrying weapon       Melee
  {
    id: ACTION_FAST.parry,
    prerequisite: () => "shield or parrying weapon",
    prereqOk: (c: CharData) =>
      !!c.gear.inventory
        .filter((item) => item.equipped)
        .find(
          (item) =>
            item.type === "shield" ||
            (item.type === "weapon" && item?.features?.parrying)
        ), // TODO
    skill: "melee",
  },
  // Draw Weapon       –                               –
  {
    id: ACTION_FAST.draw_weapon,
    prerequisite: () => "-",
    prereqOk: () => true, // TODO
    skill: null,
  },
  // Swing Weapon      Heavy weapon, must be           -
  // |                 performed right before a
  // |                 close combat attack
  {
    id: ACTION_FAST.swing_weapon,
    prerequisite: () =>
      "Heavy weapon, must be performed right before a close combat attack",
    prereqOk: (c: CharData, state?: ICombatState) =>
      !!c.gear.inventory.find((item) => weaponEquipped(item)?.range === 0) &&
      !state?.slowActionPerformed,
    skill: null,
  },
  // Get Up            You are prone                   –
  {
    id: ACTION_FAST.get_up,
    prerequisite: () => "you are prone",
    prereqOk: () => true, // TODO
    skill: null,
  },
  // Shove             –                               Melee
  {
    id: ACTION_FAST.shove,
    prerequisite: () => "-",
    prereqOk: () => true, // TODO
    skill: "melee",
  },
  // Disarm            Your target holds a weapon      Melee
  {
    id: ACTION_FAST.disarm,
    prerequisite: () => "your target holds a weapon",
    prereqOk: () => true, // TODO
    skill: "melee",
  },
  // Feint             Enemy at Arm’s Length           –
  {
    id: ACTION_FAST.feint,
    prerequisite: () => "enemy at Arm's Length",
    prereqOk: () => true, // TODO
    skill: null,
  },
  //Run               No enemy at Arm’s Length        Move (in Rough zone)
  {
    id: ACTION_FAST.run,
    prerequisite: () => "no enemy at Arm's Length",
    prereqOk: () => true, // TODO
    skill: "move",
  },
  //Retreat           Enemy at Arm’s Length           Move
  {
    id: ACTION_FAST.retreat,
    prerequisite: () => "enemy at Arm's Length",
    prereqOk: () => true, // TODO
    skill: "move",
  },
  //Grapple Attack    You’ve Grappled an opponent     Melee
  {
    id: ACTION_FAST.grapple_attack,
    prerequisite: () => "you've Grappled an opponent",
    prereqOk: () => true, // TODO
    skill: "melee",
  },
  //Ready Weapon      Ranged weapon                   –
  {
    id: ACTION_FAST.ready_weapon,
    prerequisite: () => "Ranged weapon",
    prereqOk: () => true, // TODO
    skill: null,
  },
  //Aim               Ranged, Short distance or more  –
  {
    id: ACTION_FAST.aim,
    prerequisite: () => "Ranged, Short distance or more",
    prereqOk: () => true, // TODO
    skill: null,
  },
  //Power Word        You are a Druid or a Sorcerer   None, see Chapter 6
  {
    id: ACTION_FAST.power_word,
    prerequisite: () => "you are a Druid or a Sorcerer",
    prereqOk: () => true, // TODO
    skill: null,
  },
  //Use Item          Varies                          Varies
  {
    id: ACTION_FAST.use_item,
    prerequisite: () => "varies",
    prereqOk: () => true, // TODO
    skill: null,
  },
]

export const actionsAll = [...actionsFast, ...actionsSlow]

export enum TARGET {
  monster = "monster",
  humanoid = "humanoid",
  none = "",
}
