import {dataCommandRepository} from "../repository-layers/command-repository-layer/command-repository";
import {PostViewModel} from "../routers/router-types/post-view-model";
import {PostInputModel} from "../routers/router-types/post-input-model";


export const postsService = {

        // async getAllPosts(): Promise <PostViewModel[] | []> {
        //     return await dataRepository.getAllPosts();
        // },

        // async getSeveralPosts(sentInputGetPostsQuery: InputGetPostsQuery): Promise<{items: WithId<PostViewModel>[]; totalCount: number}> {
        //
        //     return await dataCommandRepository.getSeveralPosts(sentInputGetPostsQuery);
        // },

        async createNewPost(newPost: PostInputModel): Promise<string | undefined> {

            return await dataCommandRepository.createNewPost(newPost);
        },

        // async findSinglePost(postId: string): Promise<PostViewModel | undefined> {
        //     return await dataCommandRepository.findSinglePost(postId);
        // },

        async updatePost(postId: string, newData: PostInputModel) {
            return await dataCommandRepository.updatePost(postId, newData);
        },

        async deletePost (postId: string): Promise<null | undefined> {
            return await dataCommandRepository.deletePost(postId);
        },
    }