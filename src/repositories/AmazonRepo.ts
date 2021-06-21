import { RawAmazonRequestBody } from "../types/amazonTypes";
import { NewProduct, Product } from "../types/productTypes";
import { calculateRewardCardPrice } from "../utils/calculateRewardCardPrice";
import { Products, ProductsAttributes } from "../../models/Products";
import db from "../../models";
import { logger } from "../index";

export const transformItem = (
  amazonItem: RawAmazonRequestBody,
  title?: string
) => {
  const possiblePrice = amazonItem.product?.buybox_winner?.price?.value;
  const price = Math.ceil(possiblePrice);
  const transformedItem: NewProduct = {
    asin: amazonItem.product.asin,
    amazonTitle: amazonItem.product.title,
    imageUrl: amazonItem.product.main_image.link,
    price,
    rewardCardPrice: calculateRewardCardPrice(possiblePrice),
    title: title || amazonItem.product.title,
    link: `${amazonItem.product.link}/ref=as_li_tl?ie=UTF8&tag=newtamparewar-20`,
    createdAt: new Date().toString(),
    createdBy: "ME", // [matt] THIS NEEDS TO CHANGE
    updateSource: "manual",
  };
  return transformedItem;
};

export const saveAmazonItem = (
  amazonItem: RawAmazonRequestBody,
  title?: string
) => {
  const transformedItem = transformItem(amazonItem, title);
  saveItem(transformedItem);
};

export function saveItem(amazonItem: NewProduct) {
  return Products.create(amazonItem).catch((err) =>
    logger.error(JSON.stringify(err))
  );
}

export const getAllProducts = () => {
  return Products.findAll({
    where: {
      isDeleted: null,
    },
    raw: true,
  });
};

export const getSingleProduct = (id: number) => {
  return Products.findOne({
    where: {
      id,
      isDeleted: null,
    },
    raw: true,
  });
};

export const getProductMetadata = () => {
  return db.sequelize.query(
    "SELECT asin, id, title, rewardCardPrice FROM Products WHERE isDeleted IS NULL"
  );
};

export async function deleteItem(id: number) {
  return await Products.destroy({ where: { id } });
}

export const updateItemTitle = async (id: number, newTitle: string) => {
  return await Products.update({ title: newTitle }, { where: { id } });
};

export const updateProduct = async (
  id: number,
  attributes: Partial<ProductsAttributes>
) => {
  return await Products.update(attributes, { where: { id } });
};

export const updateItem = async (id: number, amazonItem: NewProduct) => {
  await Products.update(amazonItem, {
    where: { id },
  });
  return amazonItem;
};
