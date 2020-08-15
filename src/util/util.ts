export function capitalize(s: string): string {
  return s && s[0].toUpperCase() + s.slice(1)
}

export function timeout(delay: number) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delay)
  })
}

export interface Result {
  success: boolean
  data?: any
  error?: string
}

export const OK = (data?: any): Result => ({ success: true, data })
export const Err = (error?: string, data?: any): Result => ({
  success: false,
  data,
  error,
})

export const Ack = OK
export const Nack = Err

/* eslint-disable no-console */
export const errlog = console.error
export const log = console.log
/* eslint-enable no-console */

const NAMES = [
  "Alice",
  "Bob",
  // radio
  "Alpha",
  "Bravo",
  "Charlie",
  "Delta",
  "Echo",
  "Foxtrot",
  "Golf",
  "Hotel",
  "India",
  "Juliet",
  "Kilo",
  "Lima",
  "Mike",
  "November",
  "Oscar",
  "Papa",
  "Quebec",
  "Romeo",
  "Sierra",
  "Tango",
  "Uniform",
  "Victor",
  "Whiskey",
  "X-ray",
  "Yankee",
  "Zulu",
]

export function randomName(words = 1, nameList: string[] = NAMES): string {
  const getName = () => nameList[Math.floor(Math.random() * nameList.length)]
  let names = []
  for (let i = 0; i < words; i++) {
    names.push(getName())
  }
  return names.join(" ")
}
