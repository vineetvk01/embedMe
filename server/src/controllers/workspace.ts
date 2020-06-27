import { Controller, Get, Post, Status, BodyParams, Required, UseAuth, Req, Delete, QueryParams, PathParams, $log } from "@tsed/common";
import { Response } from "@tsed/common";
import { Roles, UserService, EmailAlreadyExists, MyWorkspace } from '../User';
import { Authentication, AuthenticatedReq } from '../middlewares/authentication';
import { BadRequest, InternalServerError } from "@tsed/exceptions";
import { Workspace, WorkspaceService } from "../Workspace";
import { MongooseService } from "@tsed/mongoose";
import { Types } from "mongoose";


@Controller("/workspace")
export class WorkspaceController {

  constructor(
    private userService: UserService,
    private workspaceService: WorkspaceService,
    private mongooseService: MongooseService
  ) { }

  @Get('/')
  @UseAuth(Authentication, { role: Roles.USER })
  @Status(200)
  async myWorkspaces(req: AuthenticatedReq, res: Response): Promise<any> {
    const { workspaces } = await this.userService.findOne({_id: req.user._id});
    return { total: workspaces.length, workspaces }
  }

  @Post('/add')
  @Status(201)
  @UseAuth(Authentication, { role: Roles.USER })
  async addWorkspace(@Req() req: AuthenticatedReq, @Required @BodyParams() workspace: Workspace & { title: string }): Promise<any> {
    const { _id } = req.user;
    const session = await this.mongooseService.get().startSession();
    session.startTransaction();
    try {
      const options = { session, new: true };
      const workspaceD = await this.workspaceService.save(workspace, options);
      const user = await this.userService.findOne({ _id });
      console.log(user);
      user.workspaces.push({
        workspaceId: workspaceD._id,
        title: workspace.title,
        role: Roles.ADMIN
      });
      await this.userService.updateUser(user, options);
      await session.commitTransaction();
      return { user, workspace: workspaceD };
    } catch (err) {
      await session.abortTransaction();
    }
    session.endSession();
    throw new InternalServerError('Please try to change the name of the workspace');
  }

  @Delete('/remove/:workspaceId')
  @Status(200)
  @UseAuth(Authentication, { role: Roles.USER })
  async delete(@Req() req: AuthenticatedReq, @Required @PathParams("workspaceId") workspaceId: string): Promise<any> {
    const { _id } = req.user;
    try{
      const user = await this.userService.removeWorkspace({ userId:_id, workspaceId: Types.ObjectId(workspaceId) });
      return { user };
    }catch(e){
      throw new BadRequest(e.message);
    } 
  }
}