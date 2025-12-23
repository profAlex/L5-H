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
exports.deletePost = exports.updatePost = exports.findSinglePost = exports.createNewPost = exports.getSeveralPosts = void 0;
const http_statuses_1 = require("../../core/http-statuses");
const posts_service_1 = require("../../service/posts-service");
const express_validator_1 = require("express-validator");
const map_blog_search_to_view_model_1 = require("../mappers/map-blog-search-to-view-model");
// export const getAllPosts= async (req:Request, res:Response) => {
//     res.status(HttpStatus.Ok).json(await postsService.getAllPosts());
// };
const getSeveralPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedQuery = (0, express_validator_1.matchedData)(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)
    const { items, totalCount } = yield posts_service_1.postsService.getSeveralPosts(sanitizedQuery);
    const postsListOutput = (0, map_blog_search_to_view_model_1.mapToPostListPaginatedOutput)(items, {
        pageNumber: sanitizedQuery.pageNumber,
        pageSize: sanitizedQuery.pageSize,
        totalCount,
    });
    res.status(http_statuses_1.HttpStatus.Ok).send(postsListOutput);
});
exports.getSeveralPosts = getSeveralPosts;
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_service_1.postsService.createNewPost(req.body);
    // if(result === undefined)
    // {
    //     // res.sendStatus(HttpStatus.NotFound);
    //
    //     res.status(HttpStatus.Created).json({ errorsMessages: "this is what ive been trying to find" });
    //
    //     throw new Error(`couldn't create new post inside postsService.createNewPost`);
    // }
    res.status(http_statuses_1.HttpStatus.Created).json(result);
});
exports.createNewPost = createNewPost;
const findSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_service_1.postsService.findSinglePost(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.status(http_statuses_1.HttpStatus.Ok).json(result);
});
exports.findSinglePost = findSinglePost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_service_1.postsService.updatePost(req.params.id, req.body);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_service_1.postsService.deletePost(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
exports.deletePost = deletePost;
