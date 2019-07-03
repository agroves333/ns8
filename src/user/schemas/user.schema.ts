import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  email: String,
  password: String,
  phone: String,
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});
