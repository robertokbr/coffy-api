import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PrismaService } from './prisma/prisma.service';
import { ItemsModule } from './modules/items/items.module';

@Module({
  imports: [UsersModule, OrdersModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
