import { JsonController, Get } from "routing-controllers";
import { logger } from "..";

@JsonController()
export class HealthCheckController {
  @Get("/api/healthcheck")
  async healthCheck() {
    return "Server is running";
  }
}
