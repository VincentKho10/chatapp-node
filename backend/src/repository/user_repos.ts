const {faker} = require('@faker-js/faker')
import { UserData } from "../data/user_data"
import { User } from "../class/user"
import { ERROR } from "sqlite3";

export class UserRepositories{
    userdata: UserData

    constructor(){
        this.userdata = new UserData();
        this.userdata.db.userTableInit()
        this.userdata.initiateDummyDB()
    }

    loginUser(credentials: Record<string, string>): Promise<String> {
        const lgnusr = User.fromJson(credentials)
        return this.userdata.login(lgnusr.username, lgnusr.password)
    }

    getAllUser(offset: number, limit: number): Promise<User[]>{
        return this.userdata.getAll(offset, limit)
    }

    getOneUser(uid: string): Promise<User[]>{
        return this.userdata.getByUid(uid)
    }
    
    delUser(uid: string): Promise<Record<any,any>>{
        return this.userdata.deleteOne(uid)
    }

    createUser(newuser: User): Promise<Record<any,any>>{
        return this.userdata.createOne(newuser)
    }

    updUser(uid: string, changes: User): Promise<Record<any,any>>{
        return this.userdata.updateOne(uid, changes)
    }

}

const urep = new UserRepositories()
urep.userdata.db.getConnection().serialize(async ()=>{
    console.log(await urep.loginUser({'username': 'changarea', 'password': 'tlRKeZuwOb3DrIq'}))
})