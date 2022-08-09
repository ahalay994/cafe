import profileInterface from "../interfaces/profile.interface";

const profileDto = (profile: profileInterface) => ({
    /** @type {string} */
    firstName: profile?.firstName || null,
    /** @type {string} */
    lastName: profile?.lastName || null,
    /** @type {string} */
    patronymicName: profile?.patronymicName || null,
    /** @type {string} */
    dateOfBirth: profile?.dateOfBirth || null,
})

export default {
    profileDto,
}
