import { User } from "../class/user";

const { faker } = require('@faker-js/faker')

export class UserData{
    res: Array<any>;

    constructor(){
        this.res = []
        for (var i=0;i<=10;i++){
            this.createOne({
                'uid': i.toString(),
                'username': faker.internet.username(),
                'password': faker.internet.password(),
                'firstname': faker.person.firstName(),
                'lastname': faker.person.lastName(),
                'createdAt': faker.date.recent(),
                'updatedAt': faker.date.future(),  
            })
        }
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