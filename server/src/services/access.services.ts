import AccessInterface from "../interfaces/access.interface";
import QueryInterface from "../interfaces/query.interface";

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class UserService {
    async findById(id: number) {
        try {
            const record = await prisma.user.findUnique({
                where: {id}
            });

            if (!record) {
                return {statusCode: 401, status: false, message: 'Пользователь не существует'};
            }

            return {statusCode: 200, status: true, message: 'Пользователь успешно получен', data: record}
        } catch (e) {
            return {statusCode: 500, status: false, message: 'Критическая ошибка', data: e}
        }
    }

    async findAll(query: QueryInterface) {
        try {
            const {page = 1, limit = 10} = query;
            const records = await prisma.user.findMany();
            const count = await prisma.user.count();
            return {
                statusCode: 200, status: true, message: 'Пользователь успешно получен', data: {
                    records,
                    page,
                    limit,
                    count
                }
            }
        } catch (e) {
            return {statusCode: 500, status: false, message: 'Критическая ошибка', data: e}
        }
    }

    async create(data: AccessInterface) {
        const record = prisma.user.create({
            data
        });
        return {statusCode: 200, status: true, message: 'Пользователь успешно создан', data: record}
    }

    async update(id: number, data: AccessInterface) {
        const record = prisma.user.update({
            where: {id},
            data
        });
        return {statusCode: 200, status: true, message: `Пользователь #${record.id} успешно обновлён`, data: record}
    }

    async delete(id: number) {
        const record = prisma.user.update({
            where: {id},
            data: {
                deletedAt: new Date()
            }
        });
        return {statusCode: 200, status: true, message: `Пользователь #${record.id} удалён`, data: record}
    }

    async restore(id: number) {
        const record = prisma.user.update({
            where: {id},
            data: {
                deletedAt: null
            }
        });
        return {statusCode: 200, status: true, message: `Пользователь #${record.id} удалён`, data: record}
    }
}

export default UserService;
