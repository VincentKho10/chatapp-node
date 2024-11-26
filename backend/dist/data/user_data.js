"use strict";
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
        var res = [];
        const query = this.db.getConnection().prepare("SELECT * FROM users LIMIT ?,?");
        query.all([offset, limit], (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            else {
                rows.map((v) => res.push(user_1.User.fromJson(JSON.parse(String(v)))));
            }
        });
        return res;
    }
    getOne(uid) {
        const query = this.db
            .getConnection()
            .prepare("SELECT * FROM users WHERE uid = ?");
        return query.run(uid).all((err, rows) => err ? console.error(err.message) : rows);
    }
    createOne(json) {
        const user = user_1.User.fromJson(json);
        const query = this.db.getConnection().prepare("INSERT OR IGNORE INTO users (uid,username,password,firstname,lastname,createdAt,updatedAt,deletedAt) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL)");
        query.run(user.uid, user.username, user.password, user.firstname, user.lastname);
    }
    updateOne(uid, changes) {
        const user = user_1.User.fromJson(changes);
        const query = this.db.getConnection().prepare("UPDATE users SET username=?,password=?,firstname=?,lastname=?,updatedAt=CURRENT_TIMESTAMP WHERE uid=?");
        return query.run(user.username, user.password, user.firstname, user.lastname, uid);
    }
    deleteOne(uid) {
        const query = this.db.getConnection().prepare("UPDATE users SET deletedAt=CURRENT_TIMESTAMP WHERE uid=?");
        return query.run(uid);
    }
}
exports.UserData = UserData;
const ud = new UserData();
const nu = ud.getOne("1");
ud.db.userTableInit();
ud.initiateDummyDB();
ud.getAll(2, 2);
// console.log(nu)
// ud.createOne(nu.toJson())
// ud.updateOne(nu.uid, {...nu.toJson(), "username": "changed" })
// ud.deleteOne(nu.uid)
