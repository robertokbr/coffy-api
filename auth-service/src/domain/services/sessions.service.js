import jsonwebtoken from 'jsonwebtoken';
import jwtConfigs from '../../configs/jwt.js';
import { isAfter, addHours } from 'date-fns';
import CreateSessionDTO from '../dtos/create-session.dto.js';
import User from '../models/User.js';
import PasscodesRepository from '../../infrastructure/database/repositories/passcodes.repository.js';
import UsersRepository from '../../infrastructure/database/repositories/users.repository.js';

export default class SessionsService {
  /**
   * @param {PasscodesRepository} passCodesRepository
   * @param {UsersRepository} usersRepository
   */
  constructor(passCodesRepository, usersRepository) {
    this._passCodesRepository = passCodesRepository;
    this._usersRepository = usersRepository;
  }

  /**
   * @param {string} code
   */
  async _validCode(code) {
    const passCode = await this._passCodesRepository.findByCode(
      code,
    );

    if (!passCode) return new Error('Invalid code!');

    const expiration = addHours(passCode.createdAt, jwtConfigs.expirationHours);

    if (isAfter(Date.now(), expiration)) return new Error('Code out of date!');

    return passCode;
  }

  /**
   * @param {CreateSessionDTO} param0
   */
  async create({ code, name }) {
    const validation = await this._validCode(code);

    if (validation instanceof Error) throw validation;

    const user = new User(name);

    await this._usersRepository.create(user)

    const jwt = jsonwebtoken.sign(
      {...user},
      jwtConfigs.secret,
      { expiresIn: jwtConfigs.expiration }
    );

    const expiration = addHours(new Date(), jwtConfigs.expirationHours);

    return { jwt, expiration };
  }

  /**
   * @param {{ jwt: string }} param0
   */
  async get({ jwt }) {
    try {
      const payload = jsonwebtoken.verify(
        jwt,
        jwtConfigs.secret
      );

      return payload;
    } catch (_error) {
      throw new Error('Invalid JWT! ' + _error?.message);
    }
  }
}
