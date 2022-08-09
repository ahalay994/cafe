import {Context} from "koa";
import {path, request, summary, tagsAll} from "koa-swagger-decorator";
import UserServices from "../services/user.services";
import {userDto, usersPaginationDto} from "../dto/user.dto";
import ControllerInterface from "../interfaces/controller.interface";

const userServices = new UserServices();

@tagsAll(["User"])
class UserController {

    @request("get", "/user/{id}")
    @summary("Get user by id")
    @path({
        id: {type: 'number', required: true, description: 'id'},
    })
    async findById(ctx: Context): Promise<void> {
        try {
            const record = await userServices.findById(Number(ctx.params.id));
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: userDto(data),
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("get", "/user")
    @summary("Get all users")
    async findAll(ctx: Context): Promise<void> {
        try {
            const record: ControllerInterface = await userServices.findAll(ctx.query);
            const {statusCode, status, message, data} = record;

            const {records, page, limit, count} = data;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                ...usersPaginationDto(records, page, limit, count),
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("post", "/user")
    @summary("Create user")
    async create(ctx: Context): Promise<void> {
        try {
            const record = await userServices.create(ctx.request.body);
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: userDto(data),
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("put", "/user/{id}")
    @summary("Update user")
    @path({
        id: {type: 'number', required: true, description: 'id'},
    })
    async update(ctx: Context): Promise<void> {
        try {
            const record = await userServices.update(Number(ctx.params.id), ctx.request.body);
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: userDto(data),
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("delete", "/user/{id}")
    @summary("Delete user")
    @path({
        id: {type: 'number', required: true, description: 'id'},
    })
    async delete(ctx: Context): Promise<void> {
        try {
            const record = await userServices.delete(Number(ctx.params.id));
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: userDto(data),
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("patch", "/user/{id}")
    @summary("Restore user")
    @path({
        id: {type: 'number', required: true, description: 'id'},
    })
    async restore(ctx: Context): Promise<void> {
        try {
            const record = await userServices.restore(Number(ctx.params.id));
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: userDto(data),
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

export default UserController;
