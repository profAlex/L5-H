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
exports.attemptToLogin = void 0;
const auth_service_1 = require("../../service-layer(BLL)/auth-service");
const http_statuses_1 = require("../util-enums/http-statuses");
const attemptToLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const sanitizedQuery = matchedData<LoginInputModel>(req, {
    //     locations: ['query'],
    //     includeOptionals: true,
    // });
    const { loginOrEmail, password } = req.body;
    const accessToken = yield auth_service_1.authService.loginUser(loginOrEmail, password);
    if (!accessToken)
        return res.sendStatus(http_statuses_1.HttpStatus.Unauthorized);
    return res.status(http_statuses_1.HttpStatus.NoContent).send({ accessToken });
});
exports.attemptToLogin = attemptToLogin;
