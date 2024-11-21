"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
const sqlite3 = require("sqlite3").verbose();
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
        const utablefield = Object.getOwnPropertyNames(Object.getPrototypeOf(User()));
        this.dbsqlite.prepare(`CREATE TABLE IF NOT EXISTS users(${utablefield.toString()});`);
    }
    getConnection() {
        return this.dbsqlite;
    }
    closeConnection() {
        this.dbsqlite.close();
    }
}
exports.DbConnection = DbConnection;
