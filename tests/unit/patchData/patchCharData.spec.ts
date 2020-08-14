import { CharData, CharacterTalent } from "@/characterData"
import { runPatches } from "@/localstorage/charDataPatches"
import { SaveData } from "@/localstorage/characterStorage"
import charData20190623 from "../data/backup-2019-06-23T17_29_58.114Z.charlist.json"

const deepCopy = (data: any) => JSON.parse(JSON.stringify(data))

const PUBLIC_PATH = "/public/path/"
beforeAll(() => {
  console.log = () => {} // patching is verbose, lets turn it off
  ;(global as any).__webpack_public_path__ = PUBLIC_PATH
  // jest
  //   .spyOn(window, "__webpack_public_path__")
  //   .mockImplementation(() => "public/path")
})
// TODO: Cleanup as well?

describe(`patching data from 20190623`, () => {
  const data = (charData20190623 as any) as SaveData
  const entries = Object.values(deepCopy(data) as SaveData)
  const expected_entries: CharData[] = []

  // Global updates
  const dataVersion = 6
  const mountUpdate = {
    skills: [],
    movementRate: 0,
  }

  // Char specific data updates
  const xp = [83, 83, 12, 0, 77, 83]
  const charUpdates: {
    xp: number
    talents: CharacterTalent[]
    portrait: string
  }[] = [
    {
      xp: 83,
      talents: [
        { id: "Adaptive", rank: 1 },
        { id: "Path of the Blade", rank: 1 },
        { id: "ambidextrous", rank: 1 },
        { id: "bowyer", rank: 1 },
        { id: "master of the hunt", rank: 2 },
      ],
      portrait: `/public/path/img/player_handbook_png-851.png`,
    },
    {
      xp: 83,
      portrait: `http://static.giantbomb.com/uploads/original/11/112064/2522418-dark_elf_mage.jpg`,
      talents: [
        { id: "Inner Peace", rank: 1 },
        { id: "Path of Gold", rank: 2 },
        { id: "master of the hunt", rank: 1 },
      ],
    },
    {
      xp: 12,
      portrait: `/public/path/img/player_handbook_png-210.png`,
      talents: [
        { id: "Sneaky", rank: 1 },
        { id: "Path of the Forest", rank: 1 },
        { id: "berserker", rank: 2 },
      ],
    },
    {
      xp: 0,
      portrait: `/public/path/img/player_handbook_png-467.png`,
      talents: [{ id: "Adaptive", rank: 1 }],
    },
    {
      xp: 77,
      portrait: `https://i.pinimg.com/736x/b3/6f/56/b36f56d6618c985647804ce17d87fe36.jpg`,
      talents: [
        { id: "Inner Peace", rank: 1 },
        { id: "Path of Death", rank: 2 },
        { id: "fast footwork", rank: 1 },
      ],
    },
    {
      xp: 83,
      portrait: `/public/path/img/player_handbook_png-926.png`,
      talents: [
        { id: "Unbreakable", rank: 1 },
        { id: "Path of the Blade", rank: 2 },
        { id: "cold blooded", rank: 1 },
      ],
    },
  ]

  for (let i = 0; i < entries.length; i++) {
    test(`works on char${i}`, () => {
      expected_entries[i] = {
        ...entries[i],
        metadata: {
          ...entries[i].metadata,
          dataVersion,
          xpAtCreation: charUpdates[i].xp,
        },
        mount: {
          ...entries[i].mount,
          ...mountUpdate,
        },
        portrait: charUpdates[i].portrait,
        talents: charUpdates[i].talents,
      }
      const result0 = runPatches(entries[i])
      expect(result0).toStrictEqual(expected_entries[i])
    })
  }

  test(`correct number of tests`, () => {
    expect(expected_entries.length).toBe(entries.length)
  })
})
