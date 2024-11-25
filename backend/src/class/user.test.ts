const {User} = require("./user");

const {faker} = require("@faker-js/faker");

describe("Testing User Class Behavior", () => {
  const user = new User("0", faker.internet.username(), faker.internet.password(), faker.person.firstName(), faker.person.lastName(), Date.now(), Date.now());
  test("User from and to are work as expected", () => {
    const userfrom = User.fromJson(user.toJson())
    expect(user).toEqual(userfrom);
  });
  test("User lsofField should return list of its variables", () => {
    const userfields = user.lsofParams();
    expect(userfields).toEqual([
      'uid',
      'username',
      'password',
      'firstname',
      'lastname',
      'createdAt',
      'updatedAt',
      'deletedAt'
    ])
  });
});
