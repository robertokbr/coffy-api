import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcConfigs } from 'src/configs/grpc';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { WebsocketGatewayProvider } from './providers/websocket-gateway.provider';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      grpcConfigs.authService,
    ]),
  ],
  providers: [
    WebsocketGatewayProvider,
    JwtAuthGuard,
  ],
  exports: [
    ClientsModule,
    JwtAuthGuard,
    WebsocketGatewayProvider,
  ]
})
export class CommonModule {}
