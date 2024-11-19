"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
const user_1 = require("../class/user");
const { faker } = require('@faker-js/faker');
class UserData {
    constructor() {
        this.res = [];
        for (var i = 0; i <= 10; i++) {
            this.createOne({
                'uid': i.toString(),
                'username': faker.internet.username(),
                'password': faker.internet.password(),
                'firstname': faker.person.firstName(),
                'lastname': faker.person.lastName(),
                'createdAt': faker.date.recent(),
                'updatedAt': faker.date.future(),
            });
        }
    }
    getAll() {
        return this.res;
    }
    getOne(uid) {
        const res = this.res.filter(v => v.uid == uid);
        return res;
    }
    createOne(json) {
        const addeduser = user_1.User.fromJson(json);
        this.res.push(addeduser);
        return addeduser;
    }
    updateOne(uid, changes) {
        const updidx = this.res.findIndex((v) => v.uid == uid);
        this.res[updidx] = changes;
        return Object.assign({}, this.res[updidx]);
    }
    deleteOne(uid) {
        const delidx = this.res.findIndex((v) => v.uid == uid);
        const deltd = this.res.splice(delidx, 1);
        return Object.assign({}, deltd[0]);
    }
}
exports.UserData = UserData;
