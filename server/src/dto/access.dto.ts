import AccessInterface from "../interfaces/access.interface";
import {paginationDto} from "./global.dto";

const accessDto = (access: AccessInterface) => ({
    /** @type {number} */
    id: access.id,
    /** @type {string} */
    slug: access.slug,
    /** @type {string} */
    name: access.name,
})

const accessesDto = (users: Array<AccessInterface>) => ({
    data: users.map(accessDto),
}).data;

const accessesPaginationDto = (users: Array<AccessInterface>, page: number, limit: number, count: number) => ({
    data: accessesDto(users),
    pagination: paginationDto(page, limit, count)
});

export {
    accessDto,
    accessesDto,
    accessesPaginationDto,
}
