import { Router } from "express";
import { validate } from "../middleware/ValidateMiddleware";
import { signInSchema, signUpSchema } from "../validation/AuthValidation";
import {
  signInHandler,
  signUpHandler,
  logoutHandler,
} from "../controllers/AuthController";

const router = Router();

router.route("/sign-up").post(validate(signUpSchema), signUpHandler);
router.route("/sign-in").post(validate(signInSchema), signInHandler);
router.route("/logout").post(logoutHandler);

export = router;
