import { faker } from '@faker-js/faker'

export class User {
  uid: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  createdAt: Number;
  updatedAt: Number;
  deletedAt: Number;

  constructor(
    uid: string="",
    username: string="",
    password: string="",
    firstname: string="",
    lastname: string="",
    createdAt: Number=0,
    updatedAt: Number=0,
    deletedAt: Number=0,
  ) {
    this.uid = uid;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromJson(json: Record<string, any>): User {
    var res = new User()
    return (Object.assign(res, json) as unknown) as User
  }

  static lsofParams(){
    return Object.keys(User)
  }

  static toJson(user: User): Record<string, any> {
    return JSON.stringify(user)
  }

  public toString(): string {
    return this.uid;
  }
}

const user = new User("0",faker.internet.username(),faker.internet.password(),faker.person.firstName(),faker.person.lastName(),Date.now(),Date.now())
const ujson = user.toJson()
console.log(ujson)
const userfj = User.fromJson(ujson)
console.log(userfj)