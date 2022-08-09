import {verifyAccessToken} from '../utils/jwt.utils';
import {Context, Next} from "koa";

export const authMiddleware = async (ctx: Context, next: Next) => {
    let jwt = ctx.headers.authorization;
    if (!jwt) {
        ctx.status = 401;
        ctx.body = {
            status: false,
            message: 'Некорректный токен доступа',
        }
        return;
    }

    if (jwt.toLowerCase().startsWith('bearer')) {
        jwt = jwt.slice('bearer'.length).trim();
    }

    await verifyAccessToken(jwt).then(async (user) => {
        ctx.user = user;
        await next();
    });
}
