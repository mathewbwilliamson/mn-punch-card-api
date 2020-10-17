import {
  JsonController,
  Get
} from 'routing-controllers';

@JsonController()
export class HealthCheckController {
  @Get('/api/healthcheck')
  async healthCheck() {
      return 'Server is running';
  }
}
