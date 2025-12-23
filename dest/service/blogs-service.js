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
exports.blogsService = void 0;
const blogger_mongodb_repository_1 = require("../repository/blogger-mongodb-repository");
exports.blogsService = {
    getSeveralBlogs(sentInputGetBlogsQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogger_mongodb_repository_1.dataRepository.getSeveralBlogs(sentInputGetBlogsQuery);
        });
    },
    createNewBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogger_mongodb_repository_1.dataRepository.createNewBlog(newBlog);
        });
    },
    createNewBlogPost(sentBlogId, newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield blogger_mongodb_repository_1.dataRepository.createNewBlogPost(sentBlogId, newPost);
            // if(result === undefined)
            // {
            //     // res.sendStatus(HttpStatus.NotFound);
            //     console.error("Error creating new post");
            //     throw new Error(`couldn't create new post inside dataRepository.createNewPost`);
            // }
            return result;
        });
    },
    getAllPostsFromBlog(sentBlogId, sentSanitizedQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogger_mongodb_repository_1.dataRepository.getSeveralPostsById(sentBlogId, sentSanitizedQuery);
        });
    },
    findSingleBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogger_mongodb_repository_1.dataRepository.findSingleBlog(blogId);
        });
    },
    updateBlog(blogId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogger_mongodb_repository_1.dataRepository.updateBlog(blogId, newData);
        });
    },
    deleteBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogger_mongodb_repository_1.dataRepository.deleteBlog(blogId);
        });
    },
};
