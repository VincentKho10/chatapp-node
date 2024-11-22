"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = require("./user_data");
describe("UserDataTesting", () => {
    test("UserData getOne should return selected user by uid", () => {
        expect(new user_data_1.UserData().getOne("0").toString()).not.toBe(undefined);
    });
    test("UserData getAll should return all registered user", () => {
        const userdata = new user_data_1.UserData();
        expect(userdata.getAll()).not.toEqual(undefined);
    });
});
