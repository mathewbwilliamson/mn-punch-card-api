export const calculateRewardCardPrice = (dollarPrice: number) => {
    return Math.ceil(dollarPrice * 1.085);
};
