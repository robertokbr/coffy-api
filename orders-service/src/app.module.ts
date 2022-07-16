import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './shared/prisma/prisma.service';
import { OrdersModule } from './modules/orders/orders.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { CommonModule } from './modules/common/common.module';
import { ItemsModule } from './modules/items/items.module';

@Module({
  imports: [CommonModule, OrdersModule, ItemsModule, SessionsModule ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
