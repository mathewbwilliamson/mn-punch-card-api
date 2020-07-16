import { BasicResource } from './generalTypes';

export interface Product extends BasicResource {
    asin: string;
    amazonTitle: string;
    price: number;
    title: string;
    imageUrl: string;
}
