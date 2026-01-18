"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const error_management_validation_middleware_1 = require("./validation-middleware/error-management-validation-middleware");
const UserInputModel_validation_middleware_1 = require("./validation-middleware/UserInputModel-validation-middleware");
const auth_router_description_1 = require("./router-handlers/auth-router-description");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/login', UserInputModel_validation_middleware_1.loginInputModelValidation, error_management_validation_middleware_1.inputErrorManagementMiddleware, auth_router_description_1.attemptToLogin);
