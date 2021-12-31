import { Transport } from '@nestjs/microservices';
import paths from './paths';

export default {
  client: {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: 'Auth',
      protoPath: paths.proto,
    },
  },
};
