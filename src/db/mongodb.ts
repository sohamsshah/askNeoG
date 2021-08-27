/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Why is this rule disabled ? we are sure env vars are non null..
 * */
import mongoose from "mongoose";
import log from "../utils/logger";

/**
 * This function creates connection to the database with given options.
 * */

// mongodb connection
export const makeConnection = async () => {
  await mongoose
    .connect(
      process.env.NODE_ENV === "development"
        ? process.env.DB_LOCAL!
        : process.env.DB_ATLAS!
    )
    .then(() => {
      log.info(`[${process.env.NODE_ENV}]` + "📀 Connected to Database");
    })
    .catch((error: Error) => {
      log.error(
        `There was an error while connecting to database. 
             You likely forgot to include mongoDB connection URL or it is invalid.`,
        error
      );
    });
};
