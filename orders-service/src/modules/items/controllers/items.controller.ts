import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindItemsDto } from '../dto/find-items.dto';
import { ItemDto } from '../dto/item.dto';
import { ItemsService } from '../services/items.service';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({
    summary: 'Get all available items',
  })
  @ApiResponse({
    type: [ItemDto],
  })
  @Get()
  async findAll(): Promise<ItemDto[]> {
    return this.itemsService.findAll();
  }
}
