const score: Array<number> = []
const name: Array<string> = []

function identityOne(val: boolean | number): boolean | number {
  return val
}

function identityTwo(val: any): any {
  return val
}

function identityThree<Type>(val: Type): Type {
  return val
}

// identityThree(true)

function identityFour<T>(val: T): T {
  return val
}

interface Bottle {
  brand: string,
  type: number
}

// identityFour<Bottle>({})

function getSearchProducts<Type>(products: Type[]): Type | undefined {
  const myIndex = 3
  return products[3]
}

const getMoreSearchProducts = <T>(products: T[]): T | undefined => {
  const Index = 4
  return products[Index]
}

interface Database {
  connection: string,
  username: string,
  password: string
}

function anotherFunction<T, U extends Database>(valOne: T, valTwo: U): object {
  return {
    valOne,
    valTwo
  }
}

// anotherFunction(3, {})

interface Quiz{
  name: string,
  type: string
}

interface Course{
  name: string,
  author: string,
  subject: string
}

class Sellable<T>{
  public cart: T[] = []

  addToCart(product: T){
    this.cart.push(product)
  }
}