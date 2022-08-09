import {SwaggerRouter} from "koa-swagger-decorator";
import AccessController from "../controllers/access.controllers";

const accessController = new AccessController();
const accessRouter = new SwaggerRouter();

accessRouter
    .get("/access/:id", accessController.findById)
    .get("/access", accessController.findAll)
    .post("/access", accessController.create)
    .put("/access/:id", accessController.update)
    .delete("/access/:id", accessController.delete)
    .patch("/access/:id", accessController.restore);

export {accessRouter};

