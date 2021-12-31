import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../modules/orders/entities/user.entity';

export const GetUser = createParamDecorator(
  async (_data, context: ExecutionContext): Promise<User> => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
