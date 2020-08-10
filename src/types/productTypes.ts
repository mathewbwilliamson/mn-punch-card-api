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

export interface NewOrder {
    product: NewProduct;
    order: OrderProductForm;
}

export interface OrderProductForm {
    firstNameOfChild: string;
    lastNameOfChild: string;
    firstNameOfParent: string;
    lastNameOfParent: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    emailAddressOfParent: string;
    parentApproval: boolean;
}
