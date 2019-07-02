import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  type: String,
  created: Date,
});
