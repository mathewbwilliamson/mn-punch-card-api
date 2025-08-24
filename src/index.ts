require("dotenv").config({ path: "./.env" });
import { envPort, envIsDebug } from "./config/envImports";

const appInsights = require("applicationinsights");
import { AzureApplicationInsightsLogger } from "winston-azure-application-insights";
import "reflect-metadata"; // this shim is required
import bodyParser from "body-parser";
import { createExpressServer } from "routing-controllers";
import { NextFunction } from "express";
import winston from "winston";
import { LoggingMiddleware } from "./middleware/LoggingMiddleware";
import { loggerFormatProd, loggerFormatDev } from "./config/loggerConfigs";

appInsights.setup().start();

winston.add(
  new AzureApplicationInsightsLogger({
    client: appInsights.defaultClient,
  })
);

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./logs/newlogs.log" }),
  ],
  format: !!envIsDebug ? loggerFormatDev : loggerFormatProd,
});

// Controller imports
import { AmazonController } from "./controllers/AmazonController";
import { EmailController } from "./controllers/EmailController";
import { OrderProductController } from "./controllers/OrderProductController";
import { RefreshHistoryController } from "./controllers/RefreshHistoryController";
import { HealthCheckController } from "./controllers/HealthCheckController";

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: true,
  controllers: [
    AmazonController,
    EmailController,
    OrderProductController,
    RefreshHistoryController,
    HealthCheckController,
  ],
  middlewares: [LoggingMiddleware],
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use((err: Error, req: Express.Request, res: any, next: NextFunction) => {
  logger.error({
    name: err.name,
    message: err.message,
    stack: JSON.stringify(err.stack),
  });

  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
});

app.listen(envPort, () => {
  logger.info(`Server listening on port ${envPort}!`);
});
