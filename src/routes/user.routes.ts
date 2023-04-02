import { Router } from "express";
import UserController from "../controllers/user.controller";
import { fieldsUserMiddleware } from "../middlewares/fieldsUser.middleware";
import { idNotFoundMiddleware } from "../middlewares/idNotFound.middleware";
import { notAdmMiddleware } from "../middlewares/notAdm.middleware";
import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

const userRouter = Router()

userRouter.post("", fieldsUserMiddleware, UserController.post)

userRouter.patch("/:idUser", authTokenMiddleware, idNotFoundMiddleware, notAdmMiddleware, fieldsUserMiddleware, UserController.patch)

userRouter.get("/:idUser", authTokenMiddleware, idNotFoundMiddleware, notAdmMiddleware, UserController.userId)

userRouter.get("/:idUser/clients", authTokenMiddleware, idNotFoundMiddleware, notAdmMiddleware, UserController.clientsByUser)

userRouter.get("", authTokenMiddleware, isAdmMiddleware, UserController.userAll)

userRouter.delete("/:idUser", authTokenMiddleware, idNotFoundMiddleware, notAdmMiddleware, UserController.delete)

export default userRouter