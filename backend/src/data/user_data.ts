import { Database, Statement } from "sqlite3";
import { User } from "../class/user";
import { DbConnection } from "./connection";
import { Function } from "lodash";

const { faker } = require("@faker-js/faker");

export class UserData {
  db: DbConnection;

  constructor() {
    this.db = new DbConnection();
    // this.getAll = () => this.postAction(this.getAll);
    // this.getOne = () => this.postAction(this.getOne);
    // this.createOne = () => this.postAction(this.createOne);
    // this.updateOne = () => this.postAction(this.updateOne);
    // this.deleteOne = () => this.postAction(this.deleteOne);
  }

  initiateDummyDB() {
    for (let i = 0; i < 10; i++) {
      this.createOne(
        new User(
          i.toString(),
          faker.internet.username(),
          faker.internet.password(),
          faker.person.firstName(),
          faker.person.lastName()
        ).toJson()
      );
    }
  }

  postAction(fn: any): any {
    fn;
    this.db.closeConnection();
  }

  async getAll(offset: number, limit: number): Promise<User[]> {
    const query = this.db
      .getConnection()
      .prepare("SELECT * FROM users LIMIT ?,?");
    return new Promise((resolve, reject) => {
      query.all([offset, limit], (err, rows) =>
        err
          ? reject(err.message)
          : resolve(rows.map((v) => User.fromJson(v as Record<string, any>)))
      );
    });
  }

  async getByUid(uid: string): Promise<User[]> {
    const query = this.db
      .getConnection()
      .prepare("SELECT * FROM users WHERE uid = ?");
    return await new Promise((resolve, reject) => {
      query
        .run(uid)
        .all((err, rows) =>
          err
            ? reject(err.message)
            : resolve(rows.map((v) => User.fromJson(v as Record<string, any>)))
        );
    });
  }

  async createOne(json: Record<string, any>): Promise<String> {
    const user: User = User.fromJson(json);
    const query = this.db
      .getConnection()
      .prepare(
        "INSERT OR IGNORE INTO users (uid,username,password,firstname,lastname,createdAt,updatedAt,deletedAt) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL)"
      );
    return new Promise((resolve, reject) => {
      query.run(
        [user.uid,
        user.username,
        user.password,
        user.firstname,
        user.lastname],(err)=>err?reject(err.message):resolve("users are created successfully")
      );
    });
  }

  updateOne(uid: string, changes: Record<string, any>) {
    const user: User = User.fromJson(changes);
    const query = this.db
      .getConnection()
      .prepare(
        "UPDATE users SET username=?,password=?,firstname=?,lastname=?,updatedAt=CURRENT_TIMESTAMP WHERE uid=?"
      );
    return query.run(
      user.username,
      user.password,
      user.firstname,
      user.lastname,
      uid
    );
  }

  deleteOne(uid: string) {
    const query = this.db
      .getConnection()
      .prepare("UPDATE users SET deletedAt=CURRENT_TIMESTAMP WHERE uid=?");
    return query.run(uid);
  }
}

const ud = new UserData();
ud.db.getConnection().serialize(async () => {
  ud.db.userTableInit();
  console.log(await ud.initiateDummyDB());
  const nu = await ud.getByUid("1");
  const na = await ud.getAll(2, 2);
  console.log(na);
  console.log(nu);
  // ud.createOne(nu.toJson())
  // ud.updateOne(nu.uid, {...nu.toJson(), "username": "changed" })
  // ud.deleteOne(nu.uid)
});
