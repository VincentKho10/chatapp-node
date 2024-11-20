import { User } from "../class/user";

const { faker } = require('@faker-js/faker')

export class UserData{
    res: Array<any>;

    constructor(){
        this.res = []
    }

    getAll(){
        return this.res
    }

    getOne(uid: string){
        const res = this.res.filter(v=>v.uid==uid)
        return res
    }

    createOne(json: Record<string,any>): User{
        const addeduser: User = User.fromJson(json)
        this.res.push(addeduser)
        return addeduser
    }
    
    updateOne(uid: string, changes: Record<string,any>){
        const updidx = this.res.findIndex((v)=>v.uid==uid);
        this.res[updidx] = changes;
        return {...this.res[updidx]}
    }

    deleteOne(uid: string){
        const delidx = this.res.findIndex((v)=>v.uid == uid)
        const deltd = this.res.splice(delidx,1);
        return {...deltd[0]}
    }
}