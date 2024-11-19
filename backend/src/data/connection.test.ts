import { DbConnection } from "./connection";

describe("connection test", () => {
  test("db static should not be null", () => {
    const connection = new DbConnection();
    expect(DbConnection.dbsqlite).not.toEqual(null);
  });
});
