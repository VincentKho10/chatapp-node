"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const faker_1 = require("@faker-js/faker");
class User {
    constructor(uid, username, password, firstname, lastname, createdAt, updatedAt, deletedAt = null) {
        this.uid = uid;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
    static fromJson(json) {
        return Object.assign(User, json);
    }
    toJson() {
        return {
            uid: this.uid,
            username: this.username,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
    toString() {
        return this.uid;
    }
}
exports.User = User;
const user = new User("0", faker_1.faker.internet.username(), faker_1.faker.internet.password(), faker_1.faker.person.firstName(), faker_1.faker.person.lastName(), Date.now(), Date.now());
const ujson = user.toJson();
console.log(ujson);
const userfj = User.fromJson(ujson);
console.log(userfj);
