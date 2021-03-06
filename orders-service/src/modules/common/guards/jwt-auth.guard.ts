import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthServiceInterface } from 'src/modules/common/interfaces/auth-service.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('AuthModuleProvider')
    private readonly client: ClientGrpc,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    const [_, jwt] = authHeader.split(' ');
    const authService = this.client.getService<AuthServiceInterface>('AuthService');
    const data = authService.getSessionPayload({ jwt });

    request.user = await firstValueFrom(data);

    return true;
  }
}
