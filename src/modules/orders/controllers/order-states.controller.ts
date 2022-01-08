import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderStatesRepository } from '../order-states.repository';

@ApiTags('order-states')
@Controller('order-states')
export class OrderStatesController {
  constructor(private readonly orderStatesRepository: OrderStatesRepository) {}

  @ApiOperation({
    summary: 'Get the states that one order can have.',
  })
  @Get()
  public async findAll() {
    return this.orderStatesRepository.find();
  }
}
