import { Test, TestingModule } from "@nestjs/testing";
import { Observable } from "rxjs";
import { SessionsController } from "./sessions.controller";

describe('SessionsController', () => {
  let controller: SessionsController;

  const mockTime = Date.now().toString();

  const mockAuthServiceModule = {
    getService: (_token) => ({
      createSession: (_createSessionDto) => new Observable((sub) => {
        sub.next({
          jwt: 'jwt',
          expiration: mockTime,
         });
      }),
    }),
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SessionsController],
      providers: [
        {
          provide: 'AuthServiceModule',
          useValue: mockAuthServiceModule,
        }
      ]
    }).compile();

    controller = app.get<SessionsController>(SessionsController);
    controller.onModuleInit();
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create a session', async () => {
      const session = await controller.create({
        code: 'code',
        name: 'jhon'
      });

      expect(session).toBeDefined();
      expect(session.jwt).toBe('jwt');
      expect(session.expiration).toBe(mockTime);
    });
  });
});