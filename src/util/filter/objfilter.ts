export function objFilter<T>(o: T): T {
  return o
}

interface BarNested {
  key1?: string
  key2?: string
  bool1?: boolean
  nested: BarNested
}

interface Foo {
  name: string
  bar1?: BarNested
  foo1?: Foo
}
