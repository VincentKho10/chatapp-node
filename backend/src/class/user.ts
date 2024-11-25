import { faker } from '@faker-js/faker'

export class User {
  uid: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;

  constructor(
    uid: string="",
    username: string="",
    password: string="",
    firstname: string="",
    lastname: string="",
    createdAt: string="",
    updatedAt: string="",
    deletedAt: string="",
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

  lsofParams(){
    return Object.keys(this).map((v,i)=>{
      if(typeof v == "string"){
        return v+" TEXT"
      }
      else if(typeof v == "number"){
        return v+" INT"
      }
    })
  }

  toJson(): Record<string, any> {
    return {...this}
  }

  public toString(): string {
    return this.uid;
  }
}