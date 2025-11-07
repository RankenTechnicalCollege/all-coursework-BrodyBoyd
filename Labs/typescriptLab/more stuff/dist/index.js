"use strict";
// class User {
//   public email: string
//   private name: string
//   readonly city: string = 'St. Louis'
//   constructor(email: string, name: string){
//     this.email = email;
//     this.name = name
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    email;
    name;
    userId;
    _courseCount = 1;
    city = 'St. Louis';
    constructor(email, name, userId) {
        this.email = email;
        this.name = name;
        this.userId = userId;
    }
    deleteToken() {
        console.log('Token Deleted');
    }
    get getAppleEmail() {
        return `apple${this.email}`;
    }
    get courseCount() {
        return this._courseCount;
    }
    set courseCount(courseNum) {
        if (courseNum <= 1) {
            throw new Error("Course count should be more than 1");
        }
        this._courseCount = courseNum;
    }
}
class SubUser extends User {
    isFamily = true;
    changeCourseCount() {
        this._courseCount = 4;
    }
}
const Brody = new User("B@b.com", "brody", "1231");
Brody.city;
//# sourceMappingURL=index.js.map