class User {
  constructor(username, password, firstname, lastname, createdAt, updatedAt) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json) {
    return User(
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
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
