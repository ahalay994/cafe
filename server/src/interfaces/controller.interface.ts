import UserInterface from "./user.interface";

export default interface ControllerInterface {
    statusCode: number,
    status: boolean,
    message: string,
    data?: any,
}
