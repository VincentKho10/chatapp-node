"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
describe("connection test", () => {
    test("db static should not be null", () => {
        const connection = new connection_1.DbConnection();
        expect(connection_1.DbConnection.dbsqlite).not.toEqual(null);
    });
});
