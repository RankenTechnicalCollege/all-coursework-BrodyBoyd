// const user: (string | number)[] = ["bb", 2]

let tUser: [string,number, boolean]

tUser = ["bb", 3, true]
tUser = [3, true, "bb"]

let rgb: [number, number, number] = [255, 123, 122]

type tUser = [number, string]

const newUser: tUser = [112, "assada"]

newUser[1] = "asda"
newUser.push(true)