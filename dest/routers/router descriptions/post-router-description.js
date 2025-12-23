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
exports.deletePost = exports.updatePost = exports.findSinglePost = exports.createNewPost = exports.getAllPosts = void 0;
const http_statuses_1 = require("../../core/http-statuses");
const blogger_mongodb_repository_1 = require("../../repository/blogger-mongodb-repository");
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_statuses_1.HttpStatus.Ok).json(yield blogger_mongodb_repository_1.dataRepository.getAllPosts());
});
exports.getAllPosts = getAllPosts;
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogger_mongodb_repository_1.dataRepository.createNewPost(req.body);
    res.status(http_statuses_1.HttpStatus.Created).json(result);
});
exports.createNewPost = createNewPost;
const findSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogger_mongodb_repository_1.dataRepository.findSinglePost(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.status(http_statuses_1.HttpStatus.Ok).json(result);
});
exports.findSinglePost = findSinglePost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogger_mongodb_repository_1.dataRepository.updatePost(req.params.id, req.body);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogger_mongodb_repository_1.dataRepository.deletePost(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
exports.deletePost = deletePost;
