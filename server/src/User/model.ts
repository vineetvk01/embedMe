import { Property, Required, Enum, Email, Pattern, MaxLength, Default } from "@tsed/common";
import { Model, Schema, ObjectID, Ref, Unique } from "@tsed/mongoose";
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

enum Roles {
  ADMIN = "admin",
  USER = "user"
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

}