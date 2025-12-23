"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdValidator = createIdValidator;
const mongodb_1 = require("mongodb");
const http_statuses_1 = require("../core/http-statuses");
const mongo_db_1 = require("../db/mongo.db");
function createIdValidator(config) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const sentId = req.params[config.paramKey];
        // Передаём db из конфигурации в validateId
        if (yield validateId(sentId, config.collectionName, config.database, res)) {
            next();
        }
    });
}
// Обновлённая функция validateId — теперь принимает db как параметр
function validateId(sentId, collectionName, database, // Явный параметр
res) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("<----------WE GOT HERE? 1 : ", sentId);
        if (!sentId) {
            res.status(http_statuses_1.HttpStatus.BadRequest).json({
                error: 'ID parameter is required'
            });
            return false;
        }
        if (!mongodb_1.ObjectId.isValid(sentId)) {
            res.status(http_statuses_1.HttpStatus.BadRequest).json({
                error: `Sent ID: ${sentId} is invalid`
            });
            return false;
        }
        // console.log("<----------WE GOT HERE? 2 : ", collectionName);
        let result;
        try {
            if (collectionName === 'bloggersCollection') {
                result = yield mongo_db_1.bloggersCollection.findOne({ _id: new mongodb_1.ObjectId(sentId) }, { projection: { _id: 1 } });
            }
            else if (collectionName === 'postsCollection') {
                result = yield mongo_db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(sentId) }, { projection: { _id: 1 } });
            }
            else {
                result = null;
            }
            // const result = await database.collection(collectionName).findOne(
            //     { _id: new ObjectId(sentId) },
            //     { projection: { _id: 1 } }
            // );
            // console.log("<---------- DIAGNOSTIC: ", result);
            if (!result) {
                // console.log("<----------WE GOT HERE? 3 : ", result);
                res.status(http_statuses_1.HttpStatus.NotFound).json({ error: `ID ${sentId} not found` });
                return false;
            }
            // console.log("<----------WE GOT HERE? 4 : ", result);
            return true;
        }
        catch (err) {
            res.status(http_statuses_1.HttpStatus.InternalServerError).json({
                error: 'Internal server error during ID validation'
            });
            return false;
            // console.error('DB Error:', err); // Полный стек
            // res.status(HttpStatus.InternalServerError).json({
            //     error: `DB error: ${err || 'Unknown'}`
            // });
            // return false;
        }
    });
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
