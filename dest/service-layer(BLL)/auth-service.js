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
exports.authService = void 0;
const query_repository_1 = require("../repository-layers/query-repository-layer/query-repository");
const bcypt_1 = require("../authentication/bcypt");
exports.authService = {
    loginUser(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const isCorrectCredentials = yield this.checkUserCredentials(loginOrEmail, password);
            if (!isCorrectCredentials) {
                return null;
            }
            return { accessToken: "token" };
        });
    },
    checkUserCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield query_repository_1.dataQueryRepository.findByLoginOrEmail(loginOrEmail);
            if (!user)
                return false;
            return bcypt_1.bcryptService.checkPassword(password, user.passwordHash);
        });
    },
};
