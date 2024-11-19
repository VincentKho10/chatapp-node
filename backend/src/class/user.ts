export class User {
  uid: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  createdAt: Number;
  updatedAt: Number;

  constructor(
    uid: string,
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    createdAt: Number,
    updatedAt: Number
  ) {
    this.uid = uid;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: Record<string, any>): User {
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

  public toJson(): Record<string, any> {
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

  public toString(): string {
    return this.uid;
  }
}
