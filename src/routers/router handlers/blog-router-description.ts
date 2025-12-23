import {Request, Response} from "express";
import {HttpStatus} from "../../core/http-statuses";
import {dataRepository} from "../../repository/blogger-mongodb-repository";
import {blogsService} from "../../service/blogs-service";
import {InputGetBlogsQuery} from "../router-types/blog-search-input-model";
import {matchedData} from "express-validator";
import {PaginatedBlogViewModel} from "../router-types/blog-paginated-view-model";
import {BlogViewModel} from "../router-types/blog-view-model";
import {WithId} from "mongodb";
import {mapToBlogListPaginatedOutput, mapToPostListPaginatedOutput} from "../mappers/map-blog-search-to-view-model";
import {InputGetBlogPostsByIdQuery} from "../router-types/blog-search-by-id-input-model";
import {postsService} from "../../service/posts-service";


export const getSeveralBlogs = async (req: Request<{}, {}, {}, InputGetBlogsQuery>, res: Response) => {
    const sanitizedQuery = matchedData<InputGetBlogsQuery>(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)

    const {items, totalCount} = await blogsService.getSeveralBlogs(sanitizedQuery);

    const driversListOutput = mapToBlogListPaginatedOutput(items, {
        pageNumber: sanitizedQuery.pageNumber,
        pageSize: sanitizedQuery.pageSize,
        totalCount,
    });

    res.status(HttpStatus.Ok).send(driversListOutput);
};


export const createNewBlog = async (req: Request, res: Response) => {
    res.status(HttpStatus.Created).json(await blogsService.createNewBlog(req.body));
};



export const getSeveralPostsFromBlog = async (req: Request<{blogId: string}, {}, {}, InputGetBlogPostsByIdQuery>, res: Response) => {
    const sanitizedQuery = matchedData<InputGetBlogPostsByIdQuery>(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)

    const blogId = req.params.blogId;
    if (!blogId) {
        res.status(400).json({ error: 'blogId is required' });
    }

    // console.log('<------------ HAVE WE GOT HERE????');
    // console.log(sanitizedQuery);
    // console.log(blogId);


    const {items, totalCount} = await blogsService.getAllPostsFromBlog(blogId, sanitizedQuery);

    const postListOutput = mapToPostListPaginatedOutput(items, {
        pageNumber: sanitizedQuery.pageNumber,
        pageSize: sanitizedQuery.pageSize,
        totalCount,
    });

    res.status(HttpStatus.Ok).send(postListOutput);
};


export const createNewBlogPost= async (req:Request, res:Response) => {
    const result = await blogsService.createNewBlogPost(req.params.blogId, req.body)

    // if(result === undefined)
    // {
    //     // res.sendStatus(HttpStatus.NotFound);
    //
    //     res.status(HttpStatus.Created).json({ errorsMessages: "this is what ive been trying to find" });
    //
    //     throw new Error(`couldn't create new post inside postsService.createNewPost`);
    // }

    res.status(HttpStatus.Created).json(result);
};


export const findSingleBlog = async (req: Request, res: Response) => {
    const result = await blogsService.findSingleBlog(req.params.id);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.status(HttpStatus.Ok).json(result);
};

export const updateBlog = async (req: Request, res: Response) => {
    const result = await blogsService.updateBlog(req.params.id, req.body);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.sendStatus(HttpStatus.NoContent);
};

export const deleteBlog = async (req: Request, res: Response) => {
    const result = await blogsService.deleteBlog(req.params.id);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.sendStatus(HttpStatus.NoContent);
};