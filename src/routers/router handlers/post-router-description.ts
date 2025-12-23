import {Request, Response} from "express";
import {HttpStatus} from "../../core/http-statuses";
import {dataRepository} from "../../repository/blogger-mongodb-repository";
import {postsService} from "../../service/posts-service";
import {InputGetPostsQuery} from "../router-types/post-search-input-model";
import {matchedData} from "express-validator";
import {BlogViewModel} from "../router-types/blog-view-model";
import {PostViewModel} from "../router-types/post-view-model";
import {WithId} from "mongodb";
import {PaginatedPostViewModel} from "../router-types/post-paginated-view-model";
import {mapToPostListPaginatedOutput} from "../mappers/map-blog-search-to-view-model";



// export const getAllPosts= async (req:Request, res:Response) => {
//     res.status(HttpStatus.Ok).json(await postsService.getAllPosts());
// };

export const getSeveralPosts= async (req:Request<any, any, any, InputGetPostsQuery >, res:Response) => {
    const sanitizedQuery = matchedData<InputGetPostsQuery>(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)

    const {items, totalCount} = await postsService.getSeveralPosts(sanitizedQuery);

    const postsListOutput: PaginatedPostViewModel = mapToPostListPaginatedOutput(items, {
        pageNumber: sanitizedQuery.pageNumber,
        pageSize: sanitizedQuery.pageSize,
        totalCount,
    });

    res.status(HttpStatus.Ok).send(postsListOutput);
};

export const createNewPost= async (req:Request, res:Response) => {
    const result = await postsService.createNewPost(req.body)

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



export const findSinglePost= async (req:Request, res:Response) => {
    const result = await postsService.findSinglePost(req.params.id);

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