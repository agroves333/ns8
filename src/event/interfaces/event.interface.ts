import { Document } from 'mongoose';

export interface Event extends Document {
  readonly type: string;
}
