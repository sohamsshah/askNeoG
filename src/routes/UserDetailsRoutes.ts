import { Router } from "express";
import { requiresAuth } from "../middleware/AuthMiddleware";
import {
  getUserDetailsHandler,
  updateUserDetailsHandler,
} from "../controllers/UserDetailsController";

const router = Router();
router.route("/").post(requiresAuth, updateUserDetailsHandler);
router.route("/:userId").get(requiresAuth, getUserDetailsHandler);

export = router;
