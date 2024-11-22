import { Database } from "sqlite3";
import { User } from "../class/user";
import { DbConnection } from "./connection";
import { Function } from "lodash";

const { faker } = require("@faker-js/faker");

export class UserData {
  db: DbConnection;

  constructor() {
    this.db = new DbConnection();
    this.getAll = () => this.postAction(this.getAll);
    this.getOne = () => this.postAction(this.getOne);
    this.createOne = () => this.postAction(this.createOne);
    this.updateOne = () => this.postAction(this.updateOne);
    this.deleteOne = () => this.postAction(this.deleteOne);
  }

  initiateDummyDB(){
    for(let i=0;i<10;i++){
      this.createOne(new User(i.toString(), faker.internet.username(), faker.internet.password(), faker.person.firstName(), faker.person.lastName(), Date.now(), Date.now()).toJson())
    }
  }

  postAction(fn: any): any {
    fn;
    this.db.closeConnection();
  }

  getAll() {
    const query = this.db.getConnection().prepare("SELECT * FROM users");
    return query.all();
  }

  getOne(uid: string) {
    const query = this.db
      .getConnection()
      .prepare("SELECT * FROM users WHERE uid = ?");
    return query.run(uid);
  }

  createOne(json: Record<string, any>): any {
    const user: User = User.fromJson(json)
    const query = this.db.getConnection().prepare("INSERT INTO users (uid,username,password,firstname,lastname,createdAt,updateAt,deletedAt) VALUE(?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,?)")
    query.run(user.uid,user.username,user.password,user.firstname,user.lastname,user.deletedAt);
  }

  updateOne(uid: string, changes: Record<string, any>) {
    const user: User = User.fromJson(changes)
    const query = this.db.getConnection().prepare("UPDATE users SET username=?,password=?,firstname=?,lastname=?,updateAt=CURRENT_TIMESTAMP WHERE uid=?")
    return query.run(user.username,user.password,user.firstname,user.lastname,uid);
  }

  deleteOne(uid: string) {
    const query = this.db.getConnection().prepare("UPDATE users SET deletedAt=CURRENT_TIMESTAMP WHERE uid=?")
    return query.run(uid);
  }
}

const ud = new UserData()
console.log(ud.getAll())