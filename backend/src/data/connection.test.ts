import { Database } from "sqlite3";
import { DbConnection } from "./connection";
import { UserDb } from "./UserDB";

describe("connection test", () => {
  test("db static should not be null", async() => {
    new DbConnection();
    const userdb = new UserDb(DbConnection.dbsqlite);
    await userdb.initTestUser();
    const getuser = await userdb.getUser()
    console.log(getuser)
  });
});
