import {Request, Response, NextFunction, json} from "express";
import {Db, ObjectId} from "mongodb";
import {HttpStatus} from "../core/http-statuses";
import {db, postsCollection, bloggersCollection} from "../db/mongo.db";



// Тип запроса с параметром ID и опциональным query
type IdValidatorRequest<ParamKey extends string, Query = any> = Request<
    { [K in ParamKey]: string },
    any,
    any,
    Query
>;

// Конфигурация валидатора — теперь включает db
type IdValidatorConfig<ParamKey extends string> = {
    paramKey: ParamKey;
    collectionName: string;
};

export function createIdValidator<
    ParamKey extends string,
    Query = any
>(
    config: IdValidatorConfig<ParamKey>
) {
    return async (
        req: IdValidatorRequest<ParamKey, Query>,
        res: Response,
        next: NextFunction
    ) => {
        const sentId = req.params[config.paramKey];

        // Передаём db из конфигурации в validateId
        if (await validateId(sentId, config.collectionName, res)) {
            next();
        }
    };
}

// Обновлённая функция validateId — теперь принимает db как параметр
async function validateId(
    sentId: string | undefined,
    collectionName: string,
    res: Response
): Promise<boolean> {
    // console.log("<----------WE GOT HERE? 1 : ", sentId);
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
    // console.log("<----------WE GOT HERE? 2 : ", collectionName);

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
        else{
            result = null;
        }

        // const result = await database.collection(collectionName).findOne(
        //     { _id: new ObjectId(sentId) },
        //     { projection: { _id: 1 } }
        // );
        // console.log("<---------- DIAGNOSTIC: ", result);

        if (!result) {
            // console.log("<----------WE GOT HERE? 3 : ", result);

            res.status(HttpStatus.NotFound).json({ error: `ID ${sentId} not found` });
            return false;
        }
        // console.log("<----------WE GOT HERE? 4 : ", result);

        return true;
    } catch (err) {
        res.status(HttpStatus.InternalServerError).json({
            error: 'Internal server error during ID validation'
        });
        return false;
        // console.error('DB Error:', err); // Полный стек
        // res.status(HttpStatus.InternalServerError).json({
        //     error: `DB error: ${err || 'Unknown'}`
        // });
        // return false;
    }
}

//
// export function inputBlogIdValidationVerification(collectionName: string) {
//     return async  (req: Request<{blogId: string}, {}, {}, InputGetBlogPostsByIdQuery>, res: Response, next: NextFunction) => {
//         const sentId = req.params.blogId;
//
//         if (!sentId) {
//             res.status(HttpStatus.BadRequest).json({
//                 error: 'ID parameter (blogId or id) is required'
//             });
//             return;
//         }
//
//         if(!ObjectId.isValid(sentId)) {
//             res.status(HttpStatus.BadRequest).json({error: `Sent ID: ${sentId} is invalid, empty or undefined`});
//             return;
//         }
//
//         try{
//             const results = await db.collection(collectionName).findOne({_id: new ObjectId(sentId)}, {projection: {_id: 1}});
//
//             if(!results)
//             {
//                 res.status(HttpStatus.NotFound).json({error: `ID ${sentId} doesn't exist`});
//                 return;
//             }
//
//             next();
//         }
//         catch(err){
//             res.status(HttpStatus.InternalServerError).json({error: 'Internal server error while validating ID'});
//         }
//     }
// }
//
//
// export function inputBlogIdValidationVerification2(collectionName: string) {
//     return async  (req: Request, res: Response, next: NextFunction) => {
//         const sentId = req.params.blogId;
//
//         if (!sentId) {
//             res.status(HttpStatus.BadRequest).json({
//                 error: 'ID parameter (blogId or id) is required'
//             });
//             return;
//         }
//
//         if(!ObjectId.isValid(sentId)) {
//             res.status(HttpStatus.BadRequest).json({error: `Sent ID: ${sentId} is invalid, empty or undefined`});
//             return;
//         }
//
//         try{
//             const results = await db.collection(collectionName).findOne({_id: new ObjectId(sentId)}, {projection: {_id: 1}});
//
//             if(!results)
//             {
//                 res.status(HttpStatus.NotFound).json({error: `ID ${sentId} doesn't exist`});
//                 return;
//             }
//
//             next();
//         }
//         catch(err){
//             res.status(HttpStatus.InternalServerError).json({error: 'Internal server error while validating ID'});
//         }
//     }
// }
//
//
// export function inputIdValidationVerification(collectionName: string) {
//     return async  (req: Request, res: Response, next: NextFunction) => {
//         const sentId = req.params.id;
//
//         if (!sentId) {
//             res.status(HttpStatus.BadRequest).json({
//                 error: 'ID parameter (blogId or id) is required'
//             });
//             return;
//         }
//
//         if(!ObjectId.isValid(sentId)) {
//             res.status(HttpStatus.BadRequest).json({error: `Sent ID: ${sentId} is invalid, empty or undefined`});
//             return;
//         }
//
//         try{
//             const results = await db.collection(collectionName).findOne({_id: new ObjectId(sentId)}, {projection: {_id: 1}});
//
//             if(!results)
//             {
//                 res.status(HttpStatus.NotFound).json({error: `ID ${sentId} doesn't exist`});
//                 return;
//             }
//
//             next();
//         }
//         catch(err){
//             res.status(HttpStatus.InternalServerError).json({error: 'Internal server error while validating ID'});
//         }
//     }
// }