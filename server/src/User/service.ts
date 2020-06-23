import { Service, Inject } from "@tsed/common";
import { MongooseService, MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { User } from './model';

@Service()
export class UserService {

  @Inject(User)
  private User: MongooseModel<User>;

  constructor() {}

  $onInit() {
    this.reload();
  }

  async reload() {
    const users = await this.User.countDocuments();
  
    if (users === 0) {
      const promises = require("../../resources/users.json").map(user => this.save(user));
      await Promise.all(promises);
    }
  }

  /**
 *
 * @param calendar
 * @returns {Promise<TResult|TResult2|Calendar>}
 */
  async save(user: User): Promise<User> {
    $log.debug({ message: "Validate user", user });

    const model = new this.User(user);
    $log.debug({ message: "Save User", user });
    await model.updateOne(user, { upsert: true });

    $log.debug({ message: "User saved", model });

    return model;
  }
}