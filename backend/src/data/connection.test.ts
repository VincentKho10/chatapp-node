import { UserData } from "./user_data";

describe("connection test", () => {
  test("db static should not be null", () => {
    const userdb = new UserData();
    expect(userdb.getAll()).not.toEqual(undefined)
  });
});
