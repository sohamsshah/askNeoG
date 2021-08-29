/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { RequestHandler, Response } from "express";
import { UserCredentials } from "../models/UserCredentials";
import { SignInBody, SignUpBody } from "../validation/AuthValidation";
import log from "../utils/logger";
import { createToken } from "../utils/authUtils";
import { AuthRequest } from "../types/RequestWithUser";
/**
 * This handler handles user signups.
 * send POST Request at /api/auth/sign-up
 * body contains {username, firstName, lastName, email, password}
 * */
export const signUpHandler: RequestHandler<{}, {}, SignUpBody> = async (
  req,
  res
) => {
  const { username, firstName, lastName, email, password } = req.body;

  const isAlreadyRegistered = await UserCredentials.findOne({
    email,
  });
  if (isAlreadyRegistered) {
    return res.status(409).json({
      msg: "An account with that email already exists. Please log in instead.",
    });
  }

  try {
    const user = new UserCredentials({
      username,
      firstName,
      lastName,
      email,
      password,
    });

    try {
      await user.save((err) => {
        if (err) {
          return res.status(500).json({
            msg: "Something went wrong while registering you. Please try later or contact support@neogcamp.com",
          });
        }
      });
      const token = await createToken({
        _id: user._id,
        email: user.email,
      });

      res.setHeader("Set-Cookie", [
        `token=${token}; Path=/;HttpOnly;SameSite=None;Secure=true;`,
      ]);
      return res.status(200).json({
        msg: `Successfully signed in`,
        user: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user._id,
          token,
        },
      });
    } catch (error) {
      user.save();

      res.status(500).json({
        msg: "There was an error while sending verification email. Please click the resend button.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong while registering you. Please contact support@neogcamp.com",
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * This handler handles user sign ins.
 * send POST Request at /api/auth/sign-in
 * body contains {email, password}
 * */

export const signInHandler: RequestHandler<{}, {}, SignInBody> = async (
  req,
  res
) => {
  const { email, password } = req.body;
  try {
    const user = await UserCredentials.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.json({
        msg: "Incorrect email or password. Please check credentials.",
        code: "BAD_CREDENTIALS",
      });
    }

    const validPassword = await user.matchPasswords(password);

    if (!validPassword) {
      return res.status(404).json({
        msg: "Incorrect credentials. Please check your email or password.",
        code: "BAD_CREDENTIALS",
      });
    }

    const token = createToken({
      _id: user._id,
      email: user.email,
    });

    log.info("TOKEN", token);

    res.setHeader("Set-Cookie", [
      `token=${token}; Path=/;HttpOnly;SameSite=None;Secure=true;`,
    ]);

    // some sort of cookie or session mgmt
    res.status(200).json({
      msg: "Login Successful!",
      email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user._id,
      token,
      code: "LOGIN_SUCCESS",
    });
  } catch (error: any) {
    console.log(error.message, error);
    return res.status(500).json({
      msg: "Something went wrong while signing you in. Please contact support@neogcamp.com",
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * This handler handles user logout.
 * send POST Request at /api/auth/log-out
 * this request doesn't need body
 * */

export const logoutHandler: RequestHandler = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    msg: "Logged out successfully.",
  });
};

export const userInfoHandler = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({
      msg: "Data for the user was not found on the server.",
    });
  }

  try {
    const foundUser = await UserCredentials.findOne({
      email: user.email,
    });
    res.status(200).json({
      email: foundUser?.email,
      firstName: foundUser?.firstName,
      lastName: foundUser?.lastName,
      userId: foundUser?._id,
    });
  } catch (error) {
    res.status(500).json({
      msg: "There was some error while fetching user information.",
      code: "INTERNAL_ERROR",
    });
  }
};
