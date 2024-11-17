const sqlite3 = require('sqlite3').verbose()

class DBConnection{
    static db = null;

    constructor(){
        const db = DBConnection.db;
        if(db){
            return db
        }else{
            db = sqlite3.Database('testingdb.db', (err)=>{
                if (err){
                    
                }
            })
        }
        this.createUserTable();
    }

    createUserTable(){
        const sql = 'CREATE TABLE User(uid TEXT KEY, username NOT NULL TEXT, password TEXT, firstname TEXT, lastname TEXT, createdAt DATETIME, updatedAt DATETIME)'
        
        DBConnection.db.run(sql)
    }

    createUser(){

    }

    readUser(uid){
        if (uid){
            const sql = 'SELECT * FROM User WHERE uid = ?'
            DBConnection.db.all(sql,[uid],(err)=>{

            })
            return User()
        } else {

        }
    }

    updateUser(){

    }

    deleteUser(){

    }
}