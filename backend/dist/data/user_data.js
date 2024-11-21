"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
const user_1 = require("../class/user");
const connection_1 = require("./connection");
const { faker } = require("@faker-js/faker");
class UserData {
    constructor() {
        this.res = [];
        this.db = new connection_1.DbConnection();
        this.getAll = () => this.postAction(this.getAll);
        this.getOne = () => this.postAction(this.getOne);
        this.createOne = () => this.postAction(this.createOne);
        this.updateOne = () => this.postAction(this.updateOne);
        this.deleteOne = () => this.postAction(this.deleteOne);
    }
    postAction(fn) {
        fn;
        this.db.closeConnection();
    }
    getAll() {
        const query = this.db.getConnection().prepare("SELECT * FROM users");
        return query.all();
    }
    getOne(uid) {
        const query = this.db
            .getConnection()
            .prepare("SELECT * FROM users WHERE uid = ?");
        return query.run(uid);
    }
    createOne(json) {
        const user = user_1.User.fromJson(json);
        const query = this.db.getConnection().prepare("INSERT INTO users (uid,username,password,firstname,lastname,createdAt,updateAt,deletedAt) VALUE(?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,?)");
        query.run(user.uid, user.username, user.password, user.firstname, user.lastname, user.deletedAt);
    }
    updateOne(uid, changes) {
        const user = user_1.User.fromJson(changes);
        const query = this.db.getConnection().prepare("UPDATE users SET username=?,password=?,firstname=?,lastname=?,updateAt=CURRENT_TIMESTAMP WHERE uid=?");
        return query.run(user.username, user.password, user.firstname, user.lastname, uid);
    }
    deleteOne(uid) {
        const query = this.db.getConnection().prepare("UPDATE users SET deletedAt=CURRENT_TIMESTAMP WHERE uid=?");
        return query.run(uid);
    }
}
exports.UserData = UserData;
