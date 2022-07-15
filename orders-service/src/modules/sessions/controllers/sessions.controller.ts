import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { AuthServiceInterface } from 'src/modules/common/interfaces/auth-service.interface';
import { CreateSessionsDto } from '../dto/create-session.dto';
import { SessionDto } from '../dto/session.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController implements OnModuleInit {
  private authService: AuthServiceInterface;

  constructor(
    @Inject('AuthServiceModule')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceInterface>('AuthService');
  }

  @Post()
  @ApiOperation({
    summary: 'Create a session by a code and a name to generate the Auth JWT.',
  })
  create(@Body() createSessionDto: CreateSessionsDto): Promise<SessionDto> {
    const session = this.authService.createSession(createSessionDto);

    return firstValueFrom(session);
  }
}
