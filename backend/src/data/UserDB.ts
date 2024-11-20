import sqlite from "sqlite3";
import { User } from "../class/user";
import { faker } from "@faker-js/faker";
export class UserDb {
  db?: sqlite.Database;

  userkeys: Array<string> = [];
  uservalues: Array<string> = [];
  userkeysstr: string = "";
  uservaluestr: string = "";

  constructor(db: sqlite.Database | undefined) {
    if (this.db == undefined) {
      this.db = db;
    }
    this.userTableCreation(this.db);
    this.createUser = () => this.closeAfterUse(this.createUser);
    this.getUser = () => this.closeAfterUse(this.getUser);
    this.updateUser = () => this.closeAfterUse(this.updateUser);
    // this.createUser = () => this.closeAfterUse(this.createUser)
  }

  initTestUser(){
    for (var i = 0; i <= 10; i++) {
        this.createUser(
          User.fromJson({
            uid: i.toString(),
            username: faker.internet.username(),
            password: faker.internet.password(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            createdAt: faker.date.recent(),
            updatedAt: faker.date.future(),
          })
        );
      }
  }

  closeAfterUse(fn: any): any {
    fn;
    this.db?.close();
  }

  dissectUserObj(user: User) {
    for (const [key, value] of Object.entries(user.toJson())) {
      if (this.userkeysstr.length == user.toJson.length) {
        this.userkeys.push(key);
      }
      this.uservalues.push(value);
    }
    this.userkeys.map(
      (v, i) => (this.userkeysstr += i == this.userkeys.length ? v : v + ",")
    );
    for (var i = 0; i <= this.uservalues.length; i++) {
      this.uservaluestr += i == this.uservalues.length ? "?" : "?,";
    }

    return this.userkeysstr, this.uservaluestr;
  }

  userTableCreation(db?: sqlite.Database) {
    if (db == undefined) throw Error("db undefined");
    const sqltable =
      "CREATE TABLE IF NOT EXISTS User (uid TEXT PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, firstname TEXT, lastname TEXT, createdAt DATE, updateAt DATE)";
    db.serialize(() => db.run(sqltable));
  }

  async createUser(user: User): Promise<String> {
    this.dissectUserObj(user);
    const insertusersql = `INSERT INTO User(${this.userkeysstr}) VALUES (${this.uservaluestr})`;
    await this.db?.serialize(() =>
      this.db?.run(insertusersql, this.uservalues, (err) => {
        if (err) {
          console.error(err.message);
        }
      })
    );
    return Promise.resolve(`User ${user.username} created`)
  }

  getUser(uid: string = "") {
    var getusersql = "";
    if (uid.length > 0) {
      getusersql = `SELECT * FROM User WHERE uid = ?`;
    } else {
      getusersql = `SELECT * FROM User`;
    }
    const res: User[] = [];
    this.db?.serialize(() =>
      this.db?.all(getusersql, [uid], (err, rows) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(rows);
          // for (const row in rows) {
          //   res.push(User.fromJson(row));
          // }
        }
      })
    );
    return res;
  }

  updateUser(uid: string, user: User) {
    const updatesql = `UPDATE User SET ${() => {
      for (let i = 0; i < this.userkeys.length; i++) {
        var res = this.userkeys[i] + " = ?";
        if (i == this.userkeys.length - 1) res += ", ";
      }
    }} WHERE EXIST(SELECT 1 FROM User WHERE uid = ?)`;
    this.db?.serialize(() =>
      this.db?.run(updatesql, [...this.uservalues, uid], (err) => {
        if (err) {
          console.error(err.message);
        }
      })
    );
  }
}
