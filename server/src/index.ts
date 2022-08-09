import {accessRouter} from "./routes/access";

require('@prisma/client');
import "reflect-metadata";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import winston from "winston";
import {logger} from "./logger";
import {errorHandle} from "./middlewares/errorHandle";
import {authRouter} from "./routes/auth";
import {userRouter} from "./routes/user";

const port = process.env.PORT || 3000;
const app = new Koa();

app.use(logger(winston));
app.use(bodyParser());
app.use(errorHandle);

/*** auth ***/
app.use(authRouter.routes()).use(authRouter.allowedMethods());
/*** user ***/
app.use(userRouter.routes()).use(userRouter.allowedMethods());
/*** access ***/
app.use(accessRouter.routes()).use(accessRouter.allowedMethods());

app.listen(port, () => {
    return console.log(`server is listening on http://localhost:${port}`);
});
