import { Service, Inject } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { User, UserModel } from './model';
import { Document, ModelUpdateOptions, SaveOptions, Types } from "mongoose";

@Service()
export class UserService{

  @Inject(User)
  private User: UserModel;

  constructor() { }

  $onInit() {
    this.reload();
  }

  async reload() {
    const users = await this.User.countDocuments();

    if (users === 0) {
      const promises = require("../../resources/users.json").map(user => this.updateUser(user));
      await Promise.all(promises);
    }
  }

  async updateUser(user: User, options?: ModelUpdateOptions ): Promise<User> {
    $log.debug({ message: "Validate user", user });

    const model = new this.User(user);
    $log.debug({ message: "Save User", user });
    await model.updateOne(user, { ...options, upsert: true });

    $log.debug({ message: "User Updated", model });

    return model;
  }

  async save(user: User, options?: SaveOptions): Promise<User> {
    $log.debug({ message: "Validate user", user });

    const model = new this.User(user);

    $log.debug({ message: "Save User", user });
    await model.save(options);

    $log.debug({ message: "User saved", model });

    return model;
  }

  async query(options = {}): Promise<User[]> {
    return this.User.find(options).exec();
  }

  async findUserByEmail(email: string): Promise<User & Document> {
    return this.User.findOne({ email }).exec();
  }

  async findOne(options = {}): Promise<User & Document>{
    return this.User.findOne(options).exec();
  }

  async removeWorkspace(options: {userId : Types.ObjectId | string, workspaceId: Types.ObjectId}){
    const user = await this.User.findOne({ _id: options.userId, 'workspaces.workspaceId': options.workspaceId });
    if(user == null){
      throw new Error('This user does not have the workspace');
    }
    const workspaceToRemove = user.workspaces.filter((workspace) => String(workspace.workspaceId) === String(options.workspaceId))[0];
    user.workspaces.pull(workspaceToRemove);
    return user.save();
  }
  
}