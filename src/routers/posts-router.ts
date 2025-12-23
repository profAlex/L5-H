import {Request, Response, Router} from 'express';
import {
    createNewPost,
    deletePost,
    findSinglePost,
    getSeveralPosts,
    updatePost
} from "./router handlers/post-router-description";

import {postInputModelValidation} from "../validation/PostInputModel-validation-middleware";
import {inputErrorManagementMiddleware} from "../validation/error-management-validation-middleware";
import {superAdminGuardMiddleware} from "../validation/base64-auth-guard_middleware";
import {IdParamName} from "./blogs-router";
import {CollectionNames} from "../repository/collection-names";
import {createIdValidator} from "../validation/id-verification-and-validation";
import {inputPaginationValidator2} from "./blogs-validation-middleware/blog-pagination-validator";
import {PostsSortListEnum} from "./util-enums/fields-for-sorting";

export const postsRouter = Router();

const validateBlogId4 = createIdValidator({
    paramKey: IdParamName.Id,
    collectionName: CollectionNames.Posts,
});

postsRouter.get('/', inputPaginationValidator2(PostsSortListEnum), inputErrorManagementMiddleware, getSeveralPosts);
postsRouter.post('/', superAdminGuardMiddleware, postInputModelValidation, inputErrorManagementMiddleware, createNewPost); //auth guarded
postsRouter.get('/:id', validateBlogId4, inputErrorManagementMiddleware, findSinglePost);
postsRouter.put('/:id', superAdminGuardMiddleware, validateBlogId4, /*inputErrorManagementMiddleware,*/ postInputModelValidation, inputErrorManagementMiddleware, updatePost); //auth guarded
postsRouter.delete('/:id', superAdminGuardMiddleware, validateBlogId4, inputErrorManagementMiddleware, deletePost) //auth guarded