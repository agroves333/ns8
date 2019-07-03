import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const EventSchema = new Schema({
  type: {type: String, required: true},
  created: {
    type: Date,
    default: Date.now,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});
