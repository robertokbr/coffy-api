export default class AuthHandler {
  constructor(sessionsService, passCodesService) {
    this._sessionsService = sessionsService;
    this._passCodesService = passCodesService;
  }

  async createPasscode(_, callback){
    return this._passCodesService.create()
    .then(data => callback(null, data))
    .catch(error => callback(error, null));
  }

  async createSession({ request }, callback){
    return this._sessionsService.create(request)
    .then(data => callback(null, data))
    .catch(error => callback(error, null));
  }

  async getSessionPayload({ request }, callback) {
    return this._sessionsService.get(request)
    .then(data => callback(null, data))
    .catch(error => callback(error, null));
  }
}
