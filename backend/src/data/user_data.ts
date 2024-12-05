import { Database, Statement } from "sqlite3";
import { User } from "../class/user";
import { DbConnection } from "./connection";
import { create, Function, isEqual } from "lodash";

const { faker } = require("@faker-js/faker");

export class UserData {
  db: DbConnection;
  success_response: Record<string, any>;
  fail_response: Record<string, any>;

  constructor() {
    this.db = new DbConnection();
    this.success_response = { status: "success" };
    this.fail_response = { status: "fail" };
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
        )
      );
    }
  }

  async login(username: string, password: string): Promise<string> {
    const query = this.db
      .getConnection()
      .prepare("SELECT uid FROM users WHERE username=? AND password=?");
    return await new Promise((resolve, reject) =>
      query.all([username, password], (err, rows) => {
        if (err) {
          return reject(err.message);
        } else if (rows.length <= 0){
          return reject('invalid credentials')
        }
        return resolve((rows[0] as Record<any,any>)['uid']);
      })
    );
  }

  async getAll(offset: number, limit: number): Promise<User[]> {
    const query = this.db
      .getConnection()
      .prepare("SELECT * FROM users LIMIT ?,?");
    return await new Promise((resolve, reject) => {
      query.all([offset, limit], (err, rows) =>
        err
          ? reject({ ...this.fail_response, message: err.message })
          : resolve(rows.map((v) => User.fromJson(v as Record<string, any>)))
      );
    });
  }

  async getByUid(uid: string): Promise<User[]> {
    const query = this.db
      .getConnection()
      .prepare("SELECT * FROM users WHERE uid = ?");
    return await new Promise((resolve, reject) => {
      query.all([uid], (err, rows) =>
        err
          ? reject({ ...this.fail_response, message: err.message })
          : resolve(rows.map((v) => User.fromJson(v as Record<string, any>)))
      );
    });
  }

  async createOne(user: User): Promise<Record<any, any>> {
    const query = this.db
      .getConnection()
      .prepare(
        "INSERT OR IGNORE INTO users (uid,username,password,firstname,lastname,createdAt,updatedAt,deletedAt) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL)"
      );
    return await new Promise((resolve, reject) => {
      query.run(
        [user.uid, user.username, user.password, user.firstname, user.lastname],
        (err) =>
          err
            ? reject({ ...this.fail_response, message: err.message })
            : resolve({
                ...this.success_response,
                message: "user are created successfully",
              })
      );
    });
  }

  async updateOne(uid: string, changes: User): Promise<Record<any, any>> {
    const query = this.db
      .getConnection()
      .prepare(
        "UPDATE users SET username=?,password=?,firstname=?,lastname=?,updatedAt=CURRENT_TIMESTAMP WHERE uid=?"
      );
    return await new Promise((resolve, reject) =>
      query.run(
        changes.username,
        changes.password,
        changes.firstname,
        changes.lastname,
        uid,
        (err: any) =>
          err
            ? reject({ ...this.fail_response, message: err.message })
            : resolve({
                ...this.success_response,
                message: "user are updated successfully",
              })
      )
    );
  }

  async deleteOne(uid: string): Promise<Record<any, any>> {
    const query = this.db
      .getConnection()
      .prepare("UPDATE users SET deletedAt=CURRENT_TIMESTAMP WHERE uid=?");
    return await new Promise((resolve, reject) =>
      query.run(uid, (err: any) =>
        err
          ? reject({ ...this.fail_response, message: err.message })
          : resolve({
              ...this.success_response,
              message: "user deleted successfully",
            })
      )
    );
  }
}
