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
exports.dataCommandRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const mongodb_1 = require("mongodb");
const custom_error_class_1 = require("../utility/custom-error-class");
const bcypt_1 = require("../../authentication/bcypt");
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
exports.dataCommandRepository = {
    // *****************************
    // методы для управления блогами
    // *****************************
    // перенесли в dataQueryRepository
    // async getSeveralBlogs(sentInputGetBlogsQuery: InputGetBlogsQuery) : Promise<{items: WithId<BlogViewModel>[]; totalCount: number}> {
    //     const {
    //         searchNameTerm,
    //         sortBy,
    //         sortDirection,
    //         pageNumber,
    //         pageSize,
    //     } = sentInputGetBlogsQuery;
    //
    //     let filter :any = {};
    //     const skip = (pageNumber - 1) * pageSize;
    //
    //     try{
    //
    //         if (searchNameTerm && searchNameTerm.trim() !== '') {
    //             // Экранируем спецсимволы для безопасного $regex
    //             const escapedTerm = searchNameTerm
    //                 .trim()
    //                 .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    //
    //             filter = {
    //                 $or: [
    //                     { name: { $regex: escapedTerm, $options: 'i' } },
    //                     { description: { $regex: escapedTerm, $options: 'i' } },
    //                     { websiteUrl: { $regex: escapedTerm, $options: 'i' } },
    //                 ],
    //             };
    //         }
    //     }
    //     catch(err){
    //         console.error("ERROR: ", err)
    //     }
    //
    //     if(!sortBy) {
    //         console.error("ERROR: sortBy is null or undefined inside dataRepository.getSeveralBlogs");
    //         throw new Error();
    //     }
    //
    //     const items = await bloggersCollection
    //         .find(filter)
    //
    //         // "asc" (по возрастанию), то используется 1
    //         // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
    //         .sort({[sortBy]: sortDirection})
    //
    //         // пропускаем определённое количество документов перед тем, как вернуть нужный набор данных.
    //         .skip(skip)
    //
    //         // ограничивает количество возвращаемых документов до значения pageSize
    //         .limit(pageSize)
    //         .toArray();
    //
    //     const totalCount = await bloggersCollection.countDocuments(filter);
    //
    //     return {items, totalCount};
    // },
    createNewBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempId = new mongodb_1.ObjectId();
                const newBlogEntry = Object.assign(Object.assign({ _id: tempId, id: tempId.toString() }, newBlog), { createdAt: new Date(), isMembership: false });
                const result = yield mongo_db_1.bloggersCollection.insertOne(newBlogEntry);
                if (!result.acknowledged) {
                    throw new custom_error_class_1.CustomError({
                        errorMessage: { field: 'bloggersCollection.insertOne(newBlogEntry)', message: 'attempt to insert new blog entry failed' }
                    });
                }
                // return mapSingleBloggerCollectionToViewModel(newBlogEntry);
                return result.insertedId.toString();
            }
            catch (error) {
                if (error instanceof custom_error_class_1.CustomError) {
                    if (error.metaData) {
                        const errorData = error.metaData.errorMessage;
                        console.error(`In field: ${errorData.field} - ${errorData.message}`);
                    }
                    else {
                        console.error(`Unknown error: ${JSON.stringify(error)}`);
                    }
                    // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                    return undefined;
                }
                else {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                    throw new Error('Placeholder for an error to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                }
            }
        });
    },
    // async getSeveralPostsById(sentBlogId:string, sentSanitizedQuery: InputGetBlogPostsByIdQuery) : Promise<{items: WithId<PostViewModel>[]; totalCount: number}> {
    //     const {
    //         sortBy,
    //         sortDirection,
    //         pageNumber,
    //         pageSize,
    //     } = sentSanitizedQuery;
    //
    //     const skip = (pageNumber - 1) * pageSize;
    //
    //     if(!sortBy) {
    //         console.error("ERROR: sortBy is null or undefined inside dataRepository.getSeveralPostsById");
    //         throw new Error();
    //     }
    //
    //     const items = await postsCollection
    //         .find({blogId: sentBlogId})
    //
    //         // "asc" (по возрастанию), то используется 1
    //         // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
    //         .sort({[sortBy]: sortDirection})
    //
    //         // пропускаем определённое количество док. перед тем, как вернуть нужный набор данных.
    //         .skip(skip)
    //
    //         // ограничивает количество возвращаемых документов до значения pageSize
    //         .limit(pageSize)
    //         .toArray();
    //
    //     const totalCount = await postsCollection.countDocuments({blogId: sentBlogId});
    //
    //     return {items, totalCount};
    // },
    //
    // async findSingleBlog(blogId: string): Promise<BlogViewModel | undefined> {
    //
    //     if (ObjectId.isValid(blogId)) {
    //
    //         const blogger: bloggerCollectionStorageModel | null = await findBlogByPrimaryKey(new ObjectId(blogId));
    //
    //         if(blogger)
    //         {
    //             // const foundBlogger = {
    //             //     id: blogger.bloggerInfo.id,
    //             //     name: blogger.bloggerInfo.name,
    //             //     description: blogger.bloggerInfo.description,
    //             //     websiteUrl: blogger.bloggerInfo.websiteUrl
    //             // }
    //
    //             // console.log("ID inside finding function:", foundBlogger.id);
    //
    //             return mapSingleBloggerCollectionToViewModel(blogger);
    //         }
    //     }
    //
    //     return undefined;
    // },
    updateBlog(blogId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (ObjectId.isValid(blogId)) {
            //
            //     const idToCheck = new ObjectId(blogId);
            //     const res = await bloggersCollection.updateOne(
            //         {_id: idToCheck},
            //         {$set: {...newData}}
            //     );
            //
            //     if(res.matchedCount === 1)
            //     {
            //         return null;
            //     }
            // }
            try {
                if (mongodb_1.ObjectId.isValid(blogId)) {
                    const idToCheck = new mongodb_1.ObjectId(blogId);
                    const res = yield mongo_db_1.bloggersCollection.updateOne({ _id: idToCheck }, { $set: Object.assign({}, newData) });
                    if (!res.acknowledged) {
                        throw new custom_error_class_1.CustomError({
                            errorMessage: { field: 'bloggersCollection.updateOne', message: 'attempt to update blog entry failed' }
                        });
                    }
                    if (res.matchedCount === 1) {
                        // успешное выполнение
                        return null;
                    }
                }
                else {
                    throw new custom_error_class_1.CustomError({
                        errorMessage: { field: 'ObjectId.isValid(blogId)', message: 'invalid blog ID' }
                    });
                }
            }
            catch (error) {
                if (error instanceof custom_error_class_1.CustomError) {
                    if (error.metaData) {
                        const errorData = error.metaData.errorMessage;
                        console.error(`In field: ${errorData.field} - ${errorData.message}`);
                    }
                    else {
                        console.error(`Unknown error: ${JSON.stringify(error)}`);
                    }
                    return undefined;
                }
                else {
                    console.error(`Unknown error inside dataCommandRepository.updateBlog: ${JSON.stringify(error)}`);
                    throw new Error('Placeholder for an error to be rethrown and dealt with in the future in updateBlog method of dataCommandRepository');
                }
            }
        });
    },
    deleteBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (ObjectId.isValid(blogId)) {
            //     const idToCheck = new ObjectId(blogId);
            //     const res = await bloggersCollection.deleteOne({_id: idToCheck});
            //
            //
            //
            //     if(res.deletedCount === 1)
            //     {
            //         await postsCollection.deleteMany({ blogId: blogId }); // Надо связанные посты удалять?????????????????
            //         return null;
            //     }
            // }
            try {
                if (mongodb_1.ObjectId.isValid(blogId)) {
                    const idToCheck = new mongodb_1.ObjectId(blogId);
                    const res = yield mongo_db_1.bloggersCollection.deleteOne({ _id: idToCheck });
                    if (!res.acknowledged) {
                        throw new custom_error_class_1.CustomError({
                            errorMessage: { field: 'bloggersCollection.deleteOne', message: 'attempt to delete blog entry failed' }
                        });
                    }
                    if (res.deletedCount === 1) {
                        return null;
                    }
                }
                else {
                    throw new custom_error_class_1.CustomError({
                        errorMessage: { field: 'ObjectId.isValid(blogId)', message: 'invalid blog ID' }
                    });
                }
            }
            catch (error) {
                if (error instanceof custom_error_class_1.CustomError) {
                    if (error.metaData) {
                        const errorData = error.metaData.errorMessage;
                        console.error(`In field: ${errorData.field} - ${errorData.message}`);
                    }
                    else {
                        console.error(`Unknown error: ${JSON.stringify(error)}`);
                    }
                    // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                    return undefined;
                }
                else {
                    console.error(`Unknown error inside dataCommandRepository.deleteBlog: ${JSON.stringify(error)}`);
                    throw new Error('Placeholder for an error to be rethrown and dealt with in the future in deleteBlog method of dataCommandRepository');
                }
            }
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
    createNewPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongodb_1.ObjectId.isValid(newPost.blogId)) {
                    const relatedBlogger = yield findBlogByPrimaryKey(new mongodb_1.ObjectId(newPost.blogId));
                    const tempId = new mongodb_1.ObjectId();
                    if (relatedBlogger) {
                        const newPostEntry = Object.assign(Object.assign({ _id: tempId, id: tempId.toString() }, newPost), { blogName: relatedBlogger.name, createdAt: new Date() });
                        const result = yield mongo_db_1.postsCollection.insertOne(newPostEntry);
                        if (!result.acknowledged) {
                            throw new custom_error_class_1.CustomError({
                                errorMessage: { field: 'postsCollection.insertOne(newPostEntry)', message: 'attempt to insert new post entry failed' }
                            });
                        }
                        return result.insertedId.toString();
                        // return mapSinglePostCollectionToViewModel(newPostEntry);
                    }
                    else {
                        throw new custom_error_class_1.CustomError({
                            errorMessage: { field: 'findBlogByPrimaryKey(new ObjectId(newPost.blogId))', message: 'attempt to find blogger failed' }
                        });
                    }
                }
                else {
                    throw new custom_error_class_1.CustomError({
                        errorMessage: { field: 'ObjectId.isValid(newPost.blogId)', message: 'invalid blogId' }
                    });
                }
            }
            catch (error) {
                if (error instanceof custom_error_class_1.CustomError) {
                    if (error.metaData) {
                        const errorData = error.metaData.errorMessage;
                        console.error(`In field: ${errorData.field} - ${errorData.message}`);
                    }
                    else {
                        console.error(`Unknown error: ${JSON.stringify(error)}`);
                    }
                    // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                    return undefined;
                }
                else {
                    console.error(`Unknown error inside dataCommandRepository.createNewPost: ${JSON.stringify(error)}`);
                    throw new Error('Placeholder for an error to be rethrown and dealt with in the future in createNewPost method of dataCommandRepository');
                }
            }
        });
    },
    createNewBlogPost(sentBlogId, newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongodb_1.ObjectId.isValid(sentBlogId)) {
                    const relatedBlogger = yield findBlogByPrimaryKey(new mongodb_1.ObjectId(sentBlogId));
                    const tempId = new mongodb_1.ObjectId();
                    if (relatedBlogger) {
                        const newPostEntry = Object.assign(Object.assign({ _id: tempId, id: tempId.toString() }, newPost), { blogId: sentBlogId, blogName: relatedBlogger.name, createdAt: new Date() });
                        const result = yield mongo_db_1.postsCollection.insertOne(newPostEntry);
                        if (!result.acknowledged) {
                            throw new custom_error_class_1.CustomError({
                                errorMessage: { field: 'postsCollection.insertOne(newPostEntry)', message: 'attempt to insert new post entry failed' }
                            });
                        }
                        return result.insertedId.toString();
                    }
                }
            }
            catch (error) {
                if (error instanceof custom_error_class_1.CustomError) {
                    if (error.metaData) {
                        const errorData = error.metaData.errorMessage;
                        console.error(`In field: ${errorData.field} - ${errorData.message}`);
                    }
                    else {
                        console.error(`Unknown error: ${JSON.stringify(error)}`);
                    }
                    // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                    return undefined;
                }
                else {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                    throw new Error('Placeholder for an error to be rethrown and dealt with in the future in createNewBlogPost method of dataCommandRepository');
                }
            }
        });
    },
    updatePost(postId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongodb_1.ObjectId.isValid(postId)) {
                    const idToCheck = new mongodb_1.ObjectId(postId);
                    const res = yield mongo_db_1.postsCollection.updateOne({ _id: idToCheck }, { $set: Object.assign({}, newData) });
                    if (!res.acknowledged) {
                        throw new custom_error_class_1.CustomError({
                            errorMessage: { field: 'postsCollection.updateOne', message: 'attempt to update post entry failed' }
                        });
                    }
                    if (res.matchedCount === 1) {
                        // успешное выполнение
                        return null;
                    }
                }
                else {
                    throw new custom_error_class_1.CustomError({
                        errorMessage: { field: 'ObjectId.isValid(postId)', message: 'invalid post ID' }
                    });
                }
            }
            catch (error) {
                if (error instanceof custom_error_class_1.CustomError) {
                    if (error.metaData) {
                        const errorData = error.metaData.errorMessage;
                        console.error(`In field: ${errorData.field} - ${errorData.message}`);
                    }
                    else {
                        console.error(`Unknown error: ${JSON.stringify(error)}`);
                    }
                    // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                    return undefined;
                }
                else {
                    console.error(`Unknown error inside dataCommandRepository.updatePost: ${JSON.stringify(error)}`);
                    throw new Error('Placeholder for an error to be rethrown and dealt with in the future in updatePost method of dataCommandRepository');
                }
            }
        });
    },
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (ObjectId.isValid(postId)) {
            //     const idToCheck = new ObjectId(postId);
            //     const res = await postsCollection.deleteOne({_id: idToCheck});
            //
            //     if(res.deletedCount === 1)
            //     {
            //         return null;
            //     }
            // }
            try {
                if (mongodb_1.ObjectId.isValid(postId)) {
                    const idToCheck = new mongodb_1.ObjectId(postId);
                    const res = yield mongo_db_1.postsCollection.deleteOne({ _id: idToCheck });
                    if (!res.acknowledged) {
                        throw new custom_error_class_1.CustomError({
                            errorMessage: { field: 'postsCollection.deleteOne', message: 'attempt to delete post entry failed' }
                        });
                    }
                    if (res.deletedCount === 1) {
                        return null;
                    }
                }
                else {
                    throw new custom_error_class_1.CustomError({
                        errorMessage: { field: 'ObjectId.isValid(postId)', message: 'invalid post ID' }
                    });
                }
            }
            catch (error) {
                if (error instanceof custom_error_class_1.CustomError) {
                    if (error.metaData) {
                        const errorData = error.metaData.errorMessage;
                        console.error(`In field: ${errorData.field} - ${errorData.message}`);
                    }
                    else {
                        console.error(`Unknown error: ${JSON.stringify(error)}`);
                    }
                    // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                    return undefined;
                }
                else {
                    console.error(`Unknown error inside dataCommandRepository.deletePost: ${JSON.stringify(error)}`);
                    throw new Error('Placeholder for an error to be rethrown and dealt with in the future in deletePost method of dataCommandRepository');
                }
            }
        });
    },
    // *****************************
    // методы для управления юзерами
    // *****************************
    createNewUser(sentNewUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordHash = yield bcypt_1.bcryptService.generateHash(sentNewUser.password);
                const tempId = new mongodb_1.ObjectId();
                const newUserEntry = {
                    _id: tempId,
                    id: tempId.toString(),
                    login: sentNewUser.login,
                    email: sentNewUser.email,
                    passwordHash: passwordHash,
                    createdAt: new Date(),
                };
                console.log(JSON.stringify(newUserEntry));
                const result = yield mongo_db_1.usersCollection.insertOne(newUserEntry);
                if (!result.acknowledged) {
                    throw new custom_error_class_1.CustomError({
                        errorMessage: { field: 'usersCollection.insertOne(newUserEntry)', message: 'attempt to insert new user entry failed' }
                    });
                }
                // console.log(JSON.stringify(newUserEntry));
                // return mapSingleBloggerCollectionToViewModel(newBlogEntry);
                return result.insertedId.toString();
            }
            catch (error) {
                if (error instanceof custom_error_class_1.CustomError) {
                    if (error.metaData) {
                        const errorData = error.metaData.errorMessage;
                        console.error(`In field: ${errorData.field} - ${errorData.message}`);
                    }
                    else {
                        console.error(`Unknown error: ${JSON.stringify(error)}`);
                    }
                    return undefined;
                }
                else {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                    throw new Error('Placeholder for an error to be rethrown and dealt with in the future in createNewUser method of dataCommandRepository');
                }
            }
        });
    },
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongodb_1.ObjectId.isValid(userId)) {
                    const idToCheck = new mongodb_1.ObjectId(userId);
                    const res = yield mongo_db_1.usersCollection.deleteOne({ _id: idToCheck });
                    if (!res.acknowledged) {
                        throw new custom_error_class_1.CustomError({
                            errorMessage: { field: 'usersCollection.deleteOne', message: 'attempt to delete user entry failed' }
                        });
                    }
                    if (res.deletedCount === 1) {
                        return null;
                    }
                }
                else {
                    throw new custom_error_class_1.CustomError({
                        errorMessage: { field: 'ObjectId.isValid(userId)', message: 'invalid user ID' }
                    });
                }
            }
            catch (error) {
                if (error instanceof custom_error_class_1.CustomError) {
                    if (error.metaData) {
                        const errorData = error.metaData.errorMessage;
                        console.error(`In field: ${errorData.field} - ${errorData.message}`);
                    }
                    else {
                        console.error(`Unknown error: ${JSON.stringify(error)}`);
                    }
                    // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                    return undefined;
                }
                else {
                    console.error(`Unknown error inside dataCommandRepository.deleteUser: ${JSON.stringify(error)}`);
                    throw new Error('Placeholder for an error to be rethrown and dealt with in the future in deleteUser method of dataCommandRepository');
                }
            }
        });
    },
    // *****************************
    // методы для тестов
    // *****************************
    deleteAllBloggers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_db_1.bloggersCollection.deleteMany({});
            yield mongo_db_1.postsCollection.deleteMany({});
            yield mongo_db_1.usersCollection.deleteMany({});
        });
    },
};
