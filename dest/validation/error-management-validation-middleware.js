"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputErrorManagementMiddleware = void 0;
// import {ErrorFormatter, FieldValidationError, ValidationError, validationResult} from "express-validator";
const http_statuses_1 = require("../core/http-statuses");
// import { Request } from 'express';
const express_validator_1 = require("express-validator");
const formatErrors = (error) => {
    const expressError = error;
    return {
        message: String(expressError.msg),
        field: expressError.path,
    };
};
const inputErrorManagementMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(formatErrors).array({ onlyFirstError: true });
    if (errors.length > 0) {
        // console.log("WE GOT HERE FOR SOME REASON??");
        // console.log(errors); //для отладки, иначе непонятно где смотреть ошибки в случае их возникновения
        // if(errors[0].message.toLowerCase().includes('not found')) {
        //     // console.log(errors[0].message);
        //
        //     res.status(HttpStatus.NotFound).json({ errorsMessages: errors });
        //     //return;
        // }
        // else if (errors[0].message.toLowerCase().includes('invalid')) {
        //     // console.log(errors[0].message);
        //
        //     res.status(HttpStatus.BadRequest).json({ errorsMessages: errors });
        //     //return;
        // }
        // console.log(errors[0].message);
        console.error(`Error ${http_statuses_1.HttpStatus.BadRequest}: ${errors[0]}`);
        res.status(http_statuses_1.HttpStatus.BadRequest).json({ errorsMessages: errors });
        //return;
    }
    next();
};
exports.inputErrorManagementMiddleware = inputErrorManagementMiddleware;
