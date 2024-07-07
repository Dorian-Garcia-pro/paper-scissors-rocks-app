import mongoose, { Document, Schema } from 'mongoose';

export interface IPlayer extends Document {
  username: string;
  score: number;
  streak: number;
  bestStreak: number;
  gamePlayed: number;
  wins: number;
}

const PlayerSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
  streak : { type: Number, default:0 },
  bestStreak : { type: Number, default:0 },
  gamePlayed : { type: Number, default:0 },
  wins : { type: Number, default:0 }
});

export default mongoose.model<IPlayer>('Player', PlayerSchema);

