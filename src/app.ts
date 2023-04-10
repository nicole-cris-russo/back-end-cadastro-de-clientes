import express from "express"
import "express-async-errors"
import "reflect-metadata"
import { handleErrorMiddleware } from "./middlewares/handleError.middleware"
import userRouter from "./routes/user.routes"
import clientRouter from "./routes/client.routes"
import { authTokenMiddleware } from "./middlewares/authToken.middleware"
import contactRouter from "./routes/contact.routes"
import sessionRouter from "./routes/session.routes"
import cors from "cors"

const app = express()
app.use(cors({origin: "http://localhost:5173"}))
app.use(express.json())

app.use("/user", userRouter)
app.use("/session", sessionRouter)
app.use("/client", authTokenMiddleware, clientRouter)
app.use("/contact", authTokenMiddleware, contactRouter)

app.use(handleErrorMiddleware)
export default app