import {Request, Response, NextFunction, json} from "express";
import {ObjectId} from "mongodb";
import {HttpStatus} from "../util-enums/http-statuses";
import {postsCollection, bloggersCollection, usersCollection} from "../../db/mongo.db";



// Тип запроса с параметром ID и опциональным query
// такой смешанный тип необходим для того чтобы можно было пользоваться одной и той же функцией
// createIdValidator для всех случаев цепочки миодлвэров и контроллеров, у которых в сигнатурах передаваемых
// аргументов будут несколько уточняться параметры Request, Response
type IdValidatorRequest<ParamKey extends string, Query = any> = Request<
    { [K in ParamKey]: string },
    any,
    any,
    Query
>;

// Конфигурация валидатора — теперь включает имя коллекции в db
type IdValidatorConfig<ParamKey extends string> = {
    paramKey: ParamKey;
    collectionName: string;
};

export function createIdValidator<ParamKey extends string, Query = any>
(config: IdValidatorConfig<ParamKey>) {
    return async (
        req: IdValidatorRequest<ParamKey, Query>,
        res: Response,
        next: NextFunction
    ) => {
        // req.params — это объект, содержащий параметры URL из маршрута Express
        // Например, для маршрута /users/:blogId параметр id будет доступен как req.params.blogId
        const sentId = req.params[config.paramKey];

        // Передаём db из конфигурации в validateId
        if (await validateId(sentId, config.collectionName, res)) {
            next();
        }
    };
}

// функция validateId принимает db как параметр
async function validateId(
    sentId: string | undefined,
    collectionName: string,
    res: Response
): Promise<boolean> {
    if (!sentId) {
        res.status(HttpStatus.BadRequest).json({
            error: 'ID parameter is required'
        });
        return false;
    }

    if (!ObjectId.isValid(sentId)) {
        res.status(HttpStatus.BadRequest).json({
            error: `Sent ID: ${sentId} is invalid`
        });
        return false;
    }

    let result;
    try {
        if(collectionName === 'bloggersCollection') {
            result = await bloggersCollection.findOne(
                { _id: new ObjectId(sentId) },
                { projection: { _id: 1 } }
            );
        }
        else if (collectionName === 'postsCollection') {
            result = await postsCollection.findOne(
                { _id: new ObjectId(sentId) },
                { projection: { _id: 1 } }
            );
        }
        else if (collectionName === 'usersCollection') {
            result = await usersCollection.findOne(
                { _id: new ObjectId(sentId) },
                { projection: { _id: 1 } }
            );
        }
        else{
            result = null;
        }

        if (!result) {
            res.status(HttpStatus.NotFound).json({ error: `ID ${sentId} not found` });
            return false;
        }

        return true;
    } catch (err) {
        res.status(HttpStatus.InternalServerError).json({
            error: 'Internal server error during ID validation'
        });
        return false;
    }
}
