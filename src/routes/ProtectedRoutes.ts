import { Router } from "express";
import { requiresAuth } from "../middleware/AuthMiddleware";
import { AuthRequest } from "./../types/RequestWithUser.d";

const router = Router();
router.route("/").post(requiresAuth, (req: AuthRequest, res) => {
  res.json({ msg: "protected route successfully accessed", user: req.user });
});

export = router;
