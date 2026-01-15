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
const http_statuses_1 = require("../util-enums/http-statuses");
const posts_service_1 = require("../../service-layer(BLL)/posts-service");
const express_validator_1 = require("express-validator");
const query_repository_1 = require("../../repository-layers/query-repository-layer/query-repository");
const getSeveralPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedQuery = (0, express_validator_1.matchedData)(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)
    const postsListOutput = yield query_repository_1.dataQueryRepository.getSeveralPosts(sanitizedQuery);
    res.status(http_statuses_1.HttpStatus.Ok).send(postsListOutput);
});
exports.getSeveralPosts = getSeveralPosts;
// немного другой способ создания поста, делает то же что и createNewBlogPost, но другой способ передачи blog ID
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const insertedId = yield posts_service_1.postsService.createNewPost(req.body);
    if (insertedId) {
        // а вот здесь уже идем в query repo с айдишником который нам вернул command repo
        const result = yield query_repository_1.dataQueryRepository.findSinglePost(insertedId);
        if (result) {
            res.status(http_statuses_1.HttpStatus.Created).json(result);
            return;
        }
    }
    res.status(http_statuses_1.HttpStatus.InternalServerError).send('Unknown error while attempting to create new post or couldn\'t return created post from Query Database.');
    return;
});
exports.createNewPost = createNewPost;
const findSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield query_repository_1.dataQueryRepository.findSinglePost(req.params.id);
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
