import PasscodesService from "../../domain/services/passcodes.service.js";
import SessionsService from "../../domain/services/sessions.service.js";
import PasscodesRepository from "../database/repositories/passcodes.repository.js";
import UsersRepository from "../database/repositories/users.repository.js";
import AuthHandler from './AuthHandler.js';

//Repositories
const passCodesRepository = new PasscodesRepository();
const usersRepository = new UsersRepository()

// Services
const sessionsService = new SessionsService(
  passCodesRepository,
  usersRepository,
);

const passCodesService = new PasscodesService(passCodesRepository);

export const authHandler = new AuthHandler(
  sessionsService,
  passCodesService
);
