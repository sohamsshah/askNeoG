import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserCredentials {
  username: string;
  email: string;
  password: string;
  matchPasswords: (password: string) => Promise<boolean>;
}

const userCredentialsSchema = new Schema<
  IUserCredentials,
  Model<IUserCredentials>,
  IUserCredentials
>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 50,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userCredentialsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userCredentialsSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const UserCredentials = model<IUserCredentials>(
  "UserCredentials",
  userCredentialsSchema
);
