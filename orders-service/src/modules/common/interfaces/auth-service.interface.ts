import { Observable } from 'rxjs';

export interface AuthServiceInterface {
  createPasscode({}): Observable<{
    code: string;
    createdAt: string;
  }>;
  getSessionPayload(data: { jwt: string }): Observable<{
    id: string;
    name: string;
    code: string;
  }>;
  createSession(data: { code: string; name: string }): Observable<{
    jwt: string;
    expiration: string;
  }>;
}

