import { Schema, model, Model, ObjectId } from "mongoose";
import { IComment, commentSchema } from "./Comment";
import { IVote, voteSchema } from "./Vote";

export interface IAnswer {
  questionId: ObjectId | string;
  authorId: ObjectId;
  text: string;
  comments: [IComment];
  votes: [IVote];
}

export const answerSchema = new Schema<IAnswer, Model<IAnswer>, IAnswer>({
  questionId: { type: Schema.Types.ObjectId, ref: "Question" },
  authorId: { type: Schema.Types.ObjectId, ref: "UserDetails" },
  votes: [voteSchema],
  text: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [commentSchema],
});

export const Answer = model<IAnswer>("Answer", answerSchema);
