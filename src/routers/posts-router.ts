import {Request, Response, Router} from 'express';
import {
    createNewPost,
    deletePost,
    findSinglePost,
    getSeveralPosts,
    updatePost
} from "./router-handlers/post-router-description";

import {postInputModelValidation} from "./validation-middleware/PostInputModel-validation-middleware";
import {inputErrorManagementMiddleware} from "./validation-middleware/error-management-validation-middleware";
import {superAdminGuardMiddleware} from "./validation-middleware/base64-auth-guard_middleware";
import {IdParamName} from "./util-enums/id-names";
import {CollectionNames} from "../db/collection-names";
import {createIdValidator} from "./validation-middleware/id-verification-and-validation";
import {inputPaginationValidatorForPosts} from "./validation-middleware/pagination-validators";
import {PostsSortListEnum} from "./util-enums/fields-for-sorting";

export const postsRouter = Router();

const validatePostId = createIdValidator({
    paramKey: IdParamName.Id,
    collectionName: CollectionNames.Posts,
});

postsRouter.get('/', inputPaginationValidatorForPosts(PostsSortListEnum), inputErrorManagementMiddleware, getSeveralPosts); // Returns all posts
postsRouter.post('/', superAdminGuardMiddleware, postInputModelValidation, inputErrorManagementMiddleware, createNewPost); // auth guarded, Creates new post
postsRouter.get('/:id', validatePostId, inputErrorManagementMiddleware, findSinglePost); // Return post by id
postsRouter.put('/:id', superAdminGuardMiddleware, validatePostId, /*inputErrorManagementMiddleware,*/ postInputModelValidation, inputErrorManagementMiddleware, updatePost); // auth guarded, Update existing post by id with InputModel
postsRouter.delete('/:id', superAdminGuardMiddleware, validatePostId, inputErrorManagementMiddleware, deletePost) // auth guarded, Delete post specified by id