"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsService = void 0;
const command_repository_1 = require("../repository-layers/command-repository-layer/command-repository");
exports.postsService = {
    // async getAllPosts(): Promise <PostViewModel[] | []> {
    //     return await dataRepository.getAllPosts();
    // },
    // async getSeveralPosts(sentInputGetPostsQuery: InputGetPostsQuery): Promise<{items: WithId<PostViewModel>[]; totalCount: number}> {
    //
    //     return await dataCommandRepository.getSeveralPosts(sentInputGetPostsQuery);
    // },
    createNewPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield command_repository_1.dataCommandRepository.createNewPost(newPost);
        });
    },
    // async findSinglePost(postId: string): Promise<PostViewModel | undefined> {
    //     return await dataCommandRepository.findSinglePost(postId);
    // },
    updatePost(postId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield command_repository_1.dataCommandRepository.updatePost(postId, newData);
        });
    },
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield command_repository_1.dataCommandRepository.deletePost(postId);
        });
    },
};
