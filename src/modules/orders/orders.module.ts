import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersRepository } from './orders.repository';
import { PasscodesController } from './controllers/passcodes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import paths from 'src/configs/paths';
import { SessionsController } from './controllers/sessions.controller';
import EnsureAuthenticated from './middlewares/ensure-authenticated';
import { ItemsRepository } from './items.repository';
import { ItemsController } from './controllers/items.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AuthService',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: 'Auth',
          protoPath: paths.proto,
        },
      },
    ]),
  ],
  controllers: [
    OrdersController,
    PasscodesController,
    SessionsController,
    ItemsController,
  ],
  providers: [OrdersService, OrdersRepository, ItemsRepository],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticated)
      .forRoutes({ path: 'orders', method: RequestMethod.POST });
  }
}
