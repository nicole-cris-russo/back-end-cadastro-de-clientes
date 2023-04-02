import { Router } from "express";
import SessionController from "../controllers/session.controller";

const sessionRouter = Router()

sessionRouter.post("", SessionController.post)

export default sessionRouter