import Router from "@koa/router";
import AuthController from "../controllers/auth.controllers";
const authController = new AuthController();
const authRouter = new Router();
import {authMiddleware} from "../middlewares/auth.middleware";

authRouter.post("/auth/register", authController.register);
authRouter.post("/auth/login", authMiddleware, authController.login);

export { authRouter };
