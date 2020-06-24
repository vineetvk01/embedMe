import { Property, Required, Enum, Email, MaxLength, Default, PropertySerialize } from "@tsed/common";
import { Model, Schema, ObjectID, Ref, Unique, PreHook } from "@tsed/mongoose";
import bcrypt from "bcrypt";
import { Workspace } from '../Workspace/model';

@Schema()
class MyWorkspace {

  @Ref(Workspace)
  workspaceId: Ref<Workspace>;

  @Property()
  @Required()
  @MaxLength(50)
  title: string;

}

export enum Roles {
  ADMIN = "admin",
  USER = "user"
}

const saltRounds = 10;

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

  @Property()
  workspaces: MyWorkspace[];

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