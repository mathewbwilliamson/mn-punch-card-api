import { NewOrder } from '../types/productTypes';
import {
    ProductOrder,
    ProductOrderAttributes,
    ProductOrderCreationAttributes,
} from '../../models/ProductOrder';

export async function saveProductOrder(newProductOrder: NewOrder) {
    const newProduct: ProductOrderCreationAttributes = {
        firstNameOfChild: newProductOrder.order.firstNameOfChild,
        lastNameOfChild: newProductOrder.order.lastNameOfChild,
        firstNameOfParent: newProductOrder.order.firstNameOfParent,
        lastNameOfParent: newProductOrder.order.lastNameOfParent,
        emailAddressOfParent: newProductOrder.order.emailAddressOfParent,
        streetAddress: newProductOrder.order.streetAddress,
        city: newProductOrder.order.city,
        state: newProductOrder.order.state,
        zipCode: newProductOrder.order.zipCode,
        productTitle: newProductOrder.product.title,
        amazonTitle: newProductOrder.product.amazonTitle,
        asin: newProductOrder.product.asin,
        createdBy: 'ME',
        link: newProductOrder.product.link,
        price: newProductOrder.product.price,
        rewardCardPrice: newProductOrder.product.rewardCardPrice,
        createdAt: new Date().toISOString(),
        isOrdered: false,
    };
    await ProductOrder.create(newProduct).catch((err) => {
        console.error(err);
        return "failure";
    });

    return "success";
}

export async function getAllOrders() {
    return await ProductOrder.findAll({
        raw: true,
        where: { isDeleted: false || null },
    });
}

export async function patchOrder(
    id: number,
    body: Partial<ProductOrderAttributes>
) {
    return await ProductOrder.update({ ...body }, { where: { id } });
}
