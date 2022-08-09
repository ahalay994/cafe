import {Context} from "koa";
import {request, responsesAll, summary, tagsAll} from "koa-swagger-decorator";
import AuthServices from "../services/auth.services";
import {userDto} from "../dto/user.dto";

const authServices = new AuthServices();

@responsesAll({200: {description: "success"}, 400: {description: "bad request"}})
@tagsAll(["Auth"])
class AuthController {

    @request("post", "/auth/register")
    @summary("Регистрация пользователя")
    async register(ctx: Context): Promise<void> {
        const {body} = ctx.request;
        try {
            const record = await authServices.register(body);
            const {statusCode, status, message} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("post", "/auth/login")
    @summary("Авторизация пользователя")
    async login(ctx: Context): Promise<void> {
        try {
            const record = await authServices.login(ctx.request.body);
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: userDto(data)
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }
}

export default AuthController;
