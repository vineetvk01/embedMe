import { Property, Required, Enum, Email, MaxLength, Default, PropertySerialize, PropertyType } from "@tsed/common";
import { Model, Schema, ObjectID, Ref, Unique, PreHook } from "@tsed/mongoose";
import bcrypt from "bcrypt";
import { Workspace } from '../Workspace/model';

export enum Roles {
  ADMIN = "admin",
  USER = "user"
}

const saltRounds = 10;

@Schema()
export class MyWorkspace {

  @Ref(Workspace)
  workspaceId: Ref<Workspace>;

  @Property()
  @Required()
  @MaxLength(50)
  title: string;

  @Property()
  @Required()
  @MaxLength(50)
  role: Roles;
}

@Model()
export class User {

  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  firstName: string;

  @Property()
  @Required()
  lastName: string;

  @Unique()
  @Required()
  @Email()
  email: string;

  @Property()
  @PropertySerialize(v => '*****')
  password: string;

  @Enum(Roles)
  @Required()
  @Default(Roles.USER)
  role: Roles = Roles.USER;

  @Property()
  @Required()
  @Default(false)
  isActive: boolean = false;

  @Property()
  @Required()
  @Default(Date)
  signedUpAt: Date = new Date();

  @PropertyType(MyWorkspace)
  workspaces: Array<MyWorkspace>;

  @PreHook("save")
  static preSave(user: User, next: any) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
  }


  isCorrectPassword(expectedPassword: string):boolean {
    const user: User = this;
    return bcrypt.compareSync(expectedPassword, user.password);
  }

}