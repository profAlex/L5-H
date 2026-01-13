import {Request, Response} from "express";
import {HttpStatus} from "../util-enums/http-statuses";
import {dataCommandRepository} from "../../repository-layers/command-repository-layer/command-repository";
import {blogsService} from "../../service-layer(BLL)/blogs-service";
import {InputGetBlogsQuery} from "../router-types/blog-search-input-model";
import {matchedData} from "express-validator";
import {PaginatedBlogViewModel} from "../router-types/blog-paginated-view-model";
import {BlogViewModel} from "../router-types/blog-view-model";
import {WithId} from "mongodb";
import {mapToBlogListPaginatedOutput, mapToPostListPaginatedOutput} from "../../repository-layers/mappers/map-blog-search-to-view-model";
import {InputGetBlogPostsByIdQuery} from "../router-types/blog-search-by-id-input-model";
import {postsService} from "../../service-layer(BLL)/posts-service";
import {dataQueryRepository} from "../../repository-layers/query-repository-layer/query-repository";


export const getSeveralBlogs = async (req: Request<{}, {}, {}, InputGetBlogsQuery>, res: Response) => {
    const sanitizedQuery = matchedData<InputGetBlogsQuery>(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)

    const driversListOutput = await dataQueryRepository.getSeveralBlogs(sanitizedQuery);

    res.status(HttpStatus.Ok).send(driversListOutput);
};


export const createNewBlog = async (req: Request, res: Response) => {

    const insertedId = await blogsService.createNewBlog(req.body);

    if(insertedId){
        // здесь идем в query repo с айдишником который нам вернул command repo

    }

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

    const postListOutput = await dataQueryRepository.getSeveralPostsById(blogId, sanitizedQuery);

    res.status(HttpStatus.Ok).send(postListOutput);
};


export const createNewBlogPost= async (req:Request, res:Response) => {
    const result = await blogsService.createNewBlogPost(req.params.blogId, req.body)

    res.status(HttpStatus.Created).json(result);
};


export const findSingleBlog = async (req: Request, res: Response) => {
    const result = await dataQueryRepository.findSingleBlog(req.params.id);

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