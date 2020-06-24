import { Middleware, IMiddleware, EndpointInfo, Required, Req, Res } from "@tsed/common";
import jwt from 'jsonwebtoken';
import { Forbidden, Unauthorized } from "@tsed/exceptions";
import { User } from '../User';
import { Document } from "mongoose";

export interface AuthenticatedReq extends Req {
  user?: any;
}

@Middleware()
export class Authentication implements IMiddleware {

  async use(@Req() request: AuthenticatedReq, @EndpointInfo() endpoint: EndpointInfo) {

    const options = endpoint.get(Authentication) || {};

    Authentication.attachUserToRequest(request);

    if (!request.user) {
      throw new Unauthorized("Unauthorized");
    }

    if (options.role && request.user.role !== options.role) {
      throw new Forbidden("Forbidden");
    }

  }

  static attachUserToRequest(request: AuthenticatedReq): void {
    if (typeof request.headers.cookie === 'string') {
      const cookieArray = request.headers.cookie
        .split(';')
        .filter((cookie) => cookie.indexOf('Authentication') !== -1);

      if (cookieArray.length > 0) {
        const token = cookieArray[0].split('=')[1];
        request.user = jwt.verify(token, process.env.JWT_KEY || 'My_Key');
      }
    }
    return;
  }

  static attachTokenToHeader(response: Res, user: User & Document): any {


    const userToAttach = user.toObject();
    delete userToAttach.password;

    const tokenValue = jwt.sign({ ...userToAttach }, process.env.JWT_KEY || 'My_Key', {expiresIn: '1d'});
    const config = { maxAge: 86400000, httpOnly: true, };

    response.cookie('Authentication', tokenValue, config)

    return userToAttach;
  }
}