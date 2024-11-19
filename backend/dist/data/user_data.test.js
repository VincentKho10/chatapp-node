"use strict";
const { UserData } = require("./user_data");
describe("UserDataTesting", () => {
    test("UserData getOne should return selected user by uid", () => {
        expect(new UserData().getOne("0").toString()).toBe("0");
    });
    test("UserData getAll should return all registered user", () => {
        const userdata = new UserData();
        expect(userdata.getAll()).toEqual(userdata.res);
    });
});
