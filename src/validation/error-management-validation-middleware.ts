import { HttpStatus } from "../core/http-statuses";
import { NextFunction, Request, Response } from 'express';
import { FieldValidationError, ValidationError, validationResult } from 'express-validator';



type ValidationErrorType = {
    message: string;
    field: string;
};

type MyCustomMsg = { message: string; field?: string };

const formatErrors = (error: ValidationError): ValidationErrorType => {
    // 1. Safe Type Guard (Best practice from previous answer)
    if (error.type !== 'field') {
        return { message: error.msg, field: 'general' };
    }

    const msg = error.msg as MyCustomMsg;

    // 2. Check if msg is our custom object
    if (typeof msg === 'object' && msg !== null && 'message' in msg) {
        return {
            message: msg.message,
            // Use the field from the object if provided, otherwise fallback to express-validator's path
            field: msg.field || error.path,
        };
    }

    // 3. Fallback for standard string messages
    return {
        message: String(msg),
        field: error.path,
    };
};

export const inputErrorManagementMiddleware = (
    req: Request<{},{},{},{}>,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req).formatWith(formatErrors).array({ onlyFirstError: true });

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

        console.error(`Error ${HttpStatus.BadRequest}: ${errors[0].message}`);
        res.status(HttpStatus.BadRequest).json({ errorsMessages: errors });
        //return;
    }

    next();
};