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
        this.userTableInit();
    }
    userTableInit() {
        this.dbsqlite.prepare(`CREATE TABLE IF NOT EXISTS users(${user_1.User.lsofParams()});`).all();
    }
    getConnection() {
        return this.dbsqlite;
    }
    closeConnection() {
        this.dbsqlite.close();
    }
}
exports.DbConnection = DbConnection;
