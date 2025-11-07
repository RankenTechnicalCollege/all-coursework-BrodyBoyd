// const User = {
//   name: "Brody",
//   email: "bjb6287@gmail.com",
//   isActive: true
// }

// function createUser({name: string, isPaid: boolean}){

// }

// let newUser = {name: "Brody", isPaid: false, email: "b@b.com"} 

// function createCourse():{name: string, price: number} {
//   return {name: "reactjs", price: 399}
// }



type User = {
  readonly _id: string
  name: string;
  email: string;
  isActive: boolean;
  credcardDetails?: number  // ?: == optional
}

type cardNumber = {
  cardnumber: string
}

type cardDate = {
  cardDate: string
}

type cardDetails = cardNumber & cardDate & {cvv: number}

let myUser: User = {
  _id: "12345",
  name: "b",
  email: "b@b.com",
  isActive: false
}

myUser.email = "B@gmail.com"

myUser._id = "asa"  //readonly dosent allow reassign

// function createUser(user: User): User {
//   return {name: "", email: "", isActive: true}
// }

// createUser({name: "", email: "", isActive: true})


export {}