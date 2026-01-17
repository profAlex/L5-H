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
exports.getSeveralUsers = void 0;
const express_validator_1 = require("express-validator");
const query_repository_1 = require("../../repository-layers/query-repository-layer/query-repository");
const http_statuses_1 = require("../util-enums/http-statuses");
const getSeveralUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedQuery = (0, express_validator_1.matchedData)(req, {
        locations: ['query'],
        includeOptionals: true,
    }); //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)
    const usersListOutput = yield query_repository_1.dataQueryRepository.getSeveralUsers(sanitizedQuery);
    res.status(http_statuses_1.HttpStatus.Ok).send(usersListOutput);
    return;
});
exports.getSeveralUsers = getSeveralUsers;
