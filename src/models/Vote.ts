import { Schema, Model, ObjectId } from "mongoose";

export interface IVote {
  voterId: ObjectId;
  vote: -1 | 0 | 1;
}

export const voteSchema = new Schema<IVote, Model<IVote>, IVote>({
  voterId: { type: Schema.Types.ObjectId, ref: "UserDetails" },
  vote: Number,
});
