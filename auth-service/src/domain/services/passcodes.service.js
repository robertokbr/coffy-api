import PasscodesRepository from "../../infrastructure/database/repositories/passcodes.repository.js";

export default class PasscodesService {
  /**
   * @param {PasscodesRepository} passCodesRepository
   */
  constructor(passCodesRepository){
    this._passCodesRepository = passCodesRepository;
  }

  /**
   * @summary create a passcode to be used as proof of order validity
   */
  async create() {
    return this._passCodesRepository.create();
  }
}
