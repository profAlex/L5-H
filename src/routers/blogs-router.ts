import {Request, Response, Router} from 'express';
import {
    createNewBlog, createNewBlogPost,
    deleteBlog,
    findSingleBlog,
    getSeveralBlogs, getSeveralPostsFromBlog,
    updateBlog
} from "./router-handlers/blog-router-description";
import {blogInputModelValidation} from "./validation-middleware/BlogInputModel-validation-middleware";
import {inputErrorManagementMiddleware} from "./validation-middleware/error-management-validation-middleware";
import {superAdminGuardMiddleware} from "./validation-middleware/base64-auth-guard_middleware";
import {BlogsSortListEnum, PostsSortListEnum} from "./util-enums/fields-for-sorting";
import {
    inputPaginationValidatorForBlogs,
    inputPaginationValidatorForPosts
} from "./validation-middleware/pagination-validators";
import {
    blogRoutesPostInputModelValidation,
    postInputModelValidation
} from "./validation-middleware/PostInputModel-validation-middleware";
import {CollectionNames} from "../db/collection-names";
import {
    createIdValidator,
} from "./validation-middleware/id-verification-and-validation";
import {InputGetBlogPostsByIdQuery} from "./router-types/blog-search-by-id-input-model";
import {IdParamName} from "./util-enums/id-names";

export const blogsRouter = Router();

const validateBlogIdForSeveralPostsGetterEndpoint = createIdValidator<'blogId', InputGetBlogPostsByIdQuery>({
    paramKey: IdParamName.BlogId,
    collectionName: CollectionNames.Blogs,
});

const validateBlogIdForBlogPostCreationEndpoint = createIdValidator({
    paramKey: IdParamName.BlogId,
    collectionName: CollectionNames.Blogs,
});

const validateBlogIdForGeneralCRUDEndpoints = createIdValidator({
    paramKey: IdParamName.Id,
    collectionName: CollectionNames.Blogs,
});


blogsRouter.get('/', inputPaginationValidatorForBlogs(BlogsSortListEnum), inputErrorManagementMiddleware, getSeveralBlogs); // Returns blogs with paging
blogsRouter.post('/', superAdminGuardMiddleware, blogInputModelValidation, inputErrorManagementMiddleware, createNewBlog); // auth guarded, Creates new blog

blogsRouter.get('/:blogId/posts', validateBlogIdForSeveralPostsGetterEndpoint, inputPaginationValidatorForPosts(PostsSortListEnum), inputErrorManagementMiddleware, getSeveralPostsFromBlog); // Returns all posts for specified blog
blogsRouter.post('/:blogId/posts', superAdminGuardMiddleware, validateBlogIdForBlogPostCreationEndpoint, blogRoutesPostInputModelValidation, inputErrorManagementMiddleware, createNewBlogPost); // auth guarded, Creates new post for specific blog

blogsRouter.get('/:id', validateBlogIdForGeneralCRUDEndpoints, inputErrorManagementMiddleware, findSingleBlog); // Returns blog by id
blogsRouter.put('/:id', superAdminGuardMiddleware, validateBlogIdForGeneralCRUDEndpoints, blogInputModelValidation, inputErrorManagementMiddleware, updateBlog); // auth guarded, Update existing Blog by id with InputModel
blogsRouter.delete('/:id', superAdminGuardMiddleware, validateBlogIdForGeneralCRUDEndpoints, inputErrorManagementMiddleware, deleteBlog); // auth guarded, Deletes blog specified by id



