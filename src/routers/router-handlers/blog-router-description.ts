import {Request, Response} from "express";
import {HttpStatus} from "../util-enums/http-statuses";
import {blogsService} from "../../service-layer(BLL)/blogs-service";
import {InputGetBlogsQuery} from "../router-types/blog-search-input-model";
import {matchedData} from "express-validator";
import {InputGetBlogPostsByIdQuery} from "../router-types/blog-search-by-id-input-model";
import {dataQueryRepository} from "../../repository-layers/query-repository-layer/query-repository";


export const getSeveralBlogs = async (req: Request<{}, {}, {}, InputGetBlogsQuery>, res: Response) => {

    const sanitizedQuery = matchedData<InputGetBlogsQuery>(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)

    const driversListOutput = await dataQueryRepository.getSeveralBlogs(sanitizedQuery);

    res.status(HttpStatus.Ok).send(driversListOutput);
    return;
};


export const createNewBlog = async (req: Request, res: Response) => {

    const insertedId = await blogsService.createNewBlog(req.body);

    if(insertedId){
        // а вот здесь уже идем в query repo с айдишником который нам вернул command repo
        const result = await dataQueryRepository.findSingleBlog(insertedId);

        if(result){
            res.status(HttpStatus.Created).json(result);
            return;
        }
    }

    res.status(HttpStatus.InternalServerError).send('Unknown error while attempting to create new blog or couldn\'t return created blog from Query Database.');
    return;
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
    return;
};


export const createNewBlogPost= async (req:Request, res:Response) => {

    // const insertedId = await blogsService.createNewBlog(req.body);

    const insertedId = await blogsService.createNewBlogPost(req.params.blogId, req.body)

    if(insertedId){
        // а вот здесь уже идем в query repo с айдишником который нам вернул command repo
        const result = await dataQueryRepository.findSinglePost(insertedId);

        if(result){
            res.status(HttpStatus.Created).json(result);
            return;
        }
    }

    res.status(HttpStatus.InternalServerError).send('Unknown error while attempting to create new blog-post or couldn\'t return created blog-post from Query Database.');
    return;
};


export const findSingleBlog = async (req: Request, res: Response) => {

    const result = await dataQueryRepository.findSingleBlog(req.params.id);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
        return;
    }

    res.status(HttpStatus.Ok).json(result);
    return;
};


export const updateBlog = async (req: Request, res: Response) => {
    const result = await blogsService.updateBlog(req.params.id, req.body);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
        return;
    }

    res.sendStatus(HttpStatus.NoContent);
    return;
};


export const deleteBlog = async (req: Request, res: Response) => {
    const result = await blogsService.deleteBlog(req.params.id);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
        return;
    }

    res.sendStatus(HttpStatus.NoContent);
    return;
};