import Passcode from "../models/Passcode";
import PasscodesService from "./passcodes.service";

describe('PassCodesService', () => {
  let service;

  const mockPasscodesRepository = {
    create: async () => Promise.resolve(
      new Passcode(),
    ),
  }

  beforeEach(() => {
    service = new PasscodesService(mockPasscodesRepository);
  });

  describe('create', () => {
    it('should be able to create a passcode', async () => {
      const passcode = await service.create();

      expect(passcode).toBeDefined();
      expect(passcode.code).toBeDefined();
      expect(passcode).toBeInstanceOf(Passcode);
    });
  });
});
