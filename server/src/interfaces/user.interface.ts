import AccessInterface from "./access.interface";
import ProfileInterface from "./profile.interface";

export default interface UserInterface {
    id: number
    email: string
    password: string,
    isBlocked: boolean,
    access: AccessInterface | null,
    profile: ProfileInterface | null,
    token: string | undefined,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}
