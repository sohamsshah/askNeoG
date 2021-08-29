import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UserCredentials } from "../models/UserCredentials";
import { AuthRequest } from "../types/RequestWithUser";
import { TokenUser } from "../utils/authUtils";
import log from "../utils/logger";

export async function requiresAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response<unknown, Record<string, unknown>> | undefined> {
  if (!req.header("x-auth-token")) {
    return res.json({ msg: "Not authorized" });
  }

  const token = req.header("x-auth-token");

  try {
    if (!token) {
      throw new Error("not authorized to do that");
    }
    const decodedUser = <TokenUser>(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jwt.verify(token, process.env.JWT_SECRET!)
    );

    if (!decodedUser) {
      return res.json({
        msg: "Token is invalid.",
      });
    }

    const user = await UserCredentials.findById(decodedUser.sub);

    log.info(user);

    if (!user) {
      return res.status(404).json({
        msg: "Token is invalid.",
        success: false,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "You are not authorized to access this resource",
    });
  }
}
