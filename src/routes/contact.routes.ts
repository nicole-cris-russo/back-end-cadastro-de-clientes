import { Router } from "express";
import { idNotFoundMiddleware } from "../middlewares/idNotFound.middleware";
import { notAdmMiddleware } from "../middlewares/notAdm.middleware";
import ContactController from "../controllers/contact.controller";
import { fieldsContactClientMiddleware } from "../middlewares/fieldsContactClient.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

const contactRouter = Router()

contactRouter.post("/:idClient", idNotFoundMiddleware, notAdmMiddleware, fieldsContactClientMiddleware, ContactController.post)

contactRouter.patch("/:idContact", idNotFoundMiddleware, notAdmMiddleware, fieldsContactClientMiddleware, ContactController.patch)

contactRouter.get("/:idContact", idNotFoundMiddleware, notAdmMiddleware, ContactController.contactId)

contactRouter.get("", isAdmMiddleware, ContactController.contactAll)

contactRouter.get("/:idContact", idNotFoundMiddleware, notAdmMiddleware, ContactController.clientByContact)

contactRouter.delete("/:idContact", idNotFoundMiddleware, notAdmMiddleware, ContactController
.delete)

export default contactRouter