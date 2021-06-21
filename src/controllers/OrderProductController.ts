import {
  ProductOrder,
  ProductOrderAttributes,
} from "../../models/ProductOrder";
import {
  JsonController,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from "routing-controllers";
import { getAllOrders, patchOrder } from "../repositories/OrderProductRepo";
import { logger } from "..";

@JsonController()
export class OrderProductController {
  @Get("/api/orderproduct")
  async getAllOrders() {
    return await getAllOrders();
  }

  @Patch("/api/orderproduct/:id")
  async patch(
    @Param("id") id: number,
    @Body() body: Partial<ProductOrderAttributes>
  ) {
    return await patchOrder(id, body);
  }

  @Delete("/api/orderproduct/:id")
  async delete(@Param("id") id: number) {
    return await patchOrder(id, { isDeleted: true });
  }
}
