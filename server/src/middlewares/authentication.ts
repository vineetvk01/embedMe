import { Middleware, IMiddleware, PathParams, Required, Req } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";

@Middleware()
export class AuthenticationMiddleware implements IMiddleware {

  async use(@Req() req: Req) {
    const cookiesArray = req.headers.cookie
      .split(';')
      .filter((cookie) => cookie.indexOf('token') !== -1);

    if (cookiesArray.length > 0) {
      const value = cookiesArray[0].split('=')[1];
      
    }
  }
}