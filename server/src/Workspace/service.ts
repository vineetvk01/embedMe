import { Service, Inject } from "@tsed/common";
import { MongooseService, MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { Workspace } from './model';

@Service()
export class WorkspaceService {

  @Inject(Workspace)
  private Workspace: MongooseModel<Workspace>;
  private default;

  constructor() {}

  $onInit() {
    this.reload();
  }

  async reload() {
    const users = await this.Workspace.countDocuments();
  
    if (users === 0) {
      const promises = require("../../resources/workspaces.json").map(workspace => this.save(workspace));
      await Promise.all(promises);
    }
  }

  /**
 *
 * @param calendar
 * @returns {Promise<TResult|TResult2|Calendar>}
 */
  async save(workspace: Workspace): Promise<Workspace> {
    $log.debug({ message: "Validate user", workspace });

    const model = new this.Workspace(workspace);
    $log.debug({ message: "Save User", workspace });
    await model.updateOne(workspace, { upsert: true });

    $log.debug({ message: "User saved", model });

    return model;
  }
}