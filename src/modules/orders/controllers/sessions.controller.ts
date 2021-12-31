import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/shared/types';
import { CreateSessionsDto } from '../dto/create-session.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController implements OnModuleInit {
  private authService: AuthService;

  constructor(
    @Inject('AuthService')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  @Post()
  create(@Body() createSessionDto: CreateSessionsDto) {
    return this.authService.createSession(createSessionDto);
  }
}
