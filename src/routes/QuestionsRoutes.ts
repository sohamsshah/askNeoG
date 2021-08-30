import { Router } from "express";
import { requiresAuth } from "../middleware/AuthMiddleware";
import {
  postNewQuestionHandler,
  getQuestionHandler,
  getQuestionsHandler,
  deleteQuestionHandler,
  getUserQuestionsHandler,
} from "../controllers/QuestionsController";

const router = Router();
router.route("/").get(getQuestionsHandler);
router.route("/:questionId").get(getQuestionHandler);
router.route("/user/:userId").get(getUserQuestionsHandler);
router.route("/").post(requiresAuth, postNewQuestionHandler);
router.route("/:questionId").delete(requiresAuth, deleteQuestionHandler);

export = router;
