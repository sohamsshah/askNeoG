/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { RequestHandler, Response } from "express";
import { AuthRequest } from "../types/RequestWithUser";
import { Question } from "../models/Question";

/**
 * This handler gets all questions in DB
 * send GET Request at /api/questions/
 * */

export const getQuestionsHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const questions = await Question.find({});
    res
      .status(200)
      .json({ questions, msg: "Successfully fetched all Questions" });
  } catch (error) {
    res
      .status(404)
      .json({ error, msg: "Something went wrong. Please try again later" });
  }
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
 * send GET Request at /api/questions/author/:authorId
 * */

export const getUserQuestionsHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { authorId } = req.params;

  try {
    const foundQuestions = await Question.find({
      authorId: authorId,
    });
    res
      .status(201)
      .json({ questions: foundQuestions, msg: "Successfully found questions" });
  } catch (error) {
    res
      .status(404)
      .json({ error, msg: "Something went wrong. Please try again later" });
  }
};

/**
 * This handler gets questions object from tagName
 * send GET Request at /api/questions/tags/:tagName
 * */

export const getTagQuestionsHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { tagName } = req.params;

  try {
    const foundQuestions = await Question.find({
      tags: tagName,
    });
    res
      .status(201)
      .json({ questions: foundQuestions, msg: "Successfully found questions" });
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
  console.log(req.user._id);
  try {
    const NewQuestion = new Question({
      authorId: req.user._id,
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

/**
 * This handler deletes a question
 * send DELETE Request at /api/questions/:questionId
 * */

export const deleteQuestionHandler: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { questionId } = req.params;
  try {
    const { deletedCount } = await Question.deleteOne({ _id: questionId });
    if (deletedCount === 0) {
      res.status(404).json({
        msg: "The question you requested cannot be found",
      });
    }
    res.status(200).json({
      msg: "Successfully deleted the requested Question",
    });
  } catch (error) {
    res
      .status(404)
      .json({ msg: "Something went wrong. Please try again later", error });
  }
};
