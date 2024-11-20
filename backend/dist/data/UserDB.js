"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDb = void 0;
const user_1 = require("../class/user");
const faker_1 = require("@faker-js/faker");
class UserDb {
    constructor(db) {
        this.userkeys = [];
        this.uservalues = [];
        this.userkeysstr = "";
        this.uservaluestr = "";
        if (this.db == undefined) {
            this.db = db;
        }
        this.userTableCreation(this.db);
        this.createUser = () => this.closeAfterUse(this.createUser);
        this.getUser = () => this.closeAfterUse(this.getUser);
        this.updateUser = () => this.closeAfterUse(this.updateUser);
        // this.createUser = () => this.closeAfterUse(this.createUser)
    }
    initTestUser() {
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
    closeAfterUse(fn) {
        var _a;
        fn;
        (_a = this.db) === null || _a === void 0 ? void 0 : _a.close();
    }
    dissectUserObj(user) {
        for (const [key, value] of Object.entries(user.toJson())) {
            if (this.userkeysstr.length == user.toJson.length) {
                this.userkeys.push(key);
            }
            this.uservalues.push(value);
        }
        this.userkeys.map((v, i) => (this.userkeysstr += i == this.userkeys.length ? v : v + ","));
        for (var i = 0; i <= this.uservalues.length; i++) {
            this.uservaluestr += i == this.uservalues.length ? "?" : "?,";
        }
        return this.userkeysstr, this.uservaluestr;
    }
    userTableCreation(db) {
        if (db == undefined)
            throw Error("db undefined");
        const sqltable = "CREATE TABLE IF NOT EXISTS User (uid TEXT PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, firstname TEXT, lastname TEXT, createdAt DATE, updateAt DATE)";
        db.serialize(() => db.run(sqltable));
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.dissectUserObj(user);
            const insertusersql = `INSERT INTO User(${this.userkeysstr}) VALUES (${this.uservaluestr})`;
            yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.serialize(() => {
                var _a;
                return (_a = this.db) === null || _a === void 0 ? void 0 : _a.run(insertusersql, this.uservalues, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
            }));
            return Promise.resolve(`User ${user.username} created`);
        });
    }
    getUser(uid = "") {
        var _a;
        var getusersql = "";
        if (uid.length > 0) {
            getusersql = `SELECT * FROM User WHERE uid = ?`;
        }
        else {
            getusersql = `SELECT * FROM User`;
        }
        const res = [];
        (_a = this.db) === null || _a === void 0 ? void 0 : _a.serialize(() => {
            var _a;
            return (_a = this.db) === null || _a === void 0 ? void 0 : _a.all(getusersql, [uid], (err, rows) => {
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
        });
        return res;
    }
    updateUser(uid, user) {
        var _a;
        const updatesql = `UPDATE User SET ${() => {
            for (let i = 0; i < this.userkeys.length; i++) {
                var res = this.userkeys[i] + " = ?";
                if (i == this.userkeys.length - 1)
                    res += ", ";
            }
        }} WHERE EXIST(SELECT 1 FROM User WHERE uid = ?)`;
        (_a = this.db) === null || _a === void 0 ? void 0 : _a.serialize(() => {
            var _a;
            return (_a = this.db) === null || _a === void 0 ? void 0 : _a.run(updatesql, [...this.uservalues, uid], (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
        });
    }
}
exports.UserDb = UserDb;
