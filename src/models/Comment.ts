import { Model, Schema, ObjectId } from "mongoose";

export interface IComment {
  authorId: ObjectId;
  text: string;
}

export const commentSchema = new Schema<IComment, Model<IComment>, IComment>({
  authorId: { type: Schema.Types.ObjectId, ref: "UserDetails" },
  text: {
    type: String,
    required: true,
    trim: true,
  },
});
