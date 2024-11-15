class User {
  constructor(uid, username, password, firstname, lastname, createdAt, updatedAt) {
    this.uid = uid;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json) {
    return new User(
      json["uid"],
      json["username"],
      json["password"],
      json["firstname"],
      json["lastname"],
      json["createdAt"],
      json["updatedAt"]
    );
  }

  toJson() {
    return {
      uid: this.uid,
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toString() {
    return this.uid;
  }
}

module.exports = User