import { Database, sqlite3 } from "sqlite3";
import { User } from "../class/user";
import {faker} from '@faker-js/faker';

const sqlite3 = require("sqlite3").verbose();

export class DbConnection {
  static dbsqlite: Database;

  userkeys: Array<string> = [];
  uservalues: Array<string> = [];
  userkeysstr: string = "";
  uservaluestr: string = "";

  constructor() {
    var db = DbConnection.dbsqlite;
    if (!db) {
      db = new sqlite3.Database(
        "testingdb.db",
        sqlite3.OPEN_READWRITE,
        (err: Error) => {
          console.error(err.message);
        }
      );
      const sqltable =
        "CREATE TABLE User (uid TEXT PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, firstname TEXT, lastname TEXT, createdAt DATE, updateAt DATE)";
      db.run(sqltable);
    }
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

  dissectUserObj(user: User) {
    if (!this.userkeysstr) {
      for (const [key, value] of Object.entries(user.toJson())) {
        this.userkeys.push(key);
        this.uservalues.push(value);
      }
      this.userkeys.map(
        (v, i) => (this.userkeysstr += i == this.userkeys.length ? v : v + ",")
      );
      for (var i = 0; i <= this.uservalues.length; i++) {
        this.uservaluestr += i == this.uservalues.length ? "?" : "?,";
      }
    }
    return this.userkeysstr, this.uservaluestr;
  }

  createUser(user: User) {
    this.dissectUserObj(user);
    const insertusersql = `INSERT INTO User(${this.userkeysstr}) VALUES (${this.uservaluestr})`;
    DbConnection.dbsqlite?.run(insertusersql, this.uservalues, (err) => {
      if (err) {
        console.error(err.message);
      } else {
      }
    });
  }

  getUser(uid: string='') {
    var getusersql = "";
    if (uid.length > 0) {
      getusersql = `SELECT * FROM User WHERE uid = ?`;
    } else {
      getusersql = `SELECT * FROM User`;
    }
    const res: User[] = [];
    DbConnection.dbsqlite?.all(getusersql, [uid], (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(rows)
        // for (const row in rows) {
        //   res.push(User.fromJson(row));
        // }
      }
    });
    return res;
  }

  updateUser(uid: string, user: User) {
    const updatesql = `UPDATE User SET ${() => {
      for (let i = 0; i < this.userkeys.length; i++) {
        var res = this.userkeys[i] + " = ?";
        if (i == this.userkeys.length - 1) res += ", ";
      }
    }} WHERE EXIST(SELECT 1 FROM User WHERE uid = ?)`;
    DbConnection.dbsqlite.run(updatesql, [...this.uservalues, uid], (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  }

  closeConnection() {
    DbConnection.dbsqlite.close();
  }
}