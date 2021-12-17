import { User as prismaUser } from '@prisma/client';

export class User implements prismaUser {
  id: number;
  email: string;
  name: string;
}
