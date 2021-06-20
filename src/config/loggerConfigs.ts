import winston from "winston";

export const loggerFormat = winston.format.combine(
  winston.format.label({
    label: `Label🏷️`,
  }),
  winston.format.errors({
    error: "ERROR",
  }),
  winston.format.timestamp({
    format: "MMM-DD-YYYY HH:mm:ss",
  }),
  winston.format.printf(
    (info) =>
      `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
  )
);
