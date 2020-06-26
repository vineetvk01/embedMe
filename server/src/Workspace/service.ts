import { Service, Inject } from "@tsed/common";
import { MongooseService, MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { Workspace } from './model';
import { Document, ModelUpdateOptions } from "mongoose";

@Service()
export class WorkspaceService {

  @Inject(Workspace)
  private Workspace: MongooseModel<Workspace>;

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
  async save(workspace: Workspace, options?: ModelUpdateOptions): Promise<Workspace & Document> {

    $log.debug({ message: "Validate Workspace", workspace });

    const model = new this.Workspace(workspace);
    $log.debug({ message: "Save Workspace", workspace });
    await model.updateOne(workspace, { ...options, upsert: true });

    $log.debug({ message: "User Workspace", model });

    return model;
  }
}