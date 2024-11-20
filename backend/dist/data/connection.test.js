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
const connection_1 = require("./connection");
const UserDB_1 = require("./UserDB");
describe("connection test", () => {
    test("db static should not be null", () => __awaiter(void 0, void 0, void 0, function* () {
        new connection_1.DbConnection();
        const userdb = new UserDB_1.UserDb(connection_1.DbConnection.dbsqlite);
        yield userdb.initTestUser();
        const getuser = yield userdb.getUser();
        console.log(getuser);
    }));
});
