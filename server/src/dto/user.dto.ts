import UserInterface from "../interfaces/user.interface";
import {paginationDto} from "./global.dto";

const userDto = (user: UserInterface) => ({
    /** @type {number} */
    id: user.id,
    /** @type {string} */
    email: user.email,
    /** @type {boolean} */
    isBlocked: user.isBlocked,
    /** @type {accessDto} */
    access: user.access,
    /** @type {profileDto} */
    profile: user.profile,
    /** @type {string} */
    token: user.token
});

const usersDto = (users: Array<UserInterface>) => ({
    data: users.map(userDto),
}).data;

const usersPaginationDto = (users: Array<UserInterface>, page: number, limit: number, count: number) => ({
    data: usersDto(users),
    pagination: paginationDto(page, limit, count)
});

export {
    userDto,
    usersDto,
    usersPaginationDto,
}
