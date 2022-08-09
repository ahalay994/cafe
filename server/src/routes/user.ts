import {SwaggerRouter} from "koa-swagger-decorator";
import UserController from "../controllers/user.controllers";

const userController = new UserController();
const userRouter = new SwaggerRouter();

userRouter
    .get("/user/:id", userController.findById)
    .get("/user", userController.findAll)
    .post("/user", userController.create)
    .put("/user/:id", userController.update)
    .delete("/user/:id", userController.delete)
    .patch("/user/:id", userController.restore);

/*userRouter.swagger({
    title: "node-typescript-koa-rest",
    description: "API REST using NodeJS and KOA framework, typescript. TypeORM for SQL with class-validators. Middlewares JWT, CORS, Winston Logger.",
    version: "1.8.0"
});

userRouter.mapDir(__dirname);*/

export {userRouter};

