import {Request, Response} from "express";
import {InputGetUsersQuery} from "../router-types/user-search-input-model";
import {matchedData} from "express-validator";
import {dataQueryRepository} from "../../repository-layers/query-repository-layer/query-repository";
import {HttpStatus} from "../util-enums/http-statuses";

export const getSeveralUsers = async (req: Request<{}, {}, {}, any>, res: Response) => {

    const sanitizedQuery = matchedData<InputGetUsersQuery>(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)

    const usersListOutput = await dataQueryRepository.getSeveralUsers(sanitizedQuery);

    res.status(HttpStatus.Ok).send(usersListOutput);
    return;
};


export const createNewUser = async (req: Request, res: Response) => {

    const insertedId = await usersService.createNewBlog(req.body);

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