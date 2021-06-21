import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { logger } from "..";

@Middleware({ type: "before" })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(req: any, res: Express.Response, next: (err?: any) => any): void {
    const { method, path, params, body, route } = req;

    logger.info(
      JSON.stringify({
        method,
        path,
        params,
        body,
        route,
      })
    );
    next();
  }
}
