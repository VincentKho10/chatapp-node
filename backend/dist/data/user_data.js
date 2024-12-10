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
exports.User = exports.UserData = void 0;
const user_1 = require("../class/user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const connection_1 = require("./connection");
const { faker } = require("@faker-js/faker");
class UserData {
    constructor() {
        this.db = new connection_1.DbConnection();
        this.success_response = { status: "success" };
        this.fail_response = { status: "fail" };
    }
    initiateDummyDB() {
        for (let i = 0; i < 10; i++) {
            this.createOne(new user_1.User(i.toString(), faker.internet.username(), faker.internet.password(), faker.person.firstName(), faker.person.lastName()));
        }
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.db
                .getConnection()
                .prepare("SELECT uid FROM users WHERE username=? AND password=?");
            return yield new Promise((resolve, reject) => query.all([username, password], (err, rows) => {
                if (err) {
                    return reject(err.message);
                }
                else if (rows.length <= 0) {
                    return reject(Object.assign(Object.assign({}, this.fail_response), { message: 'invalid credentials' }));
                }
                return resolve(rows[0]['uid']);
            }));
        });
    }
    getAll(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.db
                .getConnection()
                .prepare("SELECT * FROM users LIMIT ?,?");
            return yield new Promise((resolve, reject) => {
                query.all([offset, limit], (err, rows) => err
                    ? reject(Object.assign(Object.assign({}, this.fail_response), { message: err.message }))
                    : resolve(rows.map((v) => user_1.User.fromJson(v))));
            });
        });
    }
    getByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.db
                .getConnection()
                .prepare("SELECT * FROM users WHERE uid = ?");
            return yield new Promise((resolve, reject) => {
                query.all([uid], (err, rows) => err
                    ? reject(Object.assign(Object.assign({}, this.fail_response), { message: err.message }))
                    : resolve(rows.map((v) => user_1.User.fromJson(v))));
            });
        });
    }
    createOne(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.db
                .getConnection()
                .prepare("INSERT OR IGNORE INTO users (uid,username,password,firstname,lastname,createdAt,updatedAt,deletedAt) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL)");
            console.log(user);
            return yield new Promise((resolve, reject) => {
                query.run([user.uid, user.username, user.password, user.firstname, user.lastname], (err) => err
                    ? reject(Object.assign(Object.assign({}, this.fail_response), { message: err.message }))
                    : resolve(Object.assign(Object.assign({}, this.success_response), { message: "user are created successfully" })));
            });
        });
    }
    updateOne(uid, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.db
                .getConnection()
                .prepare("UPDATE users SET username=?,password=?,firstname=?,lastname=?,updatedAt=CURRENT_TIMESTAMP WHERE uid=?");
            return yield new Promise((resolve, reject) => query.run(changes.username, changes.password, changes.firstname, changes.lastname, uid, (err) => err
                ? reject(Object.assign(Object.assign({}, this.fail_response), { message: err.message }))
                : resolve(Object.assign(Object.assign({}, this.success_response), { message: "user are updated successfully" }))));
        });
    }
    deleteOne(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.db
                .getConnection()
                .prepare("UPDATE users SET deletedAt=CURRENT_TIMESTAMP WHERE uid=?");
            return yield new Promise((resolve, reject) => query.run(uid, (err) => err
                ? reject(Object.assign(Object.assign({}, this.fail_response), { message: err.message }))
                : resolve(Object.assign(Object.assign({}, this.success_response), { message: "user deleted successfully" }))));
        });
    }
}
exports.UserData = UserData;
