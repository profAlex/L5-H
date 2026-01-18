import {Router} from "express";
import {inputErrorManagementMiddleware} from "./validation-middleware/error-management-validation-middleware";
import {loginInputModelValidation} from "./validation-middleware/UserInputModel-validation-middleware";
import {attemptToLogin} from "./router-handlers/auth-router-description";


export const authRouter = Router();

authRouter.post('/login', loginInputModelValidation, inputErrorManagementMiddleware, attemptToLogin);
