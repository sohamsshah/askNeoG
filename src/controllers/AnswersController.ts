/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { RequestHandler, Response } from "express";
import { AuthRequest } from "../types/RequestWithUser";
import { Answer } from "../models/Answer";
import { Question } from "../models/Question";

/**
 * This handler gets all answers of a particular question
 * send GET Request at /api/answers/:questionId
 * */

export const getAnswersHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { questionId } = req.params;
  try {
    const answers = await Answer.find({ questionId });
    res.json({ answers, msg: "Successfully fetched all Answers" });
  } catch (error) {
    res
      .status(404)
      .json({ error, msg: "Something went wrong. Please try again later" });
  }
};

/**
 * This handler posts answer on a particular answer
 * send POST Request at /api/answers/:questionId
 * body contains {text}
 * */

export const postNewAnswerHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { text } = req.body;
  const { questionId } = req.params;
  try {
    const NewAnswer = new Answer({
      questionId: questionId,
      authorId: req.user._id,
      text: text,
    });

    const savedNewAnswer = await NewAnswer.save();
    await Question.findOneAndUpdate(
      { _id: questionId },
      { $addToSet: { answers: savedNewAnswer } }
    );

    res.status(201).json({
      answer: savedNewAnswer,
      msg: "The new answer has been posted successfully",
    });
  } catch (error) {
    res
      .status(404)
      .json({ msg: "Something went wrong. Please try again later", error });
  }
};

/**
 * This handler deletes an answer
 * send DELETE Request at /api/answers/:questionId/:answerId
 * */

// Improvement needed
export const deleteAnswerHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { questionId, answerId } = req.params;
  try {
    await Question.findOneAndUpdate(
      { _id: questionId },
      { $pull: { answers: { _id: answerId } } }
    );
    const { deletedCount } = await Answer.deleteOne({ _id: answerId });
    if (deletedCount === 0) {
      res.status(404).json({
        msg: "The answer you requested cannot be found",
      });
    }
    res.status(200).json({
      msg: "Successfully deleted the requested Answer",
    });
  } catch (error) {
    res
      .status(404)
      .json({ msg: "Something went wrong. Please try again later", error });
  }
};
