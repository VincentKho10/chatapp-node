"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
const sqlite3 = require("sqlite3").verbose();
const user_1 = require("../class/user");
class DbConnection {
    constructor() {
        this.dbsqlite = new sqlite3.Database("testingdb.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
    userTableInit() {
        const lsofparams = new user_1.User().lsofParams().map((v, i) => {
            var res = v;
            if (i == 0) {
                res += " PRIMARY KEY";
            }
            if (v != "deletedAt TEXT") {
                res += " NOT";
            }
            else {
                return res + " NULL";
            }
            return res + " NULL, ";
        }).reduce((prev, curr) => prev += curr);
        this.dbsqlite.prepare(`CREATE TABLE IF NOT EXISTS users(${lsofparams});`).all((err, rows) => err ? console.error(err.message) : console.log(rows));
    }
    getConnection() {
        return this.dbsqlite;
    }
    closeConnection() {
        this.dbsqlite.close();
    }
}
exports.DbConnection = DbConnection;
