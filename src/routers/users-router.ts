import {Router} from "express";
import {inputPaginationValidatorForUsers} from "./validation-middleware/pagination-validators";
import {UsersSortListEnum} from "./util-enums/fields-for-sorting";
import {inputErrorManagementMiddleware} from "./validation-middleware/error-management-validation-middleware";
import {superAdminGuardMiddleware} from "./validation-middleware/base64-auth-guard_middleware";
import {getSeveralUsers} from "./router-handlers/user-router-description";
import {userInputModelValidation} from "./validation-middleware/UserInputModel-validation-middleware";

export const usersRouter = Router();


usersRouter.get('/', superAdminGuardMiddleware, inputPaginationValidatorForUsers(UsersSortListEnum), inputErrorManagementMiddleware, getSeveralUsers)
usersRouter.post('/', superAdminGuardMiddleware, userInputModelValidation, inputErrorManagementMiddleware, createNewUser);
usersRouter.delete('/:id', );
