import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindItemsDto } from '../dto/find-items.dto';
import { ItemsRepository } from '../items.repository';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  @ApiOperation({
    summary: 'Get all items or filter the result by the item availability',
  })
  @Get()
  findAll(@Query() findItemsDto?: FindItemsDto) {
    return this.itemsRepository.find(findItemsDto);
  }
}
