import { Controller, Get, Post, Status, BodyParams, Required, Header } from "@tsed/common";
import { Request, Response } from "@tsed/common";
import { User, UserService, EmailAlreadyExists } from '../../User';
import { BadRequest } from "@tsed/exceptions";

@Controller("/user")
export class UserController {

  constructor(private userService: UserService) { }

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

  @Post('/register')
  @Status(201)
  async registerUser(@Required() @BodyParams() user: any): Promise<User> {

    const userExists = await this.userService.findUserByEmail(user.email);

    console.log(userExists);

    if (userExists) {
      console.log('This is working ?')
      throw (new EmailAlreadyExists());
    }

    try {
      const userRegistered = await this.userService.save(user);
      return userRegistered;
    }catch(error){
      throw new BadRequest(error.message);
    }
  }
}