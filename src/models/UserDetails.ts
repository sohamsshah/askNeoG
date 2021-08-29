import { Schema, model, Model, Document } from "mongoose";

export interface IUserDetails extends Document {
  bio: string;
  githubUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  profileImage: string;
}

const userDetailsSchema = new Schema<
  IUserDetails,
  Model<IUserDetails>,
  IUserDetails
>({
  _id: { type: Schema.Types.ObjectId, ref: "UserCredential" },
  bio: {
    type: String,
    trim: true,
  },
  githubUrl: {
    type: String,
    trim: true,
  },
  twitterUrl: {
    type: String,
    trim: true,
  },
  linkedinUrl: {
    type: String,
    trim: true,
  },
  profileImage: {
    type: String,
    trim: true,
  },
});

export const UserCredentials = model<IUserDetails>(
  "UserDetails",
  userDetailsSchema
);
