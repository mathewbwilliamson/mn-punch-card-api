export const envPort = process.env.PORT;
export const envIsDebug = process.env.LOG_LEVEL === "debug";
export const mailApiKey = process.env.EMAIL_API_KEY;
export const mailApiDomain = process.env.EMAIL_API_DOMAIN;

export const rewardCardPriceMultiplier = 1.25;

if (!envPort || !mailApiKey || !mailApiDomain) {
    throw new Error("All Env Variables are not setup. Please setup all ENV variables");
}