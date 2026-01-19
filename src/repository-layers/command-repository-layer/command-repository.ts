import {BlogInputModel} from "../../routers/router-types/blog-input-model";
import {PostViewModel} from "../../routers/router-types/post-view-model";
import {PostInputModel} from "../../routers/router-types/post-input-model";
import {bloggersCollection, postsCollection, usersCollection} from "../../db/mongo.db";
import {ObjectId} from "mongodb";
import {BlogPostInputModel} from "../../routers/router-types/blog-post-input-model";
import {CustomError} from "../utility/custom-error-class";
import {UserInputModel} from "../../routers/router-types/user-input-model";
import {UserViewModel} from "../../routers/router-types/user-view-model";
import {bcryptService} from "../../authentication/bcypt";
import {UserCollectionStorageModel} from "../../routers/router-types/user-storage-model";


export type bloggerCollectionStorageModel= {
    _id: ObjectId,
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: Date;
    isMembership: boolean;
};

export type postCollectionStorageModel = {
    _id: ObjectId,
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: Date;
};

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

async function findBlogByPrimaryKey(id: ObjectId): Promise<bloggerCollectionStorageModel | null> {
    return bloggersCollection.findOne({ _id: id });
}


async function findPostByPrimaryKey(id: ObjectId): Promise<postCollectionStorageModel | null> {
    return postsCollection.findOne({ _id: id });
}


