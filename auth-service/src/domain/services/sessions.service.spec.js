import Passcode from "../models/Passcode";
import User from "../models/User";
import SessionsService from "./sessions.service";
import { jest, expect } from '@jest/globals';
import { subHours } from "date-fns";

describe('SessionsService', () => {
  let service;

  const mockPasscodesRepository = {
    findByCode: async (_code) => Promise.resolve(
      new Passcode(),
    ),
  };

  const mockUsersRepository = {
    create: async (name) => Promise.resolve(
      new User(name),
    ),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new SessionsService(
      mockPasscodesRepository,
      mockUsersRepository
    );
  });

  describe('create', () => {
    it('should be able to create a session', async () => {
      const repoCreateUserSpy = jest.spyOn(
        mockUsersRepository,
        'create'
      );

      const session = await service.create({
        code: 'code',
        name: 'jhon'
      });

      expect(repoCreateUserSpy).toHaveBeenCalled();
      expect(session).toBeDefined();
      expect(session.expiration).toBeDefined();
      expect(session.jwt).toBeDefined();
    });

    it('should not be able to create a session if the code is out of date', async () => {
      const repoCreateUserSpy = jest.spyOn(
        mockUsersRepository,
        'create'
      );

      jest.spyOn(
        mockPasscodesRepository,
        'findByCode'
      ).mockImplementationOnce(() => {
        const passcode = new Passcode();
        passcode.createdAt = subHours(new Date(), 10);
        return passcode;
      });

      await expect(
        service.create({
          code: 'code',
          name: 'jhon'
        })
      ).rejects.toThrow('Code out of date!');

      expect(repoCreateUserSpy).not.toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should be able to return a session by its jwt', async () => {
      const { jwt } = await service.create({  code: 'code', name: 'jhon' });

      const session = await service.get({ jwt });

      expect(session).toEqual(
        expect.objectContaining({
          name: 'jhon',
        }),
      )
    });
  });
});
