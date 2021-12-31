import { Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/shared/types';

@ApiTags('pass-codes')
@Controller('pass-codes')
export class PassCodesController implements OnModuleInit {
  private authService: AuthService;

  constructor(
    @Inject('AuthService')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  @Post()
  create() {
    return this.authService.createPassCode({});
  }
}
