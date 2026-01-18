import {ObjectId} from "mongodb";

export type UserCollectionStorageModel = {
    id: string
    login: string;
    email: string;
    passwordHash: string
    createdAt: string; //Date
}