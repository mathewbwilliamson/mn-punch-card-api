import { BasicResource } from './generalTypes';

export interface Product extends BasicResource, NewProduct {}

export interface NewProduct {
    asin: string;
    amazonTitle: string;
    price: number;
    rewardCardPrice: number;
    title: string;
    imageUrl: string;
    link: string;
    createdAt: string;
    createdBy: string;
    updateSource: string;
}
