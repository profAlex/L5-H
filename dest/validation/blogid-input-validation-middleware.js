"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputBlogIdValidation = void 0;
const express_validator_1 = require("express-validator");
exports.inputBlogIdValidation = (0, express_validator_1.param)('blogId')
    .exists().withMessage('Blog ID must be specified')
    .isString().withMessage('Blog ID must be of type string')
    .trim()
    .isLength({ min: 1 }).withMessage('Blog ID must not be empty');
//.isMongoId().withMessage('ID must be of valid mongo-type')
