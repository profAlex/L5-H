import {BlogViewModel} from "../router-types/blog-view-model";
import {WithId} from "mongodb";
import {PaginatedBlogViewModel} from "../router-types/blog-paginated-view-model";
import {PostViewModel} from "../router-types/post-view-model";
import {PaginatedPostViewModel} from "../router-types/post-paginated-view-model";


export function mapToBlogListPaginatedOutput(
    blogs: WithId<BlogViewModel>[],
    metaData: { pageNumber: number; pageSize: number; totalCount: number },
): PaginatedBlogViewModel {
    return {
        pagesCount: Math.ceil(metaData.totalCount / metaData.pageSize),
        page: metaData.pageNumber,
        pageSize: metaData.pageSize,
        totalCount: metaData.totalCount,

        items: blogs.map(
            (blog): BlogViewModel => ({
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership,
            }),
        ),
    };
}


export function mapToPostListPaginatedOutput(
    posts: WithId<PostViewModel>[],
    metaData: { pageNumber: number; pageSize: number; totalCount: number },
): PaginatedPostViewModel {
    return {
        pagesCount: Math.ceil(metaData.totalCount / metaData.pageSize),
        page: metaData.pageNumber,
        pageSize: metaData.pageSize,
        totalCount: metaData.totalCount,

        items: posts.map(
            (post): PostViewModel => ({
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt,
            }),
        ),
    };
}