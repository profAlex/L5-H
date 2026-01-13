import {dataCommandRepository, postCollectionStorageModel} from "../repository-layers/command-repository-layer/command-repository";
import {PostViewModel} from "../routers/router-types/post-view-model";
import {PostInputModel} from "../routers/router-types/post-input-model";
import {InputGetPostsQuery} from "../routers/router-types/post-search-input-model";
import {WithId} from "mongodb";

export const postsService = {

    // async getAllPosts(): Promise <PostViewModel[] | []> {
    //     return await dataRepository.getAllPosts();
    // },


    async getSeveralPosts(sentInputGetPostsQuery: InputGetPostsQuery): Promise<{items: WithId<PostViewModel>[]; totalCount: number}> {

        return await dataCommandRepository.getSeveralPosts(sentInputGetPostsQuery);
    },

    async createNewPost(newPost: PostInputModel): Promise<PostViewModel | undefined> {
        const result = await dataCommandRepository.createNewPost(newPost);

        // if(result === undefined)
        // {
        //     // res.sendStatus(HttpStatus.NotFound);
        //     console.error("Error creating new post");
        //     throw new Error(`couldn't create new post inside dataRepository.createNewPost`);
        // }

        return result;
    },



    async findSinglePost(postId: string): Promise<PostViewModel | undefined> {
        return await dataCommandRepository.findSinglePost(postId);
    },

    async updatePost(postId: string, newData: PostInputModel) {
        return await dataCommandRepository.updatePost(postId, newData);
    },

    async deletePost (postId: string): Promise<null | undefined> {
        return await dataCommandRepository.deletePost(postId);
    },
    }