const User = require("../class/user");

const sqlite3 = require("sqlite3").verbose();

class DbConnection {
  static db = None;
  
  constructor() {
    this.userkeys = [];
    this.uservalues = [];
    
    this.userkeysstr = ''
    this.uservaluestr = ''
    if (db) {
      return db;
    } else {
      db = new sqlite3.Database(
        "testingdb.db",
        sqlite3.OPEN_READWRITE,
        (err) => {
          console.error(err.message);
        }
      );
      const sqltable =
        "CREATE TABLE User (uid TEXT PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, firstname TEXT, lastname TEXT, createdAt DATE, updateAt DATE)";
      db.run(sqltable);
    }
  }

  dissectUserObj(user){
    if(!this.userkeysstr){

      for ([key, value] in user.toJson()) {
        this.userkeys.push(key);
        this.uservalues.push(value);
      }
      this.userkeys.map((v, i) =>
        userkeystr += i == this.userkeys.length ? v : v + ","
    )
    for (var i = 0; i <= this.uservalues.length; i++){
      uservaluestr += i == this.uservalues.length ? "?" : "?,"
    }
  }
    return (userkeysstr, uservaluestr)
  }

  createUser(user) {
    this.dissectUserObj(user)
    const insertusersql = `INSERT INTO User(${this.userkeysstr}) VALUES (${this.uservaluestr})`;
    DbConnection.db.run(insertusersql, this.uservalues, (err) => {
      if(err){
        console.error(err.message)
      }else{
        
      }
    });
  }

  getUser(uid){
    if(uid){
      const getusersql = `SELECT * FROM User WHERE uid = ?`
    } else {
      const getusersql = `SELECT * FROM User`
    }
    const res = []
    DbConnection.db.all(getusersql, [uid], (err,rows) => {
      if (err){
        console.error(err.message)
      }else{
        for (row in rows){
          res.push(new User.fromJson(row))
        }
      }
    });
    return res
  }

  updateUser(uid, user){
    if(updated_user){
      //update
      const updatesql = `UPDATE User SET ${()=>{
        for (let i=0; i<this.userkeys.length; i++){
          var res = this.userkeys[i] + " = ?"
          if (i==this.userkeys.length-1) res+=", ";
        }
      }} WHERE EXIST(SELECT 1 FROM User WHERE uid = ?)`
      DbConnection.db.run(updatesql, [...this.uservalues, uid], (err)=>{
        if(err){
          console.error(err.message)
        }
      })
    } else {
      console.error('user not found')
    }
  }

  closeConnection() {
    db.close();
  }
}
