let score: number | string = 33

score = 44

score = "55"

type User = {
  name: string;
  id: number
}

type Admin = {
  username: string;
  id: number
}

let brody: User | Admin = {
  name: "Brody",
  id: 2
}

brody = {username: "Bjb", id: 1321}

// function getDbId(id: number | string){
//   console.log(`wDB id is: ${id}`)
// }

getDbId(3)
getDbId("#")

function getDbId(id: number | string){
  if (typeof id === "string") {
    id.toLowerCase()
  }

}

//array 

const data: number[] = [1,2,3, "4"]
const data2: string[] = ["1","2","3", "4"]
const data3: (string | number)[] = [1,2,3, "4"]

let pi:3.14 = 3.14
pi = 3.145

let seatAllotment: "asile" | "Middle" | "window"

seatAllotment = "asile"
seatAllotment = "crew"

