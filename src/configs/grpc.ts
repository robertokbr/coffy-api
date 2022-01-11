import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import paths from './paths';

interface IgRPCConfigs {
  authService: ClientProviderOptions;
}

export default {
  authService: {
    name: 'AuthService',
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'Auth',
      protoPath: paths.proto,
    },
  },
} as IgRPCConfigs;
