import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcConfigs } from 'src/configs/grpc';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      grpcConfigs.authService,
    ]),
  ],
  exports: [
    ClientsModule,
  ]
})
export class CommonModule {}
