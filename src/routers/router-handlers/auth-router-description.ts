import {Request, Response} from "express";
import {LoginInputModel} from "../router-types/login-input-model";
import {matchedData} from "express-validator";
import {authService} from "../../service-layer(BLL)/auth-service";
import {HttpStatus} from "../util-enums/http-statuses";


export const attemptToLogin = async (req: Request<{}, {}, LoginInputModel, {}>, res: Response) => {

    // const sanitizedQuery = matchedData<LoginInputModel>(req, {
    //     locations: ['query'],
    //     includeOptionals: true,
    // });

    const { loginOrEmail, password } = req.body;


    const accessToken = await authService.loginUser(loginOrEmail, password);

    if (!accessToken) return res.sendStatus(HttpStatus.Unauthorized);

    return res.status(HttpStatus.NoContent).end(); //статус 204 не предполагает наличие тела ответа. но без send() совсем - роут виснет
}