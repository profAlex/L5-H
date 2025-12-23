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
exports.deleteBlog = exports.updateBlog = exports.findSingleBlog = exports.createNewBlog = exports.getAllBlogs = void 0;
const http_statuses_1 = require("../../core/http-statuses");
const blogger_mongodb_repository_1 = require("../../repository/blogger-mongodb-repository");
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_statuses_1.HttpStatus.Ok).json(yield blogger_mongodb_repository_1.dataRepository.getAllBlogs());
});
exports.getAllBlogs = getAllBlogs;
const createNewBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_statuses_1.HttpStatus.Created).json(yield blogger_mongodb_repository_1.dataRepository.createNewBlog(req.body));
});
exports.createNewBlog = createNewBlog;
const findSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogger_mongodb_repository_1.dataRepository.findSingleBlog(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.status(http_statuses_1.HttpStatus.Ok).json(result);
});
exports.findSingleBlog = findSingleBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogger_mongodb_repository_1.dataRepository.updateBlog(req.params.id, req.body);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogger_mongodb_repository_1.dataRepository.deleteBlog(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
exports.deleteBlog = deleteBlog;
