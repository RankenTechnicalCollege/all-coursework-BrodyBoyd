function addTwo(num: number): number {
  return num + 2
}

function getUpper(val: string) {  //Type annotation is super important
  return val.toUpperCase()
}

function signUpUser(name: string, email: string, isPaid: boolean){
}

let loginUser = (name: string, email: string, isPaid: boolean = false) => {}

addTwo(5)
getUpper("this is in upper case")
signUpUser("Brody", "bjb6287@gmail.com", false)
loginUser("b", "b@b.com,")

function getValue(myVal: number) {
  if (myVal > 5) {
    return true
  }
  return "200 OK"
}

const getHello = (s: string):string => {
  return ""
}

const heros = ["Thor", "Spiderman", "Ironman"]
// const heros = [1, 2, 3]


heros.map((hero): string => {
  return `hero is ${hero}`
})


function consoleError(errmsg: string): void {
  console.log(errmsg)
}

function handleError(errmsg: string): never {
  throw new Error(errmsg)
}