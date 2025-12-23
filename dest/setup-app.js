"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const router_pathes_1 = require("./routers/router-pathes");
const blogs_router_1 = require("./routers/blogs-router");
const posts_router_1 = require("./routers/posts-router");
const testing_router_1 = require("./routers/testing-router");
const setupApp = (app) => {
    app.use(express_1.default.json());
    // ПРОВЕРИТЬ ЧТО МЫ МОЖЕМ БЕЗ ЭТОГО ОБЪЯВЛЕНИЯ?! Сможем ли
    app.use(router_pathes_1.BLOGS_PATH, blogs_router_1.blogsRouter);
    app.use(router_pathes_1.POSTS_PATH, posts_router_1.postsRouter);
    app.use(router_pathes_1.TESTING_PATH, testing_router_1.testingRouter);
    app.get('/', (req, res) => {
        res.status(200).send("All good!");
    });
    return app;
};
exports.setupApp = setupApp;
