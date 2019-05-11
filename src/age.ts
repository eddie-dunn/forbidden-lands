/*
    [AGE.YOUNG]: 15,
    [AGE.ADULT]: 14,
    [AGE.OLD]: 13,
*/
import { AGE, KIN } from "@/keys.ts"
import { Age, KinName } from "@/types"

export function getAttributePoints(age: Age | null): number {
  if (!age) return -1
  return { [AGE.YOUNG]: 15, [AGE.ADULT]: 14, [AGE.OLD]: 13 }[age]
}

//        HUMAN  HALF-ELF  DWARF  HALFLING  WOLFKIN  ORC    GOBLIN
// Young  16–25  16–30     20–40  16–25     13–20    13–20  16-25
// Adult  26–50  31–100    41–80  26–60     21–40    21–45  26-60
// Old    51+    101+      81+    61+       41+      46+    61+
const table = {
  //          Young, Adult, Old
  [KIN.HUMAN]: [16, 26, 51],
  [KIN.HALFELF]: [16, 31, 101],
  [KIN.DWARF]: [20, 41, 81],
  [KIN.HALFLING]: [16, 26, 61],
  [KIN.WOLFKIN]: [13, 21, 41],
  [KIN.ORC]: [13, 21, 46],
  [KIN.GOBLIN]: [16, 26, 61],
}

export function getAgeRangeArray(kin: KinName): Array<number> {
  return table[kin]
}

export function getAgeRange(kin: KinName | null): string {
  if (!kin) return ""
  const ageArr = table[kin]
  if (ageArr) return `${ageArr[0]}-${ageArr[2]}+`
  return ""
}

export function getReputation(ageType: Age) {
  if (ageType === "old") return 2
  if (ageType === "adult") return 1
  return 0
}

export function getAgeType(age: number | null, kin: KinName | null): Age {
  if (!age || !kin) return ""

  if (kin === KIN.ELF) return AGE.ADULT
  if (age < table[kin][1]) return AGE.YOUNG
  if (age >= table[kin][2]) return AGE.OLD
  return AGE.ADULT
}

export function getStartingTalents(
  age: number | null,
  kin: KinName | null
): number {
  const ageType = getAgeType(age, kin)
  // const talentMap: 1 | 2 | 3 = { [AGE.YOUNG]: 1, [AGE.ADULT]: 2, [AGE.OLD]: 3}
  const talentMap = {
    "young": 1,
    "adult": 2,
    "old": 3,
    "": 0,
  }
  return talentMap[ageType] || 0
}
