import {Request, Response, Router} from 'express';
import {
    createNewBlog, createNewBlogPost,
    deleteBlog,
    findSingleBlog,
    getSeveralBlogs, getSeveralPostsFromBlog,
    updateBlog
} from "./router handlers/blog-router-description";
import {blogInputModelValidation} from "../validation/BlogInputModel-validation-middleware";
import {inputErrorManagementMiddleware} from "../validation/error-management-validation-middleware";
import {superAdminGuardMiddleware} from "../validation/base64-auth-guard_middleware";
import {BlogsSortListEnum, PostsSortListEnum} from "./util-enums/fields-for-sorting";
import {
    inputPaginationValidator,
    inputPaginationValidator2
} from "./blogs-validation-middleware/blog-pagination-validator";
import {
    blogRoutesPostInputModelValidation,
    postInputModelValidation
} from "../validation/PostInputModel-validation-middleware";
import {CollectionNames} from "../repository/collection-names";
import {
    createIdValidator,
} from "../validation/id-verification-and-validation";
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


blogsRouter.get('/', inputPaginationValidator(BlogsSortListEnum), inputErrorManagementMiddleware, getSeveralBlogs);
blogsRouter.post('/', superAdminGuardMiddleware, blogInputModelValidation, inputErrorManagementMiddleware, createNewBlog); //auth guarded

blogsRouter.get('/:blogId/posts', validateBlogIdForSeveralPostsGetterEndpoint, inputPaginationValidator2(PostsSortListEnum), inputErrorManagementMiddleware, getSeveralPostsFromBlog);
blogsRouter.post('/:blogId/posts', superAdminGuardMiddleware, validateBlogIdForBlogPostCreationEndpoint, blogRoutesPostInputModelValidation, inputErrorManagementMiddleware, createNewBlogPost);

blogsRouter.get('/:id', validateBlogIdForGeneralCRUDEndpoints, inputErrorManagementMiddleware, findSingleBlog);
blogsRouter.put('/:id', superAdminGuardMiddleware, validateBlogIdForGeneralCRUDEndpoints, blogInputModelValidation, inputErrorManagementMiddleware, updateBlog); //auth guarded
blogsRouter.delete('/:id', superAdminGuardMiddleware, validateBlogIdForGeneralCRUDEndpoints, inputErrorManagementMiddleware, deleteBlog); //auth guarded



