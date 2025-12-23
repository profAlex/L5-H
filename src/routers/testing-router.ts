import {Request, Response, Router} from 'express';
import {dataRepository} from "../repository/blogger-mongodb-repository";
import {HttpStatus} from "../core/http-statuses";

export const testingRouter = Router();

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    await dataRepository.deleteAllBloggers();
    res.sendStatus(HttpStatus.NoContent);
})