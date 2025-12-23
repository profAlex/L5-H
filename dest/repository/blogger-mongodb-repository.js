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
exports.dataRepository = void 0;
const mongo_db_1 = require("../db/mongo.db");
const mongodb_1 = require("mongodb");
//bloggerPosts: PostViewModel[] | null | undefined;
// const __nonDisclosableDatabase = {
//     bloggerRepository: [{
//         bloggerInfo:
//             {
//                 id: "001",
//                 name: "blogger_001",
//                 description: "takoy sebe blogger...",
//                 websiteUrl: "https://takoy.blogger.com",
//             },
//         bloggerPosts:
//             [{
//                 id: "001_001",
//                 title: "post blog 001",
//                 shortDescription: "post ni o 4em",
//                 content: "Eto testovoe napolnenie posta 001_001",
//                 blogId: "001",
//                 blogName: "blogger_001"
//             },
//             {
//                 id: "001_002",
//                 title: "post blog 002",
//                 shortDescription: "post ni o 4em",
//                 content: "Eto testovoe napolnenie posta 001_002",
//                 blogId: "001",
//                 blogName: "blogger_001"
//             }
//         ]},
//         {
//             bloggerInfo:
//             {
//                 id: "002",
//                 name: "blogger_002",
//                 description: "a eto klassnii blogger!",
//                 wbesiteUrl: "https://klassnii.blogger.com"
//             },
//             bloggerPosts:
//             [{
//                 id: "002_001",
//                 title: "post blog 001",
//                 shortDescription: "horowii post",
//                 content: "Eto testovoe napolnenie posta 002_001",
//                 blogId: "002",
//                 blogName: "blogger_002"
//             },
//             {
//                 postId: "002_002",
//                 postTitle: "post blog 002",
//                 postShortDescription: "horowii post",
//                 postContent: "Eto testovoe napolnenie posta 002_002",
//                 blogId: "002",
//                 blogName: "blogger_002"
//             }]
//         }
//     ]
// const bloggerInfo: bloggerCollectionStorageModel[] = [
//     {
//         id: "001",
//         name: "blogger_001",
//         description: "takoy sebe blogger...",
//         websiteUrl: "https://takoy.blogger.com",
//         createdAt: new Date,
//         isMembership: false
//     },
//     {
//         id: "002",
//         name: "blogger_002",
//         description: "a eto klassnii blogger!",
//         websiteUrl: "https://klassnii.blogger.com",
//         createdAt: new Date,
//         isMembership: false,
//     }
// ];
//
//
// const bloggerPosts: postCollectionStorageModel[] = [
//     {
//         id: "001_001",
//         title: "post blog 001",
//         shortDescription: "post ni o 4em",
//         content: "Eto testovoe napolnenie posta 001_001",
//         blogId: "001",
//         blogName: "blogger_001",
//         createdAt: new Date()
//     },
//     {
//         id: "001_002",
//         title: "post blog 002",
//         shortDescription: "post ni o 4em",
//         content: "Eto testovoe napolnenie posta 001_002",
//         blogId: "001",
//         blogName: "blogger_001",
//         createdAt: new Date()
//     },
//     {
//         id: "002_001",
//         title: "post blog 001",
//         shortDescription: "horowii post",
//         content: "Eto testovoe napolnenie posta 002_001",
//         blogId: "002",
//         blogName: "blogger_002",
//         createdAt: new Date()
//     },
//     {
//         id: "002_002",
//         title: "post blog 002",
//         shortDescription: "horowii post",
//         content: "Eto testovoe napolnenie posta 002_002",
//         blogId: "002",
//         blogName: "blogger_002",
//         createdAt: new Date()
//     }
// ];
// пока не используем
const generateCombinedId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString().substring(2, 5);
    return `${timestamp}-${random}`;
};
const transformSingleBloggerCollectionToViewModel = (blogInContainer) => {
    return {
        id: blogInContainer._id.toString(),
        name: blogInContainer.name,
        description: blogInContainer.description,
        websiteUrl: blogInContainer.websiteUrl,
        createdAt: blogInContainer.createdAt,
        isMembership: false // был false
    };
};
const transformSinglePostCollectionToViewModel = (postInContainer) => {
    return {
        id: postInContainer._id.toString(),
        title: postInContainer.title,
        shortDescription: postInContainer.shortDescription,
        content: postInContainer.content,
        blogId: postInContainer.blogId,
        blogName: postInContainer.blogName,
        createdAt: postInContainer.createdAt
    };
};
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
exports.dataRepository = {
    // *****************************
    // методы для управления блогами
    // *****************************
    getSeveralBlogs(sentInputGetBlogsQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, } = sentInputGetBlogsQuery;
            let filter = {};
            const skip = (pageNumber - 1) * pageSize;
            // _id: ObjectId,
            // id: string;
            // name: string;
            // description: string;
            // websiteUrl: string;
            // createdAt: Date;
            // isMembership: boolean;
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
                // console.log("<---------------WE GOT HERE??? 4");
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
            return { items, totalCount };
        });
    },
    createNewBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempId = new mongodb_1.ObjectId();
            const newBlogEntry = Object.assign(Object.assign({ _id: tempId, id: tempId.toString() }, newBlog), { createdAt: new Date(), isMembership: false });
            yield mongo_db_1.bloggersCollection.insertOne(newBlogEntry);
            return transformSingleBloggerCollectionToViewModel(newBlogEntry);
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
            return { items, totalCount };
        });
    },
    findSingleBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(blogId)) {
                const blogger = yield findBlogByPrimaryKey(new mongodb_1.ObjectId(blogId));
                if (blogger) {
                    // const foundBlogger = {
                    //     id: blogger.bloggerInfo.id,
                    //     name: blogger.bloggerInfo.name,
                    //     description: blogger.bloggerInfo.description,
                    //     websiteUrl: blogger.bloggerInfo.websiteUrl
                    // }
                    // console.log("ID inside finding function:", foundBlogger.id);
                    return transformSingleBloggerCollectionToViewModel(blogger);
                }
            }
            return undefined;
        });
    },
    updateBlog(blogId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(blogId)) {
                const idToCheck = new mongodb_1.ObjectId(blogId);
                const res = yield mongo_db_1.bloggersCollection.updateOne({ _id: idToCheck }, { $set: Object.assign({}, newData) });
                if (res.matchedCount === 1) {
                    return null;
                }
            }
            //
            // const blogger = __nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === blogId);
            //
            // if(blogger)
            // {
            //     let blogIndex = __nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
            //
            //     const updatedBlogger = {
            //         ...blogger,
            //         bloggerInfo: {
            //             id: blogger.bloggerInfo.id,
            //             name: newData.name,
            //             description: newData.description,
            //             websiteUrl: newData.websiteUrl
            //         }
            //     }
            //
            //     __nonDisclosableDatabase.bloggerRepository[blogIndex] = updatedBlogger;
            //
            //     return null;
            // }
            return undefined;
        });
    },
    deleteBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(blogId)) {
                const idToCheck = new mongodb_1.ObjectId(blogId);
                const res = yield mongo_db_1.bloggersCollection.deleteOne({ _id: idToCheck });
                if (res.deletedCount === 1) {
                    yield mongo_db_1.postsCollection.deleteMany({ blogId: blogId }); // Надо связанные посты удалять?????????????????
                    return null;
                }
            }
            return undefined;
            // const blogger = __nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === blogId);
            // if(blogger)
            // {
            //     let blogIndex = __nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
            //     __nonDisclosableDatabase.bloggerRepository.splice(blogIndex, 1);
            //
            //     return null;
            // }
            //
            // return undefined;
        });
    },
    // *****************************
    // методы для управления постами
    // *****************************
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            // return __nonDisclosableDatabase.bloggerRepository.flatMap((element: bloggerRawData):PostViewModel[] | [] => (element.bloggerPosts ?? []));
            const tempContainer = yield mongo_db_1.postsCollection.find({}).toArray();
            // console.log('LOOK HERE ---->', tempContainer.length);
            return tempContainer.map((value) => ({
                id: value._id.toString(),
                title: value.title,
                shortDescription: value.shortDescription,
                content: value.content,
                blogId: value.blogId,
                blogName: value.blogName,
                createdAt: value.createdAt
            }));
            // _id: ObjectId,
            // id: string;
            // title: string;
            // shortDescription: string;
            // content: string;
            // blogId: string;
            // blogName: string;
            // createdAt: Date;
        });
    },
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
            return { items, totalCount };
        });
    },
    createNewPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongodb_1.ObjectId.isValid(newPost.blogId)) {
                    const tempId = new mongodb_1.ObjectId();
                    const relatedBlogger = yield this.findSingleBlog(newPost.blogId);
                    if (relatedBlogger) {
                        const newPostEntry = Object.assign(Object.assign({ _id: tempId, id: tempId.toString() }, newPost), { 
                            //blogId: newPost.blogId,
                            blogName: relatedBlogger.name, createdAt: new Date() });
                        yield mongo_db_1.postsCollection.insertOne(newPostEntry);
                        return transformSinglePostCollectionToViewModel(newPostEntry);
                    }
                }
            }
            catch (error) {
                console.error("Unknown error inside dataRepository.createNewPost: ", error);
                throw new Error("Unknown error inside dataRepository.createNewPost");
            }
            return undefined;
        });
    },
    createNewBlogPost(sentBlogId, newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongodb_1.ObjectId.isValid(sentBlogId)) {
                    const tempId = new mongodb_1.ObjectId();
                    const relatedBlogger = yield this.findSingleBlog(sentBlogId);
                    if (relatedBlogger) {
                        const newPostEntry = Object.assign(Object.assign({ _id: tempId, id: tempId.toString() }, newPost), { blogId: sentBlogId, blogName: relatedBlogger.name, createdAt: new Date() });
                        yield mongo_db_1.postsCollection.insertOne(newPostEntry);
                        //const propertyCount = Object.keys(newPostEntry).length;
                        //console.log("LOOK HERE ------>", propertyCount);
                        return transformSinglePostCollectionToViewModel(newPostEntry);
                        // return test;
                    }
                }
            }
            catch (error) {
                console.error("Unknown error inside dataRepository.createNewBlogPost: ", error);
                throw new Error("Unknown error inside dataRepository.createNewBlogPost");
            }
            return undefined;
        });
    },
    findSinglePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(postId)) {
                //А если ключ существует надо ли делат проверку ша if(post) ?
                const post = yield findPostByPrimaryKey(new mongodb_1.ObjectId(postId));
                if (post) {
                    return transformSinglePostCollectionToViewModel(post);
                }
            }
            return undefined;
        });
    },
    updatePost(postId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(postId)) {
                const idToCheck = new mongodb_1.ObjectId(postId);
                const res = yield mongo_db_1.postsCollection.updateOne({ _id: idToCheck }, { $set: Object.assign({}, newData) });
                if (res.matchedCount === 1) {
                    return null;
                }
            }
            return undefined;
        });
    },
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(postId)) {
                const idToCheck = new mongodb_1.ObjectId(postId);
                const res = yield mongo_db_1.postsCollection.deleteOne({ _id: idToCheck });
                if (res.deletedCount === 1) {
                    return null;
                }
            }
            return undefined;
        });
    },
    // *****************************
    // методы для тестов
    // *****************************
    deleteAllBloggers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_db_1.bloggersCollection.deleteMany({});
            yield mongo_db_1.postsCollection.deleteMany({});
        });
    },
    returnBloggersAmount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.bloggersCollection.countDocuments();
        });
    }
};
