import { Schema, model, Model, ObjectId } from "mongoose";
import { answerSchema, IAnswer } from "./Answer";
import { IComment, commentSchema } from "./Comment";
import { IVote, voteSchema } from "./Vote";

export interface IQuestion {
  authorId: ObjectId;
  title: string;
  text: string;
  tags: Array<string>;
  viewers: [ObjectId];
  votes: [IVote];
  comments: [IComment];
  answers: [IAnswer];
}

const questionSchema = new Schema<IQuestion, Model<IQuestion>, IQuestion>({
  authorId: { type: Schema.Types.ObjectId, ref: "UserDetails" },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  votes: [voteSchema],
  viewers: [{ viewerId: { type: Schema.Types.ObjectId, ref: "UserDetails" } }],
  tags: [String],
  comments: [commentSchema],
  answers: [answerSchema],
});

export const Question = model<IQuestion>("Question", questionSchema);
