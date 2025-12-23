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
exports.deleteBlog = exports.updateBlog = exports.findSingleBlog = exports.createNewBlogPost = exports.getSeveralPostsFromBlog = exports.createNewBlog = exports.getSeveralBlogs = void 0;
const http_statuses_1 = require("../../core/http-statuses");
const blogs_service_1 = require("../../service/blogs-service");
const express_validator_1 = require("express-validator");
const map_blog_search_to_view_model_1 = require("../mappers/map-blog-search-to-view-model");
const getSeveralBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedQuery = (0, express_validator_1.matchedData)(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)
    const { items, totalCount } = yield blogs_service_1.blogsService.getSeveralBlogs(sanitizedQuery);
    const driversListOutput = (0, map_blog_search_to_view_model_1.mapToBlogListPaginatedOutput)(items, {
        pageNumber: sanitizedQuery.pageNumber,
        pageSize: sanitizedQuery.pageSize,
        totalCount,
    });
    res.status(http_statuses_1.HttpStatus.Ok).send(driversListOutput);
});
exports.getSeveralBlogs = getSeveralBlogs;
const createNewBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_statuses_1.HttpStatus.Created).json(yield blogs_service_1.blogsService.createNewBlog(req.body));
});
exports.createNewBlog = createNewBlog;
const getSeveralPostsFromBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedQuery = (0, express_validator_1.matchedData)(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)
    const blogId = req.params.blogId;
    if (!blogId) {
        res.status(400).json({ error: 'blogId is required' });
    }
    // console.log('<------------ HAVE WE GOT HERE????');
    // console.log(sanitizedQuery);
    // console.log(blogId);
    const { items, totalCount } = yield blogs_service_1.blogsService.getAllPostsFromBlog(blogId, sanitizedQuery);
    const postListOutput = (0, map_blog_search_to_view_model_1.mapToPostListPaginatedOutput)(items, {
        pageNumber: sanitizedQuery.pageNumber,
        pageSize: sanitizedQuery.pageSize,
        totalCount,
    });
    res.status(http_statuses_1.HttpStatus.Ok).send(postListOutput);
});
exports.getSeveralPostsFromBlog = getSeveralPostsFromBlog;
const createNewBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_service_1.blogsService.createNewBlogPost(req.params.blogId, req.body);
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
exports.createNewBlogPost = createNewBlogPost;
const findSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_service_1.blogsService.findSingleBlog(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.status(http_statuses_1.HttpStatus.Ok).json(result);
});
exports.findSingleBlog = findSingleBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_service_1.blogsService.updateBlog(req.params.id, req.body);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_service_1.blogsService.deleteBlog(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
exports.deleteBlog = deleteBlog;
