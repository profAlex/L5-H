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
exports.dataQueryRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const map_blog_search_to_view_model_1 = require("../mappers/map-blog-search-to-view-model");
const mongodb_1 = require("mongodb");
const map_to_BlogViewModel_1 = require("../mappers/map-to-BlogViewModel");
const map_to_PostViewModel_1 = require("../mappers/map-to-PostViewModel");
function findBlogByPrimaryKey(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return mongo_db_1.bloggersCollection.findOne({ _id: id });
    });
}
function findPostByPrimaryKey(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return mongo_db_1.postsCollection.findOne({ _id: id });
    });
}
exports.dataQueryRepository = {
    // *****************************
    // методы для управления блогами
    // *****************************
    getSeveralBlogs(sentInputGetBlogsQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, } = sentInputGetBlogsQuery;
            let filter = {};
            const skip = (pageNumber - 1) * pageSize;
            try {
                if (searchNameTerm && searchNameTerm.trim() !== '') {
                    // Экранируем спецсимволы для безопасного $regex
                    const escapedTerm = searchNameTerm
                        .trim()
                        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    filter = {
                        $or: [
                            { name: { $regex: escapedTerm, $options: 'i' } },
                            { description: { $regex: escapedTerm, $options: 'i' } },
                            { websiteUrl: { $regex: escapedTerm, $options: 'i' } },
                        ],
                    };
                }
            }
            catch (err) {
                console.error("ERROR: ", err);
            }
            if (!sortBy) {
                console.error("ERROR: sortBy is null or undefined inside dataRepository.getSeveralBlogs");
                throw new Error();
            }
            const items = yield mongo_db_1.bloggersCollection
                .find(filter)
                // "asc" (по возрастанию), то используется 1
                // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
                .sort({ [sortBy]: sortDirection })
                // пропускаем определённое количество документов перед тем, как вернуть нужный набор данных.
                .skip(skip)
                // ограничивает количество возвращаемых документов до значения pageSize
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.bloggersCollection.countDocuments(filter);
            return (0, map_blog_search_to_view_model_1.mapToBlogListPaginatedOutput)(items, {
                pageNumber: pageNumber,
                pageSize: pageSize,
                totalCount,
            });
        });
    },
    getSeveralPostsById(sentBlogId, sentSanitizedQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sortBy, sortDirection, pageNumber, pageSize, } = sentSanitizedQuery;
            const skip = (pageNumber - 1) * pageSize;
            if (!sortBy) {
                console.error("ERROR: sortBy is null or undefined inside dataRepository.getSeveralPostsById");
                throw new Error();
            }
            const items = yield mongo_db_1.postsCollection
                .find({ blogId: sentBlogId })
                // "asc" (по возрастанию), то используется 1
                // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
                .sort({ [sortBy]: sortDirection })
                // пропускаем определённое количество док. перед тем, как вернуть нужный набор данных.
                .skip(skip)
                // ограничивает количество возвращаемых документов до значения pageSize
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.postsCollection.countDocuments({ blogId: sentBlogId });
            return (0, map_blog_search_to_view_model_1.mapToPostListPaginatedOutput)(items, {
                pageNumber: pageNumber,
                pageSize: pageSize,
                totalCount,
            });
        });
    },
    findSingleBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(blogId)) {
                const blogger = yield findBlogByPrimaryKey(new mongodb_1.ObjectId(blogId));
                if (blogger) {
                    return (0, map_to_BlogViewModel_1.mapSingleBloggerCollectionToViewModel)(blogger);
                }
            }
            return undefined;
        });
    },
    // *****************************
    // методы для управления постами
    // *****************************
    getSeveralPosts(sentSanitizedQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sortBy, sortDirection, pageNumber, pageSize, } = sentSanitizedQuery;
            const skip = (pageNumber - 1) * pageSize;
            if (!sortBy) {
                console.error("ERROR: sortBy is null or undefined inside dataRepository.getSeveralPosts");
                throw new Error();
            }
            const items = yield mongo_db_1.postsCollection
                .find({})
                // "asc" (по возрастанию), то используется 1
                // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
                .sort({ [sortBy]: sortDirection })
                // пропускаем определённое количество док. перед тем, как вернуть нужный набор данных.
                .skip(skip)
                // ограничивает количество возвращаемых документов до значения pageSize
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.postsCollection.countDocuments({});
            return (0, map_blog_search_to_view_model_1.mapToPostListPaginatedOutput)(items, {
                pageNumber: pageNumber,
                pageSize: pageSize,
                totalCount,
            });
        });
    },
    findSinglePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(postId)) {
                const post = yield findPostByPrimaryKey(new mongodb_1.ObjectId(postId));
                if (post) {
                    return (0, map_to_PostViewModel_1.mapSinglePostCollectionToViewModel)(post);
                }
            }
            return undefined;
        });
    },
};
