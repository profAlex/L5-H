import {Router} from "express";
import {inputPaginationValidatorForUsers} from "./validation-middleware/pagination-validators";
import {UsersSortListEnum} from "./util-enums/fields-for-sorting";
import {inputErrorManagementMiddleware} from "./validation-middleware/error-management-validation-middleware";
import {superAdminGuardMiddleware} from "./validation-middleware/base64-auth-guard_middleware";
import {getSeveralUsers} from "./router-handlers/user-router-description";

export const usersRouter = Router();


usersRouter.get('/', superAdminGuardMiddleware, inputPaginationValidatorForUsers(UsersSortListEnum), inputErrorManagementMiddleware, getSeveralUsers)
usersRouter.post('/', );
usersRouter.delete('/:id', );
