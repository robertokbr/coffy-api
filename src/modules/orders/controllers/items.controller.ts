import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemsRepository } from '../items.repository';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  @Get()
  findAll() {
    return this.itemsRepository.find();
  }
}
