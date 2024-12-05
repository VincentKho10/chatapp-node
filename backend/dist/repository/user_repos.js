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
exports.UserRepositories = void 0;
const { faker } = require('@faker-js/faker');
const user_data_1 = require("../data/user_data");
const user_1 = require("../class/user");
class UserRepositories {
    constructor() {
        this.userdata = new user_data_1.UserData();
        this.userdata.db.userTableInit();
        this.userdata.initiateDummyDB();
    }
    loginUser(credentials) {
        const lgnusr = user_1.User.fromJson(credentials);
        return this.userdata.login(lgnusr.username, lgnusr.password);
    }
    getAllUser(offset, limit) {
        return this.userdata.getAll(offset, limit);
    }
    getOneUser(uid) {
        return this.userdata.getByUid(uid);
    }
    delUser(uid) {
        return this.userdata.deleteOne(uid);
    }
    createUser(newuser) {
        return this.userdata.createOne(newuser);
    }
    updUser(uid, changes) {
        return this.userdata.updateOne(uid, changes);
    }
}
exports.UserRepositories = UserRepositories;
const urep = new UserRepositories();
urep.userdata.db.getConnection().serialize(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(yield urep.loginUser({ 'username': 'changarea', 'password': 'tlRKeZuwOb3DrIq' }));
}));
