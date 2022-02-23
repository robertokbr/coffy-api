import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { ClientsModule } from '@nestjs/microservices';
import EnsureAuthenticated from './middlewares/ensure-authenticated';
import { ItemsController } from './controllers/items.controller';
import { OrderStatesController } from './controllers/order-states.controller';
import { ItemsService } from './services/items.service';
import { grpcConfigs } from 'src/configs/grpc';
import { OrdersRepository } from './repositories/orders.repository';
import { ItemsRepository } from './repositories/items.repository';
import { OrderStatesRepository } from './repositories/order-states.repository';
import { WebsocketGatewayProvider } from './providers/websocket-gateway.provider';

@Module({
  imports: [ClientsModule.register([grpcConfigs.authService])],
  controllers: [OrdersController, ItemsController, OrderStatesController],
  providers: [
    OrdersService,
    ItemsService,
    OrdersRepository,
    ItemsRepository,
    OrderStatesRepository,
    WebsocketGatewayProvider,
  ],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticated)
      .forRoutes({ path: 'orders', method: RequestMethod.ALL });
  }
}
