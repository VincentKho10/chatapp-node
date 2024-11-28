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
exports.UserData = void 0;
const user_1 = require("../class/user");
const connection_1 = require("./connection");
const { faker } = require("@faker-js/faker");
class UserData {
    constructor() {
        this.db = new connection_1.DbConnection();
        // this.getAll = () => this.postAction(this.getAll);
        // this.getOne = () => this.postAction(this.getOne);
        // this.createOne = () => this.postAction(this.createOne);
        // this.updateOne = () => this.postAction(this.updateOne);
        // this.deleteOne = () => this.postAction(this.deleteOne);
    }
    initiateDummyDB() {
        for (let i = 0; i < 10; i++) {
            this.createOne(new user_1.User(i.toString(), faker.internet.username(), faker.internet.password(), faker.person.firstName(), faker.person.lastName()).toJson());
        }
    }
    postAction(fn) {
        fn;
        this.db.closeConnection();
    }
    getAll(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.db
                .getConnection()
                .prepare("SELECT * FROM users LIMIT ?,?");
            return new Promise((resolve, reject) => {
                query.all([offset, limit], (err, rows) => err
                    ? reject(err.message)
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
                query
                    .run(uid)
                    .all((err, rows) => err
                    ? reject(err.message)
                    : resolve(rows.map((v) => user_1.User.fromJson(v))));
            });
        });
    }
    createOne(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_1.User.fromJson(json);
            const query = this.db
                .getConnection()
                .prepare("INSERT OR IGNORE INTO users (uid,username,password,firstname,lastname,createdAt,updatedAt,deletedAt) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL)");
            return new Promise((resolve, reject) => {
                query.run([user.uid,
                    user.username,
                    user.password,
                    user.firstname,
                    user.lastname], (err) => err ? reject(err.message) : resolve("users are created successfully"));
            });
        });
    }
    updateOne(uid, changes) {
        const user = user_1.User.fromJson(changes);
        const query = this.db
            .getConnection()
            .prepare("UPDATE users SET username=?,password=?,firstname=?,lastname=?,updatedAt=CURRENT_TIMESTAMP WHERE uid=?");
        return query.run(user.username, user.password, user.firstname, user.lastname, uid);
    }
    deleteOne(uid) {
        const query = this.db
            .getConnection()
            .prepare("UPDATE users SET deletedAt=CURRENT_TIMESTAMP WHERE uid=?");
        return query.run(uid);
    }
}
exports.UserData = UserData;
const ud = new UserData();
ud.db.getConnection().serialize(() => __awaiter(void 0, void 0, void 0, function* () {
    ud.db.userTableInit();
    console.log(yield ud.initiateDummyDB());
    const nu = yield ud.getByUid("1");
    const na = yield ud.getAll(2, 2);
    console.log(na);
    console.log(nu);
    // ud.createOne(nu.toJson())
    // ud.updateOne(nu.uid, {...nu.toJson(), "username": "changed" })
    // ud.deleteOne(nu.uid)
}));
