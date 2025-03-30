import cors from "cors";
import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

//! Routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import recipeRouter from "./routes/recipe.routes.js";

import ErrorHandlers from "./helpers/ErrorHandler.js";
import ErrorHandler from "./middleware/error.middleware.js";
import { securityMiddleware } from "./middleware/security.middleware.js";

const app = express();

//! middleware
securityMiddleware(app);

app.use(morgan("tiny"));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//!Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);

//! Error Handler
app.all("*", (req, res, next) => {
  next(new ErrorHandlers(`req url not found ${req.url}`, 400));
});
app.use(ErrorHandler);

export default app;
