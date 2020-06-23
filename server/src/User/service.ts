import { Service, Inject } from "@tsed/common";
import { MongooseService, MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { User } from './model';

@Service()
export class UserService {

  @Inject(User)
  private User: MongooseModel<User>;

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

  async updateUser(user: User): Promise<User> {
    $log.debug({ message: "Validate user", user });

    const model = new this.User(user);
    $log.debug({ message: "Save User", user });
    await model.updateOne(user, { upsert: true });

    $log.debug({ message: "User Updated", model });

    return model;
  }

  async save(user: User): Promise<User> {
    $log.debug({ message: "Validate user", user });

    const model = new this.User(user);
    $log.debug({ message: "Save User", user });
    await model.save();

    $log.debug({ message: "User saved", model });

    return model;
  }

  async query(options = {}): Promise<User[]> {
    return this.User.find(options).exec();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.User.findOne({ email }).exec();
  }
}