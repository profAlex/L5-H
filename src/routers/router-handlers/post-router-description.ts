import {Request, Response} from "express";
import {HttpStatus} from "../util-enums/http-statuses";
import {postsService} from "../../service-layer(BLL)/posts-service";
import {InputGetPostsQuery} from "../router-types/post-search-input-model";
import {matchedData} from "express-validator";
import {dataQueryRepository} from "../../repository-layers/query-repository-layer/query-repository";


export const getSeveralPosts= async (req:Request<any, any, any, InputGetPostsQuery >, res:Response) => {
    const sanitizedQuery = matchedData<InputGetPostsQuery>(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)

    const postsListOutput = await dataQueryRepository.getSeveralPosts(sanitizedQuery);

    res.status(HttpStatus.Ok).send(postsListOutput);
};


// немного другой способ создания поста, делает то же что и createNewBlogPost, но другой способ передачи blog ID
export const createNewPost= async (req:Request, res:Response) => {

    const insertedId = await postsService.createNewPost(req.body)

    if(insertedId){
        // а вот здесь уже идем в query repo с айдишником который нам вернул command repo
        const result = await dataQueryRepository.findSinglePost(insertedId);

        if(result){
            res.status(HttpStatus.Created).json(result);
            return;
        }
    }

    res.status(HttpStatus.InternalServerError).send('Unknown error while attempting to create new post or couldn\'t return created post from Query Database.');
    return;
};


export const findSinglePost= async (req:Request, res:Response) => {
    const result = await dataQueryRepository.findSinglePost(req.params.id);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.status(HttpStatus.Ok).json(result);
};


export const updatePost= async (req:Request, res:Response) => {
    const result = await postsService.updatePost(req.params.id, req.body);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.sendStatus(HttpStatus.NoContent);
};


export const deletePost = async (req:Request, res:Response) => {

    const result = await postsService.deletePost(req.params.id);

    if(result === undefined)
    {
        res.sendStatus(HttpStatus.NotFound);
    }

    res.sendStatus(HttpStatus.NoContent);
};