import { rewardCardPriceMultiplier } from "../config/envImports";

export const calculateRewardCardPrice = (dollarPrice: number) => {
  return Math.ceil(dollarPrice * rewardCardPriceMultiplier);
};
