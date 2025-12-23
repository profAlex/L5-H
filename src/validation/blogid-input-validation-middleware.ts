import { param } from "express-validator";


export const inputBlogIdValidation = param('blogId')
    .exists().withMessage('Blog ID must be specified')
    .isString().withMessage('Blog ID must be of type string')
    .trim()
    .isLength({ min: 1 }).withMessage('Blog ID must not be empty')
//.isMongoId().withMessage('ID must be of valid mongo-type')
