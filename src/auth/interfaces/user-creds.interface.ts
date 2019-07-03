import { Document } from 'mongoose';

export interface UserCreds extends Document {
  readonly email: string;
  readonly password: string;
}
