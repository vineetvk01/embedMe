import { Configuration, Inject, PlatformApplication } from "@tsed/common";
import { GlobalAcceptMimesMiddleware, GlobalErrorHandlerMiddleware } from "@tsed/platform-express";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";

const rootDir = __dirname;

@Configuration({
  mongoose:
  {
    url: "mongodb+srv://admin:admin@cluster0-dtsta.mongodb.net/default?retryWrites=true&w=majority",
    connectionOptions: { useNewUrlParser: true, useUnifiedTopology: true, }
  },
  rootDir,
  acceptMimes: ["application/json"],
  mount: {
    "/api": `${rootDir}/controllers/**/*.ts`
  },
  componentsScan: [
    `./**/service.js`
  ],
  httpPort: "127.0.0.1:4000",
  httpsPort: "127.0.0.2:4001",
  passport: {},
  logger: {
    level: "info",
    //requestFields: ["reqId", "method", "url", "headers", "body", "query", "params", "duration"],
    logRequest: false,
    disableRoutesSummary: true
  },
  
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(GlobalAcceptMimesMiddleware)
      .use(GlobalErrorHandlerMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}