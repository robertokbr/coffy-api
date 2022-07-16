import { Module } from '@nestjs/common';
import { ItemsController } from './controllers/items.controller';
import { ItemsRepository } from './repositories/items.repository';
import { ItemsService } from './services/items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsRepository, ItemsService],
  exports: [ItemsService]
})
export class ItemsModule {}
