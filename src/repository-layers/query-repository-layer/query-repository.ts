import {PaginatedBlogViewModel} from "../../routers/router-types/blog-paginated-view-model";
import {InputGetBlogsQuery} from "../../routers/router-types/blog-search-input-model";
import {bloggersCollection, postsCollection} from "../../db/mongo.db";
import {mapToBlogListPaginatedOutput, mapToPostListPaginatedOutput} from "../mappers/map-blog-search-to-view-model";
import {InputGetBlogPostsByIdQuery} from "../../routers/router-types/blog-search-by-id-input-model";
import {ObjectId, WithId} from "mongodb";
import {PostViewModel} from "../../routers/router-types/post-view-model";
import {PaginatedPostViewModel} from "../../routers/router-types/post-paginated-view-model";
import {BlogViewModel} from "../../routers/router-types/blog-view-model";
import {
    bloggerCollectionStorageModel,
    postCollectionStorageModel
} from "../command-repository-layer/command-repository";
import {mapSingleBloggerCollectionToViewModel} from "../mappers/map-to-BlogViewModel";



async function findBlogByPrimaryKey(id: ObjectId): Promise<bloggerCollectionStorageModel | null> {
    return bloggersCollection.findOne({ _id: id });
}


async function findPostByPrimaryKey(id: ObjectId): Promise<postCollectionStorageModel | null> {
    return postsCollection.findOne({ _id: id });
}


export const dataQueryRepository = {

    async getSeveralBlogs(sentInputGetBlogsQuery: InputGetBlogsQuery) : Promise<PaginatedBlogViewModel> {
        const {
            searchNameTerm,
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
        } = sentInputGetBlogsQuery;

        let filter :any = {};
        const skip = (pageNumber - 1) * pageSize;

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

        return mapToBlogListPaginatedOutput(items, {
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalCount,
        });
    },


    async getSeveralPostsById(sentBlogId:string, sentSanitizedQuery: InputGetBlogPostsByIdQuery) : Promise<PaginatedPostViewModel> {
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

        return mapToPostListPaginatedOutput(items, {
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalCount,
        });
    },


    async findSingleBlog(blogId: string): Promise<BlogViewModel | undefined> {

        if (ObjectId.isValid(blogId)) {

            const blogger: bloggerCollectionStorageModel | null = await findBlogByPrimaryKey(new ObjectId(blogId));

            if(blogger)
            {
                return mapSingleBloggerCollectionToViewModel(blogger);
            }
        }

        return undefined;
    },
}