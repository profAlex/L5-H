import {UserViewModel} from "../../routers/router-types/user-view-model";
import {WithId} from "mongodb";

export const mapSingleUserCollectionToViewModel = (userInContainer: WithId<UserViewModel>) => {
    return {
        id: userInContainer._id.toString(),
        login: userInContainer.login,
        email: userInContainer.email,
        createdAt: userInContainer.createdAt,

    } as UserViewModel;
};