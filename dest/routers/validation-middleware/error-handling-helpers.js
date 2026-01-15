"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customErrorInQueryMessage = void 0;
const customErrorInQueryMessage = (message, field) => ({
    message,
    field // Optional: express-validator usually knows the field, but you can override it
});
exports.customErrorInQueryMessage = customErrorInQueryMessage;
