import { Database, sqlite3 } from "sqlite3";
const sqlite3 = require("sqlite3").verbose();
import { User } from "../class/user";

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
  }
  
  userTableInit() {
    const lsofparams = new User().lsofParams().map((v,i)=>{
      var res = v
      if(i==0){
        res += " PRIMARY KEY"
      }
      if(v!="deletedAt TEXT"){
        res += " NOT"
      }else{
        return res + " NULL"
      }
      return res + " NULL, "
    }).reduce((prev,curr)=>prev+=curr)
    console.log(`CREATE TABLE IF NOT EXISTS users(${lsofparams});`)
    this.dbsqlite.prepare(
      `CREATE TABLE IF NOT EXISTS users(${lsofparams});`
    ).run((err)=>err?console.error(err?.message):"");
  }

  getConnection() {
    return this.dbsqlite;
  }

  closeConnection() {
    this.dbsqlite.close();
  }
}
