/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { RequestHandler, Response } from "express";
import { AuthRequest } from "../types/RequestWithUser";
import { Question } from "../models/Question";

/**
 * This handler gets questions object
 * send GET Request at /api/questions/
 * */

export const getQuestionsHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  res.json({ msg: "inside getQuestionsHandler" });
};

/**
 * This handler gets questions object from questionId
 * send GET Request at /api/questions/:questionId
 * */

export const getQuestionHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { questionId } = req.params;
  try {
    const foundQuestion = await Question.findOne({
      _id: questionId,
    });
    res
      .status(201)
      .json({ question: foundQuestion, msg: "Successfully found user" });
  } catch (error) {
    res
      .status(404)
      .json({ error, msg: "Something went wrong. Please try again later" });
  }
};

/**
 * This handler gets questions object from questionId
 * send GET Request at /api/questions/user/:userId
 * */

export const getUserQuestionsHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.params;

    // TODO getUserQuestionsHandler
    res.status(201).json({ msg: "Successfully found user" });
  } catch (error) {
    res
      .status(404)
      .json({ error, msg: "Something went wrong. Please try again later" });
  }
};

/**
 * This handler posts a new question
 * send POST Request at /api/questions/
 * body contains {title, text, tags}
 * */

export const postNewQuestionHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { title, text, tags } = req.body;
  try {
    const NewQuestion = new Question({
      _id: req.user._id,
      title: title,
      text: text,
      tags: tags,
    });

    const savedNewQuestion = await NewQuestion.save();

    res.status(201).json({
      question: savedNewQuestion,
      msg: "The new question has been posted successfully",
    });
  } catch (error) {
    res
      .status(404)
      .json({ msg: "Something went wrong. Please try again later", error });
  }
};

export const deleteQuestionHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  res.json({ msg: "inside deleteQuestionsHandler" });
};
