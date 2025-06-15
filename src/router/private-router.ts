import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { EventController } from "../controller/event-controller";

export const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.post("/api/event", EventController.create);
