import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('api-status')
@Controller()
export class AppController {
  @ApiOperation({
    summary: 'Test if the API is working.',
  })
  @Get()
  getStatus() {
    return { ok: true };
  }
}
