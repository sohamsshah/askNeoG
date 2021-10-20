import { Router } from "express";
import { requiresAuth } from "../middleware/AuthMiddleware";
import {
  postNewQuestionHandler,
  getQuestionHandler,
  getQuestionsHandler,
  deleteQuestionHandler,
  getUserQuestionsHandler,
  getTagQuestionsHandler,
} from "../controllers/QuestionsController";

const router = Router();

// public routes
router.route("/").get(getQuestionsHandler);
router.route("/:questionId").get(getQuestionHandler);
router.route("/author/:authorId").get(getUserQuestionsHandler);
router.route("/tags/:tagName").get(getTagQuestionsHandler);

// private routes
router.route("/").post(requiresAuth, postNewQuestionHandler);
router.route("/:questionId").delete(requiresAuth, deleteQuestionHandler);

export = router;
