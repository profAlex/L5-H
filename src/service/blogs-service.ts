import {CustomSortDirection} from "../routers/util-enums/sort-direction";
import {Request, Response} from "express";
import {InputGetBlogsQuery} from "../routers/router-types/blog-search-input-model";
import {WithId} from "mongodb";
import {BlogViewModel} from "../routers/router-types/blog-view-model";
import {dataRepository} from "../repository/blogger-mongodb-repository";
import {InputGetBlogPostsByIdQuery} from "../routers/router-types/blog-search-by-id-input-model";
import {PostViewModel} from "../routers/router-types/post-view-model";
import {BlogInputModel} from "../routers/router-types/blog-input-model";
import {PostInputModel} from "../routers/router-types/post-input-model";



export const blogsService = {
    async getSeveralBlogs(sentInputGetBlogsQuery: InputGetBlogsQuery): Promise<{items: WithId<BlogViewModel>[]; totalCount: number}> {

        return await dataRepository.getSeveralBlogs(sentInputGetBlogsQuery);
    },

    async createNewBlog(newBlog: BlogInputModel) {

        return await dataRepository.createNewBlog(newBlog);
    },

    async createNewBlogPost(sentBlogId: string, newPost: PostInputModel): Promise<PostViewModel | undefined> {
        const result = await dataRepository.createNewBlogPost(sentBlogId, newPost);

        // if(result === undefined)
        // {
        //     // res.sendStatus(HttpStatus.NotFound);
        //     console.error("Error creating new post");
        //     throw new Error(`couldn't create new post inside dataRepository.createNewPost`);
        // }

        return result;
    },

    async getAllPostsFromBlog(sentBlogId:string, sentSanitizedQuery: InputGetBlogPostsByIdQuery): Promise<{items: WithId<PostViewModel>[]; totalCount: number}> {

        return await dataRepository.getSeveralPostsById(sentBlogId, sentSanitizedQuery);
    },

    async findSingleBlog(blogId: string): Promise<BlogViewModel | undefined> {

        return await dataRepository.findSingleBlog(blogId);
    },

    async updateBlog (blogId: string, newData: BlogInputModel) {
        return await dataRepository.updateBlog(blogId, newData);
    },

    async deleteBlog (blogId: string) {
        return await dataRepository.deleteBlog(blogId);
    },

}