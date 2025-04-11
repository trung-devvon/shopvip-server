import { Router } from "express";
import * as accessController from "../controllers/access.controller";

const router = Router();

router.post("/signin", accessController.signup)
router.get("/test/:id", accessController.test);

export default router;