export const dataCommandRepository = {
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


    async createNewBlog(newBlog: BlogInputModel): Promise <string | undefined> {
        try {
            const tempId = new ObjectId();
            const newBlogEntry = {
                _id: tempId,
                id: tempId.toString(),
                ...newBlog,
                createdAt: new Date(),
                isMembership: false
            } as bloggerCollectionStorageModel;


            const result = await bloggersCollection.insertOne(newBlogEntry);

            if (!result.acknowledged)
            {
                throw new CustomError({
                    errorMessage: { field: 'bloggersCollection.insertOne(newBlogEntry)', message: 'attempt to insert new blog entry failed' }
                });
            }

            // return mapSingleBloggerCollectionToViewModel(newBlogEntry);
            return result.insertedId.toString();
        }
        catch (error) {
            if(error instanceof CustomError) {
                if(error.metaData)
                {
                    const errorData = error.metaData.errorMessage;
                    console.error(`In field: ${errorData.field} - ${errorData.message}`);
                }
                else
                {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                }

                // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                return undefined;
            }
            else
            {
                console.error(`Unknown error: ${JSON.stringify(error)}`);
                throw new Error('Placeholder for an error to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
            }
        }
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


    async updateBlog(blogId: string, newData: BlogInputModel): Promise<null | undefined> {

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


        try{
            if (ObjectId.isValid(blogId)) {

                const idToCheck = new ObjectId(blogId);
                const res = await bloggersCollection.updateOne(
                    {_id: idToCheck},
                    {$set: {...newData}}
                );

                if(!res.acknowledged)
                {
                    throw new CustomError({
                        errorMessage: { field: 'bloggersCollection.updateOne', message: 'attempt to update blog entry failed' }
                    });
                }

                if(res.matchedCount === 1)
                {
                    // успешное выполнение
                    return null;
                }
            }
            else {
                throw new CustomError({
                    errorMessage: { field: 'ObjectId.isValid(blogId)', message: 'invalid blog ID' }
                });
            }
        }
        catch (error) {
            if(error instanceof CustomError) {
                if(error.metaData)
                {
                    const errorData = error.metaData.errorMessage;
                    console.error(`In field: ${errorData.field} - ${errorData.message}`);
                }
                else
                {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                }

                return undefined;
            }
            else
            {
                console.error(`Unknown error inside dataCommandRepository.updateBlog: ${JSON.stringify(error)}`);
                throw new Error('Placeholder for an error to be rethrown and dealt with in the future in updateBlog method of dataCommandRepository');
            }
        }
    },


    async deleteBlog(blogId: string): Promise<null | undefined> {

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

        try{
            if (ObjectId.isValid(blogId)) {
                const idToCheck = new ObjectId(blogId);
                const res = await bloggersCollection.deleteOne({_id: idToCheck});

                if(!res.acknowledged)
                {
                    throw new CustomError({
                        errorMessage: { field: 'bloggersCollection.deleteOne', message: 'attempt to delete blog entry failed' }
                    });
                }

                if(res.deletedCount === 1)
                {
                    return null;
                }
            }
            else {
                // throw new CustomError({
                //     errorMessage: { field: 'ObjectId.isValid(blogId)', message: 'invalid blog ID' }
                // });
                return undefined;
            }
        }
        catch (error) {
            if(error instanceof CustomError) {
                if(error.metaData)
                {
                    const errorData = error.metaData.errorMessage;
                    console.error(`In field: ${errorData.field} - ${errorData.message}`);
                }
                else
                {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                }

                // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                return undefined;
            }
            else
            {
                console.error(`Unknown error inside dataCommandRepository.deleteBlog: ${JSON.stringify(error)}`);
                throw new Error('Placeholder for an error to be rethrown and dealt with in the future in deleteBlog method of dataCommandRepository');
            }
        }
    },

    // *****************************
    // методы для управления постами
    // *****************************
    async getAllPosts(): Promise <PostViewModel[] | []> {
        // return __nonDisclosableDatabase.bloggerRepository.flatMap((element: bloggerRawData):PostViewModel[] | [] => (element.bloggerPosts ?? []));

        const tempContainer: postCollectionStorageModel[] | []  = await postsCollection.find({}).toArray();

        // console.log('LOOK HERE ---->', tempContainer.length);

        return tempContainer.map((value: postCollectionStorageModel) => ({
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
    },


    async createNewPost(newPost: PostInputModel): Promise<string | undefined> {
        try {
            if (ObjectId.isValid(newPost.blogId))
            {
                const relatedBlogger = await findBlogByPrimaryKey(new ObjectId(newPost.blogId));
                const tempId = new ObjectId();

                if (relatedBlogger){
                    const newPostEntry = {
                        _id: tempId,
                        id: tempId.toString(),
                        ...newPost,
                        blogName: relatedBlogger.name,
                        createdAt: new Date()
                    } as postCollectionStorageModel;

                    const result = await postsCollection.insertOne(newPostEntry);
                    if (!result.acknowledged)
                    {
                        throw new CustomError({
                            errorMessage: { field: 'postsCollection.insertOne(newPostEntry)', message: 'attempt to insert new post entry failed' }
                        });
                    }

                    return result.insertedId.toString();
                    // return mapSinglePostCollectionToViewModel(newPostEntry);
                }
                else
                {
                    throw new CustomError({
                        errorMessage: { field: 'findBlogByPrimaryKey(new ObjectId(newPost.blogId))', message: 'attempt to find blogger failed' }
                    });
                }
            }
            else{
                throw new CustomError({
                    errorMessage: { field: 'ObjectId.isValid(newPost.blogId)', message: 'invalid blogId' }
                });
            }
        }
        catch (error) {
            if(error instanceof CustomError) {
                if(error.metaData)
                {
                    const errorData = error.metaData.errorMessage;
                    console.error(`In field: ${errorData.field} - ${errorData.message}`);
                }
                else
                {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                }

                // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                return undefined;
            }
            else
            {
                console.error(`Unknown error inside dataCommandRepository.createNewPost: ${JSON.stringify(error)}`);
                throw new Error('Placeholder for an error to be rethrown and dealt with in the future in createNewPost method of dataCommandRepository');
            }
        }
    },


    async createNewBlogPost(sentBlogId: string, newPost: BlogPostInputModel): Promise<string | undefined> {
        try {

            if (ObjectId.isValid(sentBlogId))
            {
                const relatedBlogger = await findBlogByPrimaryKey(new ObjectId(sentBlogId));
                const tempId = new ObjectId();

                if (relatedBlogger){
                    const newPostEntry = {
                        _id: tempId,
                        id: tempId.toString(),
                        ...newPost,
                        blogId: sentBlogId,
                        blogName: relatedBlogger.name,
                        createdAt: new Date()
                    } as postCollectionStorageModel;

                    const result = await postsCollection.insertOne(newPostEntry);
                    if (!result.acknowledged)
                    {
                        throw new CustomError({
                            errorMessage: { field: 'postsCollection.insertOne(newPostEntry)', message: 'attempt to insert new post entry failed' }
                        });
                    }

                    return result.insertedId.toString();
                }
            }
        }
        catch (error) {
            if(error instanceof CustomError) {
                if(error.metaData)
                {
                    const errorData = error.metaData.errorMessage;
                    console.error(`In field: ${errorData.field} - ${errorData.message}`);
                }
                else
                {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                }

                // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                return undefined;
            }
            else
            {
                console.error(`Unknown error: ${JSON.stringify(error)}`);
                throw new Error('Placeholder for an error to be rethrown and dealt with in the future in createNewBlogPost method of dataCommandRepository');
            }
        }
    },


    async updatePost(postId: string, newData: PostInputModel): Promise<null | undefined> {
        try{
            if (ObjectId.isValid(postId)) {

                const idToCheck = new ObjectId(postId);
                const res = await postsCollection.updateOne(
                    {_id: idToCheck},
                    {$set: {...newData}}
                );

                if(!res.acknowledged)
                {
                    throw new CustomError({
                        errorMessage: { field: 'postsCollection.updateOne', message: 'attempt to update post entry failed' }
                    });
                }

                if(res.matchedCount === 1)
                {
                    // успешное выполнение
                    return null;
                }
            }
            else {
                throw new CustomError({
                    errorMessage: { field: 'ObjectId.isValid(postId)', message: 'invalid post ID' }
                });
            }
        }
        catch (error) {
            if(error instanceof CustomError) {
                if(error.metaData)
                {
                    const errorData = error.metaData.errorMessage;
                    console.error(`In field: ${errorData.field} - ${errorData.message}`);
                }
                else
                {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                }

                // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                return undefined;
            }
            else
            {
                console.error(`Unknown error inside dataCommandRepository.updatePost: ${JSON.stringify(error)}`);
                throw new Error('Placeholder for an error to be rethrown and dealt with in the future in updatePost method of dataCommandRepository');
            }
        }
    },


    async deletePost(postId: string): Promise<null | undefined> {

        // if (ObjectId.isValid(postId)) {
        //     const idToCheck = new ObjectId(postId);
        //     const res = await postsCollection.deleteOne({_id: idToCheck});
        //
        //     if(res.deletedCount === 1)
        //     {
        //         return null;
        //     }
        // }

        try{
            if (ObjectId.isValid(postId)) {
                const idToCheck = new ObjectId(postId);
                const res = await postsCollection.deleteOne({_id: idToCheck});

                if(!res.acknowledged)
                {
                    throw new CustomError({
                        errorMessage: { field: 'postsCollection.deleteOne', message: 'attempt to delete post entry failed' }
                    });
                }

                if(res.deletedCount === 1)
                {
                    return null;
                }
            }
            else {
                throw new CustomError({
                    errorMessage: { field: 'ObjectId.isValid(postId)', message: 'invalid post ID' }
                });
            }
        }
        catch (error) {
            if(error instanceof CustomError) {
                if(error.metaData)
                {
                    const errorData = error.metaData.errorMessage;
                    console.error(`In field: ${errorData.field} - ${errorData.message}`);
                }
                else
                {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                }

                // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                return undefined;
            }
            else
            {
                console.error(`Unknown error inside dataCommandRepository.deletePost: ${JSON.stringify(error)}`);
                throw new Error('Placeholder for an error to be rethrown and dealt with in the future in deletePost method of dataCommandRepository');
            }
        }
    },


    // *****************************
    // методы для управления юзерами
    // *****************************

    async createNewUser(sentNewUser: UserInputModel): Promise<string | undefined> {
        try {
            const passwordHash = await bcryptService.generateHash(sentNewUser.password);

            const tempId = new ObjectId();
            const newUserEntry = {
                _id: tempId,
                id: tempId.toString(),
                login: sentNewUser.login,
                email: sentNewUser.email,
                passwordHash: passwordHash,
                createdAt: new Date(),
            } as UserCollectionStorageModel;

            // console.log(JSON.stringify(newUserEntry));

            const result = await usersCollection.insertOne(newUserEntry);

            if (!result.acknowledged)
            {
                throw new CustomError({
                    errorMessage: { field: 'usersCollection.insertOne(newUserEntry)', message: 'attempt to insert new user entry failed' }
                });
            }
            // console.log(JSON.stringify(newUserEntry));
            // return mapSingleBloggerCollectionToViewModel(newBlogEntry);
            return result.insertedId.toString();
        }
        catch (error) {
            if(error instanceof CustomError) {
                if(error.metaData)
                {
                    const errorData = error.metaData.errorMessage;
                    console.error(`In field: ${errorData.field} - ${errorData.message}`);
                }
                else
                {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                }

                return undefined;
            }
            else
            {
                console.error(`Unknown error: ${JSON.stringify(error)}`);
                throw new Error('Placeholder for an error to be rethrown and dealt with in the future in createNewUser method of dataCommandRepository');
            }
        }
    },


    async deleteUser(userId: string): Promise<null | undefined> {

        try{
            if (ObjectId.isValid(userId)) {
                const idToCheck = new ObjectId(userId);
                const res = await usersCollection.deleteOne({_id: idToCheck});

                if(!res.acknowledged)
                {
                    throw new CustomError({
                        errorMessage: { field: 'usersCollection.deleteOne', message: 'attempt to delete user entry failed' }
                    });
                }

                if(res.deletedCount === 1)
                {
                    return null;
                }
            }
            else {
                // throw new CustomError({
                //     errorMessage: { field: 'ObjectId.isValid(userId)', message: 'invalid user ID' }
                // });

                return undefined;
            }
        }
        catch (error) {
            if(error instanceof CustomError) {
                if(error.metaData)
                {
                    const errorData = error.metaData.errorMessage;
                    console.error(`In field: ${errorData.field} - ${errorData.message}`);
                }
                else
                {
                    console.error(`Unknown error: ${JSON.stringify(error)}`);
                }

                // throw new Error('Placeholder for an error in to be rethrown and dealt with in the future in createNewBlog method of dataCommandRepository');
                return undefined;
            }
            else
            {
                console.error(`Unknown error inside dataCommandRepository.deleteUser: ${JSON.stringify(error)}`);
                throw new Error('Placeholder for an error to be rethrown and dealt with in the future in deleteUser method of dataCommandRepository');
            }
        }
    },


    // *****************************
    // методы для тестов
    // *****************************
    async deleteAllBloggers() {
        await bloggersCollection.deleteMany({});
        await postsCollection.deleteMany({});
        await usersCollection.deleteMany({});
    },

}