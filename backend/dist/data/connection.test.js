"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = require("./user_data");
describe("connection test", () => {
    test("db static should not be null", () => {
        const userdb = new user_data_1.UserData();
        expect(userdb.getAll()).not.toEqual(undefined);
    });
});
