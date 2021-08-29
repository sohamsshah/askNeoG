import jwt, { JwtPayload } from "jsonwebtoken";

export interface TokenUser extends JwtPayload {
  _id: string;
  email: string;
  // todo - make this robust to support roles such as "user" | "captain" | "admin"
}

export const JWT_SECRET = process.env.JWT_SECRET;

export function createToken(user: TokenUser): string {
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      // TODO: iss and aud
    },
    process.env.JWT_SECRET as string,
    {
      // algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
}
