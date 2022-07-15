import { Module } from '@nestjs/common';
import { SessionsController } from './controllers/sessions.controller';

@Module({
  controllers: [SessionsController],
})
export class SessionsModule {}
