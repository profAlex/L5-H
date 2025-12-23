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
const blogger_mongodb_repository_1 = require("../repository/blogger-mongodb-repository");
exports.postsService = {
    // async getAllPosts(): Promise <PostViewModel[] | []> {
    //     return await dataRepository.getAllPosts();
    // },
    getSeveralPosts(sentInputGetPostsQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogger_mongodb_repository_1.dataRepository.getSeveralPosts(sentInputGetPostsQuery);
        });
    },
    createNewPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield blogger_mongodb_repository_1.dataRepository.createNewPost(newPost);
            // if(result === undefined)
            // {
            //     // res.sendStatus(HttpStatus.NotFound);
            //     console.error("Error creating new post");
            //     throw new Error(`couldn't create new post inside dataRepository.createNewPost`);
            // }
            return result;
        });
    },
    findSinglePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogger_mongodb_repository_1.dataRepository.findSinglePost(postId);
        });
    },
    updatePost(postId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogger_mongodb_repository_1.dataRepository.updatePost(postId, newData);
        });
    },
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogger_mongodb_repository_1.dataRepository.deletePost(postId);
        });
    },
};
