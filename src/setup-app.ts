import express, { Request, Response, Express } from 'express';
import {AUTH_PATH, BLOGS_PATH, POSTS_PATH, TESTING_PATH, USERS_PATH} from "./routers/router-pathes";
import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";
import {testingRouter} from "./routers/testing-router";
import {authRouter} from "./routers/auth-router";
import {usersRouter} from "./routers/users-router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(TESTING_PATH, testingRouter);
    app.use(AUTH_PATH, authRouter);
    app.use(USERS_PATH, usersRouter);

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send("All good!");
    });

    return app;

};