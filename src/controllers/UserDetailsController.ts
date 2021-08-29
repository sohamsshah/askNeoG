/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { RequestHandler, Response } from "express";
import { UserDetails } from "../models/UserDetails";
import { AuthRequest } from "../types/RequestWithUser";

/**
 * This handler gets userDetails object
 * send GET Request at /api/user-details/:userId
 * */
export const getUserDetailsHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { userId: userId } = req.params;
  try {
    const foundUser = await UserDetails.findOne({
      _id: userId,
    });
    res.status(200).json({ user: foundUser, msg: "Successfully found user" });
  } catch (error) {
    res.status(500).json({
      msg: "There was some error while fetching user information.",
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * This handler updates userDetails object
 * send POST Request at /api/user-details
 * body: {updatedUserDetails}
 * */
export const updateUserDetailsHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { updatedUserDetails } = req.body;
  try {
    const updatedUserDetailsDocument = await UserDetails.findOneAndUpdate(
      { _id: req.user._id },
      updatedUserDetails,
      { new: true }
    );
    res.status(200).json({
      user: updatedUserDetailsDocument,
      msg: "Successfully updated user details",
    });
  } catch (error) {
    res.status(500).json({
      msg: "There was some error while fetching user information.",
      code: "INTERNAL_ERROR",
    });
  }
};
