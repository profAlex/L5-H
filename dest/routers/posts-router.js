"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const post_router_description_1 = require("./router handlers/post-router-description");
const PostInputModel_validation_middleware_1 = require("../validation/PostInputModel-validation-middleware");
const error_management_validation_middleware_1 = require("../validation/error-management-validation-middleware");
const base64_auth_guard_middleware_1 = require("../validation/base64-auth-guard_middleware");
const blogs_router_1 = require("./blogs-router");
const collection_names_1 = require("../repository/collection-names");
const id_verification_and_validation_1 = require("../validation/id-verification-and-validation");
const mongo_db_1 = require("../db/mongo.db");
const blog_pagination_validator_1 = require("./blogs-validation-middleware/blog-pagination-validator");
const fields_for_sorting_1 = require("./util-enums/fields-for-sorting");
exports.postsRouter = (0, express_1.Router)();
const validateBlogId4 = (0, id_verification_and_validation_1.createIdValidator)({
    paramKey: blogs_router_1.IdParamName.Id,
    collectionName: collection_names_1.CollectionNames.Posts,
    database: mongo_db_1.db,
});
exports.postsRouter.get('/', (0, blog_pagination_validator_1.inputPaginationValidator2)(fields_for_sorting_1.PostsSortListEnum), error_management_validation_middleware_1.inputErrorManagementMiddleware, post_router_description_1.getSeveralPosts);
// где обрабатывать массив errorMessages (который в функции inputErrorManagementMiddleware), где его органично выводить если он не пустой?
exports.postsRouter.post('/', base64_auth_guard_middleware_1.superAdminGuardMiddleware, PostInputModel_validation_middleware_1.postInputModelValidation, error_management_validation_middleware_1.inputErrorManagementMiddleware, post_router_description_1.createNewPost); //auth guarded
exports.postsRouter.get('/:id', validateBlogId4, error_management_validation_middleware_1.inputErrorManagementMiddleware, post_router_description_1.findSinglePost);
//inputErrorManagementMiddleware можно один раз или надо два раза?
exports.postsRouter.put('/:id', base64_auth_guard_middleware_1.superAdminGuardMiddleware, validateBlogId4, /*inputErrorManagementMiddleware,*/ PostInputModel_validation_middleware_1.postInputModelValidation, error_management_validation_middleware_1.inputErrorManagementMiddleware, post_router_description_1.updatePost); //auth guarded
exports.postsRouter.delete('/:id', base64_auth_guard_middleware_1.superAdminGuardMiddleware, validateBlogId4, error_management_validation_middleware_1.inputErrorManagementMiddleware, post_router_description_1.deletePost); //auth guarded
