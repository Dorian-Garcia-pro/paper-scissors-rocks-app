import mongoose, { Document, Schema } from "mongoose";

export interface IRound extends Document {
  timestamp: Date;
  playerMove: string;
  computerMove: string;
  result: string;
}

const RoundSchema: Schema = new Schema({
  timestamp: { type: Date, required: true, default: Date.now, unique: true },
  playerMove: { type: String, required: true },
  computerMove: { type: String, required: true },
  result: { type: Number, required: true },
});

export default mongoose.model<IRound>("Round", RoundSchema);
