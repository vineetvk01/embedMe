import { Controller, Get, Post, Status } from "@tsed/common";
import { Request, Response } from "@tsed/common";
import {BadRequest} from "@tsed/exceptions";

@Controller("/user")
export class UserController {

  @Get('/me')
  @Status(200)
  currentUser(req: Request, res: Response): any {
    
    return {}
  }

  @Post('/login')
  async loginUser(req: Request, res: Response): Promise<void> {

    res.status(200).send({
      status: 'failed'
    });

  }
}