"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blog_router_description_1 = require("./router-handlers/blog-router-description");
const BlogInputModel_validation_middleware_1 = require("./validation-middleware/BlogInputModel-validation-middleware");
const error_management_validation_middleware_1 = require("./validation-middleware/error-management-validation-middleware");
const base64_auth_guard_middleware_1 = require("./validation-middleware/base64-auth-guard_middleware");
const fields_for_sorting_1 = require("./util-enums/fields-for-sorting");
const pagination_validators_1 = require("./validation-middleware/pagination-validators");
const PostInputModel_validation_middleware_1 = require("./validation-middleware/PostInputModel-validation-middleware");
const collection_names_1 = require("../db/collection-names");
const id_verification_and_validation_1 = require("./validation-middleware/id-verification-and-validation");
const id_names_1 = require("./util-enums/id-names");
exports.blogsRouter = (0, express_1.Router)();
const validateBlogIdForSeveralPostsGetterEndpoint = (0, id_verification_and_validation_1.createIdValidator)({
    paramKey: id_names_1.IdParamName.BlogId,
    collectionName: collection_names_1.CollectionNames.Blogs,
});
const validateBlogIdForBlogPostCreationEndpoint = (0, id_verification_and_validation_1.createIdValidator)({
    paramKey: id_names_1.IdParamName.BlogId,
    collectionName: collection_names_1.CollectionNames.Blogs,
});
const validateBlogIdForGeneralCRUDEndpoints = (0, id_verification_and_validation_1.createIdValidator)({
    paramKey: id_names_1.IdParamName.Id,
    collectionName: collection_names_1.CollectionNames.Blogs,
});
exports.blogsRouter.get('/', (0, pagination_validators_1.inputPaginationValidatorForBlogs)(fields_for_sorting_1.BlogsSortListEnum), error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.getSeveralBlogs); // Returns blogs with paging
exports.blogsRouter.post('/', base64_auth_guard_middleware_1.superAdminGuardMiddleware, BlogInputModel_validation_middleware_1.blogInputModelValidation, error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.createNewBlog); // auth guarded, Creates new blog
exports.blogsRouter.get('/:blogId/posts', validateBlogIdForSeveralPostsGetterEndpoint, (0, pagination_validators_1.inputPaginationValidatorForPosts)(fields_for_sorting_1.PostsSortListEnum), error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.getSeveralPostsFromBlog); // Returns all posts for specified blog
exports.blogsRouter.post('/:blogId/posts', base64_auth_guard_middleware_1.superAdminGuardMiddleware, validateBlogIdForBlogPostCreationEndpoint, PostInputModel_validation_middleware_1.blogRoutesPostInputModelValidation, error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.createNewBlogPost); // auth guarded, Creates new post for specific blog
exports.blogsRouter.get('/:id', validateBlogIdForGeneralCRUDEndpoints, error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.findSingleBlog); // Returns blog by id
exports.blogsRouter.put('/:id', base64_auth_guard_middleware_1.superAdminGuardMiddleware, validateBlogIdForGeneralCRUDEndpoints, BlogInputModel_validation_middleware_1.blogInputModelValidation, error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.updateBlog); // auth guarded, Update existing Blog by id with InputModel
exports.blogsRouter.delete('/:id', base64_auth_guard_middleware_1.superAdminGuardMiddleware, validateBlogIdForGeneralCRUDEndpoints, error_management_validation_middleware_1.inputErrorManagementMiddleware, blog_router_description_1.deleteBlog); // auth guarded, Deletes blog specified by id
