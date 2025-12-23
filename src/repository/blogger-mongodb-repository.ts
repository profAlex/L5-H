import {BlogViewModel} from "../routers/router-types/blog-view-model";
import {BlogInputModel} from "../routers/router-types/blog-input-model";
import {PostViewModel} from "../routers/router-types/post-view-model";
import {PostInputModel} from "../routers/router-types/post-input-model";
import {bloggersCollection, postsCollection} from "../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {InputGetBlogsQuery} from "../routers/router-types/blog-search-input-model";
import {InputGetBlogPostsByIdQuery} from "../routers/router-types/blog-search-by-id-input-model";
import {BlogPostInputModel} from "../routers/router-types/blog-post-input-model";


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
    const random = Math.random().toString().substring(2,5);
    return `${timestamp}-${random}`;
};

const transformSingleBloggerCollectionToViewModel = (blogInContainer: bloggerCollectionStorageModel) => {
    return {
        id: blogInContainer._id.toString(),
        name: blogInContainer.name,
        description: blogInContainer.description,
        websiteUrl: blogInContainer.websiteUrl,
        createdAt: blogInContainer.createdAt,
        isMembership: false // был false
    } as BlogViewModel;
};

const transformSinglePostCollectionToViewModel = (postInContainer: postCollectionStorageModel) => {
    return {
        id: postInContainer._id.toString(),
        title: postInContainer.title,
        shortDescription: postInContainer.shortDescription,
        content: postInContainer.content,
        blogId: postInContainer.blogId,
        blogName: postInContainer.blogName,
        createdAt: postInContainer.createdAt
    } as PostViewModel;
};


async function findBlogByPrimaryKey(id: ObjectId): Promise<bloggerCollectionStorageModel | null> {
    return bloggersCollection.findOne({ _id: id });
}


async function findPostByPrimaryKey(id: ObjectId): Promise<postCollectionStorageModel | null> {
    return postsCollection.findOne({ _id: id });
}


