import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  email: {type: String, index: {unique: true}},
  password: String,
  phone: String,
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

UserSchema.pre('save', (next) => {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = (plaintext, callback) => {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};
