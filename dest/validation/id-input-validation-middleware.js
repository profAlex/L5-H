"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {Request, Response, Router} from 'express-validator';
// export const inputIdValidation = param('id')
//     .exists().withMessage('ID must be specified')
//     .isString().withMessage('ID must be of type string')
//     .trim()
//     .isLength({ min: 1 }).withMessage('ID must not be empty')
//     //.isMongoId().withMessage('ID must be of valid mongo-type')
//
// export const inputIdValidationVerification = (
//     paramName: string,
//     collectionName: string
// ): ValidationChain => {
//     return param(paramName)
//         .notEmpty()
//         .withMessage(`${paramName} is required, invalid format.`)
//         .isString()
//         .withMessage(`${paramName} must be a string, invalid format.`)
//         .custom((value) => {
//             console.log('<-----------------HAVE WE GOTTEN HERE? 0 :', value);
//
//             if (!ObjectId.isValid(value)) {
//                 console.log('<-----------------HAVE WE GOTTEN HERE? 0.5>>>');
//
//                 throw new Error(`Invalid ${paramName}. Must be 24-character hex string.`);
//             }
//
//             return true;
//         })
//         //.withMessage(`Invalid ${paramName}. Must be a 24-character hex string.`)
//         // .withMessage({
//         //     msg: `Invalid ${paramName}. Must be 24-character hex string, invalid format.`,
//         //     type: 'invalid_format'
//         // })
//         .custom(async (value:string) => {
//             console.log('<-----------------HAVE WE GOTTEN HERE? 1');
//             let result;
//             if(!ObjectId.isValid(value)){
//                 console.log('<-----------------HAVE WE GOTTEN HERE? 1.5>>>');
//
//
//                 throw new Error(`Invalid ${paramName}. Must be 24-character hex string.`);
//             }
//
//             if(collectionName === 'postsCollection')
//             {
//                 // result = await db.collection(collectionName).findOne({ _id: new ObjectId(value) }, {projection: {_id: 1}});
//                 result = await postsCollection.findOne({ _id: new ObjectId(value) }, {projection: {_id: 1}});
//             }
//             else if(collectionName === 'bloggersCollection')
//             {
//                 console.log('<-----------------HAVE WE GOTTEN HERE? 2');
//
//                 result = await bloggersCollection.findOne({ _id: new ObjectId(value) }, {projection: {_id: 1}});
//                 console.log('<-----------------HAVE WE GOTTEN HERE? 3');
//
//             }
//             // if (result === null) {
//             //     console.log('<-----------------HAVE WE GOTTEN HERE? 2');
//             // }
//             // else
//             // {
//             //     console.log('<-----------------HAVE WE GOTTEN HERE? 3');
//             //
//             // }
//             // console.log('<-----------------HAVE WE GOTTEN HERE? 4');
//             console.log('<-----------------result:', result);
//             if (!result) {
//                 throw new Error(`Resource with ${paramName} not found in '${collectionName}'`); // ✅
//             }
//             return !!result; // true/false
//         })
//         .withMessage(`Resource with ${paramName} not found in '${collectionName}'`);
// };
//
//
// export const inputIdValidationVerification = (
//     paramName: string,
//     collectionName: string
// ): ValidationChain => {
//     return param(paramName)
//         .notEmpty()
//         .withMessage(`${paramName} is required`)
//
//         .isString()
//         .withMessage(`${paramName} must be a string`)
//
//         .custom((value) => ObjectId.isValid(value))
//         .withMessage(`Invalid ${paramName}. Must be a 24-character hex string.`)
//
//
//         .custom(async (value) => {
//             if (!ObjectId.isValid(value)) {
//                 throw new Error(`Invalid ${paramName}. Must be 24-character hex string.`);
//             }
//
//             const collection = collectionName === 'postsCollection'
//                 ? postsCollection
//                 : bloggersCollection;
//
//             const result = await collection.findOne(
//                 { _id: new ObjectId(value) },
//                 { projection: { _id: 1 } }
//             );
//
//             if (!result) {
//                 throw new Error(`Resource with ${paramName} not found in '${collectionName}'`);
//             }
//
//             return true;
//         })
//         .withMessage(`Resource with ${paramName} not found in '${collectionName}'.`);
// };
