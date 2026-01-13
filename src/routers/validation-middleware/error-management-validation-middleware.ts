import { HttpStatus } from "../util-enums/http-statuses";
import { NextFunction, Request, Response } from 'express';
import { FieldValidationError, ValidationError, validationResult } from 'express-validator';


export class CustomValidationError extends Error {
    constructor(
        public metaData: {
            errorMessage: { field: string; message: string }
        }
    ) {
        super(''); // вызываем конструктор класса родителя (с опциональным сообщением)
        this.name = 'CustomValidationError'; // имя ошибки - по нему в блоке catch можешь отфильтровывать тип ошибки для какой-то кастомной логики обработки ошибки
    }
}

type ValidationErrorType = {
    message: string;
    field: string;
};

const formatErrors = (error: ValidationError): ValidationErrorType => {
    // Проверяем, является ли ошибка FieldValidationError (path содержится только в FieldValidationError)
    if ('path' in error) {
        const fieldError = error as FieldValidationError;

        if (
            typeof fieldError.msg === 'object' &&
            fieldError.msg !== null &&
            'message' in fieldError.msg &&
            fieldError.msg.message != null
        ) {
            const customMsg = fieldError.msg as { message: string; field?: string };
            return {
                message: String(customMsg.message),
                field: customMsg.field || fieldError.path || 'unknown'
            };
        }

        return {
            message: String(fieldError.msg),
            field: fieldError.path || 'unknown'
        };
    }

    // Для других типов ошибок (AlternativeValidationError и т. п.)
    return {
        message: String(error.msg),
        field: 'unknown' // или другое значение по умолчанию
    };
};


export const inputErrorManagementMiddleware = (
    req: Request<{},{},{},{}>,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req).formatWith(formatErrors).array({ onlyFirstError: true });

    if (errors.length > 0) {
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
    }

    next();
};