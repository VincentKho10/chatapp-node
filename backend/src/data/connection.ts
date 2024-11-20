import { Database, sqlite3 } from "sqlite3";
const sqlite3 = require("sqlite3").verbose();

export class DbConnection {
  static dbsqlite?: Database;

  constructor() {
    if (DbConnection.dbsqlite == undefined) {
      DbConnection.dbsqlite = new sqlite3.Database(
        "testingdb.db",
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err: Error) => {
          console.error(err);
        }
      );
    }
  }

  closeConnection() {
    if (DbConnection.dbsqlite){
      DbConnection.dbsqlite.close();
    }
    DbConnection.dbsqlite = undefined
  }
}
