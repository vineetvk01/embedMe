import { Controller, Get, Post, Status, BodyParams, Required, UseAuth } from "@tsed/common";
import { Request, Res, Response } from "@tsed/common";
import { User, Roles, UserService, EmailAlreadyExists } from '../User';
import { Authentication, AuthenticatedReq } from '../middlewares/authentication';
import { BadRequest } from "@tsed/exceptions";

@Controller("/user")
export class UserController {

  constructor(private userService: UserService) { }

  @Get('/me')
  @UseAuth(Authentication, { role: Roles.USER })
  @Status(200)
  async currentUser(req: AuthenticatedReq, res: Response): Promise<any> {
    const user = await this.userService.findOne({_id: req.user._id});
    return { isLoggedIn: true, user }
  }

  @Post('/login')
  @Status(200)
  async loginUser(@Required() @BodyParams() user: any, @Res() res: Res): Promise<any> {
    const { email, password } = user;
    const userExists = await this.userService.findUserByEmail(email);
    if (!userExists) {
      throw new BadRequest('This email is not registered');
    }

    const isCorrectPassword = userExists.isCorrectPassword(password);
    if (!isCorrectPassword) {
      throw new BadRequest('The password you have entered is incorrect');
    }

    Authentication.attachTokenToHeader(res, userExists);

    return {user: userExists};
  }

  @Post('/register')
  @Status(201)
  async registerUser(@Required() @BodyParams() user: any): Promise<User> {

    const userExists = await this.userService.findUserByEmail(user.email);

    if (userExists) {
      throw (new EmailAlreadyExists());
    }

    try {
      const userRegistered = await this.userService.save(user);
      delete userRegistered.password;
      return userRegistered;
    } catch (error) {
      throw new BadRequest(error.message);
    }
  }
}