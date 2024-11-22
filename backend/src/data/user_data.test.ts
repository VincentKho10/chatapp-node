import { UserData } from "./user_data"

describe("UserDataTesting",()=>{
    test("UserData getOne should return selected user by uid", ()=>{
    expect(
        new UserData().getOne("0").toString()
        ).not.toBe(undefined)
    })

    test("UserData getAll should return all registered user", ()=>{
        const userdata = new UserData()
        expect(
            userdata.getAll()
        ).not.toEqual(undefined)
    })
})