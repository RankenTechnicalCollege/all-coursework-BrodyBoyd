interface User4 {
  readonly dbId: number
  email: string, 
  userId: number,
  googleId?: string,
  startTrail: () => string,
  getCoupon(couponname: string, value: number): number
}

interface User4 {
  githubToken: string
}

interface Admin2 extends User {
  role: "admin" | "ta" | "learner"
}

let brody1: Admin2 = {dbId: 22, email: "b@b.com", userId: 2211, githubToken: "github", role: "admin", startTrail: () => {
  return "Trial Started"},
getCoupon: (name: "Brody", value: 10) => {
  return 20
}}