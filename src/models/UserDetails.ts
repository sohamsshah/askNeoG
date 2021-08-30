import { Schema, model, Model, Document } from "mongoose";

export interface IUserDetails extends Document {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  githubUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  profileImage: string;
}

const userDetailsSchema = new Schema<
  IUserDetails,
  Model<IUserDetails>,
  IUserDetails
>({
  _id: { type: Schema.Types.ObjectId, ref: "UserCredential" },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  githubUrl: {
    type: String,
    trim: true,
  },
  portfolioUrl: {
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

export const UserDetails = model<IUserDetails>(
  "UserDetails",
  userDetailsSchema
);
