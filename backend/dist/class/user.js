"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(uid = "", username = "", password = "", firstname = "", lastname = "", createdAt = "", updatedAt = "", deletedAt = "") {
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
    lsofParams() {
        return Object.keys(this).map((v, i) => {
            if (typeof v == "string") {
                return v + " TEXT";
            }
            else if (typeof v == "number") {
                return v + " INT";
            }
        });
    }
    toJson() {
        return Object.assign({}, this);
    }
    toString() {
        return this.uid;
    }
}
exports.User = User;
