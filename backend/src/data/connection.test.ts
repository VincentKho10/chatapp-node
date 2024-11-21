import { Database } from "sqlite3";
import { DbConnection } from "./connection";
import { UserDb } from "./UserDB";

describe("connection test", () => {
  test("db static should not be null", async() => {
    const dbconn = new DbConnection();
    const userdb = new UserDb(dbconn.dbsqlite);
    await userdb.initTestUser();
    expect(await userdb.getUser()).not.toEqual(undefined)
  });
});
