import winston from "winston";

export const loggerFormatProd = winston.format.combine(
  winston.format.label({
    label: `Label🏷️`,
  }),
  winston.format.timestamp({
    format: "MMM-DD-YYYY HH:mm:ss",
  }),
  winston.format.printf(
    (info) =>
      `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
  )
);

export const loggerFormatDev = winston.format.combine(
  winston.format.colorize(),
  winston.format.label({
    label: `Label`,
  }),
  winston.format.timestamp({
    format: "MMM-DD-YYYY HH:mm:ss",
  }),
  winston.format.printf(
    (info) =>
      `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
  )
);
