import { Router } from "express";
import { requiresAuth } from "../middleware/AuthMiddleware";
import {
  postNewAnswerHandler,
  getAnswersHandler,
  deleteAnswerHandler,
} from "../controllers/AnswersController";

const router = Router();

// public routes
router.route("/:questionId").get(getAnswersHandler);

// private routes
router.route("/:questionId").post(requiresAuth, postNewAnswerHandler);
router
  .route("/:questionId/:answerId")
  .delete(requiresAuth, deleteAnswerHandler);

export = router;
