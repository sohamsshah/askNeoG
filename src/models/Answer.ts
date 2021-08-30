import { Model, Schema, ObjectId } from "mongoose";
import { IComment, commentSchema } from "./Comment";
import { IVote, voteSchema } from "./Vote";

export interface IAnswer {
  authorId: ObjectId;
  text: string;
  comments: [IComment];
  votes: [IVote];
}

export const answerSchema = new Schema<IAnswer, Model<IAnswer>, IAnswer>({
  authorId: { type: Schema.Types.ObjectId, ref: "UserDetails" },
  votes: [voteSchema],
  text: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [commentSchema],
});
