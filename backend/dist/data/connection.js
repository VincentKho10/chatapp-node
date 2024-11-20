"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
const sqlite3 = require("sqlite3").verbose();
class DbConnection {
    constructor() {
        if (DbConnection.dbsqlite == undefined) {
            DbConnection.dbsqlite = new sqlite3.Database("testingdb.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
                console.error(err);
            });
        }
    }
    closeConnection() {
        if (DbConnection.dbsqlite) {
            DbConnection.dbsqlite.close();
        }
        DbConnection.dbsqlite = undefined;
    }
}
exports.DbConnection = DbConnection;
