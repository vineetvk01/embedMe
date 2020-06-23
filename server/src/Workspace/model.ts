import { Property, Required, PropertyName } from "@tsed/common";
import { Model, ObjectID } from "@tsed/mongoose";

@Model()
export class Workspace {
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  name: string;

  @Property()
  image: string;

  @Property()
  createdAt: Date = new Date();

}