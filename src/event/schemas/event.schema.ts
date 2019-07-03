import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const EventSchema = new Schema({
  type: String,
  created: {
    type: Date,
    default: Date.now,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});
