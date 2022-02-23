import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcConfigs } from 'src/configs/grpc';
import { PasscodesController } from './controllers/passcodes.controller';
import { SessionsController } from './controllers/sessions.controller';

@Module({
  controllers: [SessionsController, PasscodesController],
  imports: [ClientsModule.register([grpcConfigs.authService])],
})
export class SessionsModule {}