export const dataRepository = {
    // *****************************
    // методы для управления блогами
    // *****************************
    async getSeveralBlogs(sentInputGetBlogsQuery: InputGetBlogsQuery) : Promise<{items: WithId<BlogViewModel>[]; totalCount: number}> {
        const {
            searchNameTerm,
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
        } = sentInputGetBlogsQuery;

        let filter :any = {};
        const skip = (pageNumber - 1) * pageSize;

        // _id: ObjectId,
        // id: string;
        // name: string;
        // description: string;
        // websiteUrl: string;
        // createdAt: Date;
        // isMembership: boolean;

        try{

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
        catch(err){
            console.error("ERROR: ", err)
        }

        if(!sortBy) {
            console.error("ERROR: sortBy is null or undefined inside dataRepository.getSeveralBlogs");
            throw new Error();
        }

        const items = await bloggersCollection
            .find(filter)

            // "asc" (по возрастанию), то используется 1
            // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
            .sort({[sortBy]: sortDirection})

            // пропускаем определённое количество документов перед тем, как вернуть нужный набор данных.
            .skip(skip)

            // ограничивает количество возвращаемых документов до значения pageSize
            .limit(pageSize)
            .toArray();

        const totalCount = await bloggersCollection.countDocuments(filter);

        return {items, totalCount};
    },


    async createNewBlog(newBlog: BlogInputModel): Promise <BlogViewModel> {
        const tempId = new ObjectId();
        const newBlogEntry = {
            _id: tempId,
            id: tempId.toString(),
            ...newBlog,
            createdAt: new Date(),
            isMembership: false
        } as bloggerCollectionStorageModel;

        await bloggersCollection.insertOne(newBlogEntry);

        return transformSingleBloggerCollectionToViewModel(newBlogEntry);
    },


    async getSeveralPostsById(sentBlogId:string, sentSanitizedQuery: InputGetBlogPostsByIdQuery) : Promise<{items: WithId<PostViewModel>[]; totalCount: number}> {
        const {
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
        } = sentSanitizedQuery;

        const skip = (pageNumber - 1) * pageSize;

        if(!sortBy) {
            console.error("ERROR: sortBy is null or undefined inside dataRepository.getSeveralPostsById");
            throw new Error();
        }

        const items = await postsCollection
            .find({blogId: sentBlogId})

            // "asc" (по возрастанию), то используется 1
            // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
            .sort({[sortBy]: sortDirection})

            // пропускаем определённое количество док. перед тем, как вернуть нужный набор данных.
            .skip(skip)

            // ограничивает количество возвращаемых документов до значения pageSize
            .limit(pageSize)
            .toArray();

        const totalCount = await postsCollection.countDocuments({blogId: sentBlogId});

        return {items, totalCount};
    },


    async findSingleBlog(blogId: string): Promise<BlogViewModel | undefined> {

        if (ObjectId.isValid(blogId)) {

            const blogger: bloggerCollectionStorageModel | null = await findBlogByPrimaryKey(new ObjectId(blogId));

            if(blogger)
            {
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
    },


    async updateBlog(blogId: string, newData: BlogInputModel): Promise<null | undefined> {

        if (ObjectId.isValid(blogId)) {

            const idToCheck = new ObjectId(blogId);
            const res = await bloggersCollection.updateOne(
                {_id: idToCheck},
                {$set: {...newData}}
            );

            if(res.matchedCount === 1)
            {
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
    },


    async deleteBlog(blogId: string): Promise<null | undefined> {

        if (ObjectId.isValid(blogId)) {
            const idToCheck = new ObjectId(blogId);
            const res = await bloggersCollection.deleteOne({_id: idToCheck});



            if(res.deletedCount === 1)
            {
                await postsCollection.deleteMany({ blogId: blogId }); // Надо связанные посты удалять?????????????????
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


    async getSeveralPosts(sentSanitizedQuery: InputGetBlogPostsByIdQuery) : Promise<{items: WithId<PostViewModel>[]; totalCount: number}> {
        const {
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
        } = sentSanitizedQuery;

        const skip = (pageNumber - 1) * pageSize;

        if(!sortBy) {
            console.error("ERROR: sortBy is null or undefined inside dataRepository.getSeveralPosts");
            throw new Error();
        }

        const items = await postsCollection
            .find({})

            // "asc" (по возрастанию), то используется 1
            // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
            .sort({[sortBy]: sortDirection})

            // пропускаем определённое количество док. перед тем, как вернуть нужный набор данных.
            .skip(skip)

            // ограничивает количество возвращаемых документов до значения pageSize
            .limit(pageSize)
            .toArray();

        const totalCount = await postsCollection.countDocuments({});

        return {items, totalCount};
    },


    async createNewPost(newPost: PostInputModel): Promise<PostViewModel | undefined> {
        try {

            if (ObjectId.isValid(newPost.blogId))
            {
                const tempId = new ObjectId();
                const relatedBlogger = await this.findSingleBlog(newPost.blogId);

                if (relatedBlogger){
                    const newPostEntry = {
                        _id: tempId,
                        id: tempId.toString(),
                        ...newPost,
                        //blogId: newPost.blogId,
                        blogName: relatedBlogger.name,
                        createdAt: new Date()
                    } as postCollectionStorageModel;

                    await postsCollection.insertOne(newPostEntry);

                    return transformSinglePostCollectionToViewModel(newPostEntry);
                }
            }
        }
        catch(error) {
            console.error("Unknown error inside dataRepository.createNewPost: ", error);
            throw new Error("Unknown error inside dataRepository.createNewPost");
        }

        return undefined;

    },


    async createNewBlogPost(sentBlogId: string, newPost: BlogPostInputModel): Promise<PostViewModel | undefined> {
        try {

            if (ObjectId.isValid(sentBlogId))
            {
                const tempId = new ObjectId();
                const relatedBlogger = await this.findSingleBlog(sentBlogId);

                if (relatedBlogger){
                    const newPostEntry = {
                        _id: tempId,
                        id: tempId.toString(),
                        ...newPost,
                        blogId: sentBlogId,
                        blogName: relatedBlogger.name,
                        createdAt: new Date()
                    } as postCollectionStorageModel;

                    await postsCollection.insertOne(newPostEntry);

                    //const propertyCount = Object.keys(newPostEntry).length;
                    //console.log("LOOK HERE ------>", propertyCount);
                    return transformSinglePostCollectionToViewModel(newPostEntry);

                    // return test;

                }
            }
        }
        catch(error) {
            console.error("Unknown error inside dataRepository.createNewBlogPost: ", error);
            throw new Error("Unknown error inside dataRepository.createNewBlogPost");
        }

        return undefined;
    },


    async findSinglePost(postId: string): Promise<PostViewModel | undefined> {
        if (ObjectId.isValid(postId)) {

            //А если ключ существует надо ли делат проверку ша if(post) ?
            const post: postCollectionStorageModel | null = await findPostByPrimaryKey(new ObjectId(postId));

            if(post)
            {
                return transformSinglePostCollectionToViewModel(post);
            }
        }

        return undefined;
    },


    async updatePost(postId: string, newData: PostInputModel): Promise<null | undefined> {

        if (ObjectId.isValid(postId)) {

            const idToCheck = new ObjectId(postId);
            const res = await postsCollection.updateOne(
                {_id: idToCheck},
                {$set: {...newData}}
            );

            if(res.matchedCount === 1)
            {
                return null;
            }
        }
        return undefined;
    },


    async deletePost(postId: string): Promise<null | undefined> {

        if (ObjectId.isValid(postId)) {
            const idToCheck = new ObjectId(postId);
            const res = await postsCollection.deleteOne({_id: idToCheck});

            if(res.deletedCount === 1)
            {
                return null;
            }
        }

        return undefined;
    },


    // *****************************
    // методы для тестов
    // *****************************
    async deleteAllBloggers() {
        await bloggersCollection.deleteMany({});
        await postsCollection.deleteMany({});
    },

    async returnBloggersAmount() {
        return await bloggersCollection.countDocuments();
    }
}