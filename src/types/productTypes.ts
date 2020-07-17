import { BasicResource } from './generalTypes';

export interface Product extends BasicResource, NewProduct {}

export interface NewProduct {
    asin: string;
    amazonTitle: string;
    price: number;
    title: string;
    imageUrl: string;
    createdAt: string;
    createdBy: string;
}
