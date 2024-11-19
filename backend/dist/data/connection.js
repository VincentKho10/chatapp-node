"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
const user_1 = require("../class/user");
const faker_1 = require("@faker-js/faker");
const sqlite3 = require("sqlite3").verbose();
class DbConnection {
    constructor() {
        this.userkeys = [];
        this.uservalues = [];
        this.userkeysstr = "";
        this.uservaluestr = "";
        var db = DbConnection.dbsqlite;
        if (!db) {
            db = new sqlite3.Database("testingdb.db", sqlite3.OPEN_READWRITE, (err) => {
                console.error(err.message);
            });
            const sqltable = "CREATE TABLE User (uid TEXT PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, firstname TEXT, lastname TEXT, createdAt DATE, updateAt DATE)";
            db.run(sqltable);
        }
        for (var i = 0; i <= 10; i++) {
            this.createUser(user_1.User.fromJson({
                uid: i.toString(),
                username: faker_1.faker.internet.username(),
                password: faker_1.faker.internet.password(),
                firstname: faker_1.faker.person.firstName(),
                lastname: faker_1.faker.person.lastName(),
                createdAt: faker_1.faker.date.recent(),
                updatedAt: faker_1.faker.date.future(),
            }));
        }
    }
    dissectUserObj(user) {
        if (!this.userkeysstr) {
            for (const [key, value] of Object.entries(user.toJson())) {
                this.userkeys.push(key);
                this.uservalues.push(value);
            }
            this.userkeys.map((v, i) => (this.userkeysstr += i == this.userkeys.length ? v : v + ","));
            for (var i = 0; i <= this.uservalues.length; i++) {
                this.uservaluestr += i == this.uservalues.length ? "?" : "?,";
            }
        }
        return this.userkeysstr, this.uservaluestr;
    }
    createUser(user) {
        var _a;
        this.dissectUserObj(user);
        const insertusersql = `INSERT INTO User(${this.userkeysstr}) VALUES (${this.uservaluestr})`;
        (_a = DbConnection.dbsqlite) === null || _a === void 0 ? void 0 : _a.run(insertusersql, this.uservalues, (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
            }
        });
    }
    getUser(uid = '') {
        var _a;
        var getusersql = "";
        if (uid.length > 0) {
            getusersql = `SELECT * FROM User WHERE uid = ?`;
        }
        else {
            getusersql = `SELECT * FROM User`;
        }
        const res = [];
        (_a = DbConnection.dbsqlite) === null || _a === void 0 ? void 0 : _a.all(getusersql, [uid], (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log(rows);
                // for (const row in rows) {
                //   res.push(User.fromJson(row));
                // }
            }
        });
        return res;
    }
    updateUser(uid, user) {
        const updatesql = `UPDATE User SET ${() => {
            for (let i = 0; i < this.userkeys.length; i++) {
                var res = this.userkeys[i] + " = ?";
                if (i == this.userkeys.length - 1)
                    res += ", ";
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
exports.DbConnection = DbConnection;
