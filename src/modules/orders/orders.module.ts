import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersRepository } from './orders.repository';
import { PasscodesController } from './controllers/passcodes.controller';
import { ClientsModule } from '@nestjs/microservices';
import { SessionsController } from './controllers/sessions.controller';
import EnsureAuthenticated from './middlewares/ensure-authenticated';
import { ItemsRepository } from './items.repository';
import { ItemsController } from './controllers/items.controller';
import { OrderStatesRepository } from './order-states.repository';
import { OrderStatesController } from './controllers/order-states.controller';
import grpcConfigs from '../../configs/grpc';

@Module({
  imports: [ClientsModule.register([grpcConfigs.authClient])],
  controllers: [
    OrdersController,
    PasscodesController,
    SessionsController,
    ItemsController,
    OrderStatesController,
  ],
  providers: [
    OrdersService,
    OrdersRepository,
    ItemsRepository,
    OrderStatesRepository,
  ],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticated)
      .forRoutes({ path: 'orders', method: RequestMethod.POST });
  }
}
