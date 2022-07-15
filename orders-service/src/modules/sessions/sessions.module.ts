import { Module } from '@nestjs/common';
import { SessionsController } from './controllers/sessions.controller';

// Move module to API gateway 
@Module({
  controllers: [SessionsController],
})
export class SessionsModule {}
