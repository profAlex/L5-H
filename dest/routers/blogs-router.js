"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdParamName = exports.blogsRouter = void 0;
const express_1 = require("express");
const blog_router_description_1 = require("./router handlers/blog-router-description");
const BlogInputModel_validation_middleware_1 = require("../validation/BlogInputModel-validation-middleware");
const error_management_validation_middleware_1 = require("../validation/error-management-validation-middleware");
const base64_auth_guard_middleware_1 = require("../validation/base64-auth-guard_middleware");
const fields_for_sorting_1 = require("./util-enums/fields-for-sorting");
const blog_pagination_validator_1 = require("./blogs-validation-middleware/blog-pagination-validator");
const PostInputModel_validation_middleware_1 = require("../validation/PostInputModel-validation-middleware");
const collection_names_1 = require("../repository/collection-names");
const id_verification_and_validation_1 = require("../validation/id-verification-and-validation");
const mongo_db_1 = require("../db/mongo.db");
// import {inputIdValidationVerification} from "../validation/id-input-validation-middleware";
exports.blogsRouter = (0, express_1.Router)();
var IdParamName;
(function (IdParamName) {
    IdParamName["Id"] = "id";
    IdParamName["BlogId"] = "blogId";
})(IdParamName || (exports.IdParamName = IdParamName = {}));
const validateBlogId = (0, id_verification_and_validation_1.createIdValidator)({
    paramKey: IdParamName.BlogId,
    collectionName: collection_names_1.CollectionNames.Blogs,
    database: mongo_db_1.db,
});
const validateBlogId2 = (0, id_verification_and_validation_1.createIdValidator)({
    paramKey: IdParamName.BlogId,
    collectionName: collection_names_1.CollectionNames.Blogs,
    database: mongo_db_1.db,
});
const validateBlogId3 = (0, id_verification_and_validation_1.createIdValidator)({
    paramKey: IdParamName.Id,
    collectionName: collection_names_1.CollectionNames.Blogs,
    database: mongo_db_1.db,
});
exports.blogsRouter.get('/', (0, blog_pagination_validator_1.inputPaginationValidator)(fields_for_sorting_1.BlogsSortListEnum), error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.getSeveralBlogs);
// где обрабатывать массив errorMessages (который в функции inputErrorManagementMiddleware), где его органично выводить если он не пустой?
exports.blogsRouter.post('/', base64_auth_guard_middleware_1.superAdminGuardMiddleware, BlogInputModel_validation_middleware_1.blogInputModelValidation, error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.createNewBlog); //auth guarded
exports.blogsRouter.get('/:blogId/posts', validateBlogId, (0, blog_pagination_validator_1.inputPaginationValidator2)(fields_for_sorting_1.PostsSortListEnum), error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.getSeveralPostsFromBlog);
exports.blogsRouter.post('/:blogId/posts', base64_auth_guard_middleware_1.superAdminGuardMiddleware, validateBlogId2, PostInputModel_validation_middleware_1.blogRoutesPostInputModelValidation, error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.createNewBlogPost);
exports.blogsRouter.get('/:id', validateBlogId3, error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.findSingleBlog);
// inputErrorManagementMiddleware два раза или один? проверить!
exports.blogsRouter.put('/:id', base64_auth_guard_middleware_1.superAdminGuardMiddleware, validateBlogId3, /*inputErrorManagementMiddleware,*/ BlogInputModel_validation_middleware_1.blogInputModelValidation, error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.updateBlog); //auth guarded
exports.blogsRouter.delete('/:id', base64_auth_guard_middleware_1.superAdminGuardMiddleware, validateBlogId3, error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.deleteBlog); //auth guarded
