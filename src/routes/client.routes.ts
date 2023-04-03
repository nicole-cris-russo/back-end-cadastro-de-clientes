import { Router } from "express";
import ClientController from "../controllers/client.controller";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { idNotFoundMiddleware } from "../middlewares/idNotFound.middleware";
import { fieldsContactClientMiddleware } from "../middlewares/fieldsContactClient.middleware";
import { notAdmMiddleware } from "../middlewares/notAdm.middleware";

const clientRouter = Router()

clientRouter.post("", fieldsContactClientMiddleware, notAdmMiddleware, ClientController.post)

clientRouter.patch("/:idClient", fieldsContactClientMiddleware, idNotFoundMiddleware, notAdmMiddleware, ClientController.patch)

clientRouter.get("", isAdmMiddleware, ClientController.clientAll)

clientRouter.get("/:idClient", idNotFoundMiddleware, notAdmMiddleware, ClientController.clientId)

clientRouter.get("/:idClient/contacts", idNotFoundMiddleware, notAdmMiddleware, ClientController.contactsByClient)

clientRouter.delete("/:idClient", idNotFoundMiddleware, notAdmMiddleware, ClientController.delete)

export default clientRouter