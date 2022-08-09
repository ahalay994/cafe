import {compare, hash} from 'bcryptjs';
import AuthInterface from "../interfaces/auth.interface";
import {signAccessToken} from "../utils/jwt.utils";

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class AuthService {
    async register(data: AuthInterface) {
        if (!data.email || !data.password) {
            return {statusCode: 400, status: false, message: 'Заполните все обязательные поля для регистрации'};
        }

        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (user) {
            return {statusCode: 406, status: false, message: 'Пользователь уже существует'};
        }

        data.password = await hash(data.password, 8);
        const record = prisma.user.create({
            data
        });
        return {statusCode: 200, status: true, message: 'Пользователь успешно зарегистрирован', data: record}
    }

    async login(data: AuthInterface) {
        const {email, password} = data;
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                profile: true,
                access: true
            },
        });
        if (!user) {
            return {statusCode: 401, status: false, message: 'Пользователь не существует'};
        }
        if (await compare(password, user.password)) {
            return {
                statusCode: 200, status: true, message: 'В успешно вошли в систему', data: {
                    ...user,
                    token: await signAccessToken(user),
                }
            }
        } else {
            return {statusCode: 401, status: false, message: 'Пароль не верный'};
        }
    }
}

export default AuthService;
