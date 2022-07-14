import { authHandler } from "./index.js";

describe('handlers', () => {
  let handler;

  beforeEach(() => {
    handler = authHandler;
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(handler._sessionsService).toBeDefined();
    expect(handler._passCodesService).toBeDefined();
  });
})
