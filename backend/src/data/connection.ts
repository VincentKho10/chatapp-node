import { Database, sqlite3 } from "sqlite3";
const sqlite3 = require("sqlite3").verbose();

export class DbConnection {
  private dbsqlite: Database;

  constructor() {
    this.dbsqlite = new sqlite3.Database(
      "testingdb.db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
      }
    );
    this.userTableInit();
  }
  
  userTableInit() {
    const utablefield = Object.getOwnPropertyNames(
      Object.getPrototypeOf(User())
    );
    this.dbsqlite.prepare(
      `CREATE TABLE IF NOT EXISTS users(${utablefield.toString()});`
    );
  }

  getConnection() {
    return this.dbsqlite;
  }

  closeConnection() {
    this.dbsqlite.close();
  }
}
