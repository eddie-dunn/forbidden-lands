export function capitalize(s: string): string {
  return s && s[0].toUpperCase() + s.slice(1)
}

export function timeout(delay: number) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delay)
  })
}
