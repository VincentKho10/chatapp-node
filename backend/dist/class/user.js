"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(uid = "", username = "", password = "", firstname = "", lastname = "", createdAt = 0, updatedAt = 0, deletedAt = 0) {
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
        var res = new User();
        return Object.assign(res, json);
    }
    static lsofParams() {
        return Object.keys(User);
    }
    toJson() {
        return Object.assign({}, this);
    }
    toString() {
        return this.uid;
    }
}
exports.User = User;
