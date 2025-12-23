import express, { Request, Response, Express } from 'express';
import {BLOGS_PATH, POSTS_PATH, TESTING_PATH} from "./routers/router-pathes";
import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";
import {testingRouter} from "./routers/testing-router";

export const setupApp = (app: Express) => {
    app.use(express.json());


    // ПРОВЕРИТЬ ЧТО МЫ МОЖЕМ БЕЗ ЭТОГО ОБЪЯВЛЕНИЯ?! Сможем ли
    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(TESTING_PATH, testingRouter);

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send("All good!");
    });

    return app;

};