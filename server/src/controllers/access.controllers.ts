import {Context} from "koa";
import {path, request, summary, tagsAll} from "koa-swagger-decorator";
import {accessDto, accessesPaginationDto} from "../dto/access.dto";
import ControllerInterface from "../interfaces/controller.interface";
import AccessServices from "../services/access.services";

const accessServices = new AccessServices();

@tagsAll(["Access"])
class AccessController {

    @request("get", "/access/{id}")
    @summary("Get access by id")
    @path({
        id: {type: 'number', required: true, description: 'id'},
    })
    async findById(ctx: Context): Promise<void> {
        try {
            const record = await accessServices.findById(Number(ctx.params.id));
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: accessDto(data),
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("get", "/access")
    @summary("Get all accesses")
    async findAll(ctx: Context): Promise<void> {
        try {
            const record: ControllerInterface = await accessServices.findAll(ctx.query);
            const {statusCode, status, message, data} = record;

            const {records, page, limit, count} = data;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                ...accessesPaginationDto(records, page, limit, count),
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("post", "/access")
    @summary("Create access")
    async create(ctx: Context): Promise<void> {
        try {
            const record = await accessServices.create(ctx.request.body);
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: accessDto(data),
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("put", "/access/{id}")
    @summary("Update access")
    @path({
        id: {type: 'number', required: true, description: 'id'},
    })
    async update(ctx: Context): Promise<void> {
        try {
            const record = await accessServices.update(Number(ctx.params.id), ctx.request.body);
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: accessDto(data),
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("delete", "/access/{id}")
    @summary("Delete access")
    @path({
        id: {type: 'number', required: true, description: 'id'},
    })
    async delete(ctx: Context): Promise<void> {
        try {
            const record = await accessServices.delete(Number(ctx.params.id));
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: accessDto(data),
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: false,
                message: error
            };
        }
    }

    @request("patch", "/access/{id}")
    @summary("Restore access")
    @path({
        id: {type: 'number', required: true, description: 'id'},
    })
    async restore(ctx: Context): Promise<void> {
        try {
            const record = await accessServices.restore(Number(ctx.params.id));
            const {statusCode, status, message, data} = record;
            ctx.status = statusCode;
            ctx.body = {
                status,
                message,
                data: accessDto(data),
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

export default AccessController;
