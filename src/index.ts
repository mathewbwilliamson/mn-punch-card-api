import "reflect-metadata"; // this shim is required
import bodyParser from "body-parser";
import { createExpressServer } from "routing-controllers";
import { NextFunction } from "express";
import pino from "pino";
import expressPino from "express-pino-logger";

console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] HI 1");
// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config({ path: "./.env" });

console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] 2");
// Controller imports
import { AmazonController } from "./controllers/AmazonController";
import { EmailController } from "./controllers/EmailController";
import { OrderProductController } from "./controllers/OrderProductController";
import { RefreshHistoryController } from "./controllers/RefreshHistoryController";
import { HealthCheckController } from "./controllers/HealthCheckController";

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
  },
  process.env.LOG_DESTINATION !== "console" &&
    pino.destination("./logs/pino.log")
);
const expressLogger = expressPino({ logger });

console.log(
  "\x1b[41m%s \x1b[0m",
  "FIXME: [matt] 3 PORT",
  process.env.PORT,
  process.env.API_PORT
);
// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: true,
  controllers: [
    AmazonController,
    EmailController,
    OrderProductController,
    RefreshHistoryController,
    HealthCheckController,
  ], // we specify controllers we want to use
});

console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] 4");

app.use(expressLogger);
console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] 5");

app.use(bodyParser.urlencoded({ extended: false }));
console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] 6");

app.use((err: Error, req: Express.Request, res: any, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  console.log("\x1b[43m%s \x1b[0m", "ERROR", err);
});
console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] 7");

app.listen(process.env.PORT, () => {
  logger.info(`Server listening on port ${process.env.PORT}!`);
});
