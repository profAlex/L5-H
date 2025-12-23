"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputPaginationValidator = inputPaginationValidator;
exports.inputPaginationValidator2 = inputPaginationValidator2;
const express_validator_1 = require("express-validator");
const sort_direction_1 = require("../util-enums/sort-direction");
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_SORT_DIRECTION = sort_direction_1.CustomSortDirection.Descending;
function inputPaginationValidator(sentListOfAllowedFields) {
    const listOfAllowedFields = Object.values(sentListOfAllowedFields);
    return [
        (0, express_validator_1.query)('sortBy')
            .default(DEFAULT_SORT_BY)
            .isIn(listOfAllowedFields)
            .withMessage(`Invalid sortBy field. Must be one of the following: ${listOfAllowedFields.join(', ')}`),
        (0, express_validator_1.query)('sortDirection')
            .default(DEFAULT_SORT_DIRECTION)
            .isIn(Object.values(sort_direction_1.CustomSortDirection))
            .withMessage(`Invalid sortDirection field. Must be one of the following: ${Object.values(sort_direction_1.CustomSortDirection).join(', ')}`),
        (0, express_validator_1.query)('pageNumber')
            .default(DEFAULT_PAGE_NUMBER)
            .isInt({ min: 1 })
            .withMessage('Page number must be a positive integer')
            .toInt(),
        (0, express_validator_1.query)('pageSize')
            .default(DEFAULT_PAGE_SIZE)
            .isInt({ min: 1, max: 100 })
            .withMessage('Page size must be a positive integer between 1 and 100')
            .toInt(),
        (0, express_validator_1.query)('searchNameTerm')
            .default(null) // если параметр searchNameTerm отсутствует в запросе то будет подставлено значение null
            .custom(value => {
            return value === null || typeof value === 'string';
        })
            .withMessage('Invalid type of searchNameTerm field. Search terms must be a string or null')
    ];
}
function inputPaginationValidator2(sentListOfAllowedFields) {
    const listOfAllowedFields = Object.values(sentListOfAllowedFields);
    return [
        (0, express_validator_1.query)('sortBy')
            .default(DEFAULT_SORT_BY)
            .isIn(listOfAllowedFields)
            .withMessage(`Invalid sortBy field. Must be one of the following: ${listOfAllowedFields.join(', ')}`),
        (0, express_validator_1.query)('sortDirection')
            .default(DEFAULT_SORT_DIRECTION)
            .isIn(Object.values(sort_direction_1.CustomSortDirection))
            .withMessage(`Invalid sortDirection field. Must be one of the following: ${Object.values(sort_direction_1.CustomSortDirection).join(', ')}`),
        (0, express_validator_1.query)('pageNumber')
            .default(DEFAULT_PAGE_NUMBER)
            .isInt({ min: 1 })
            .withMessage('Page number must be a positive integer')
            .toInt(),
        (0, express_validator_1.query)('pageSize')
            .default(DEFAULT_PAGE_SIZE)
            .isInt({ min: 1, max: 100 })
            .withMessage('Page size must be a positive integer between 1 and 100')
            .toInt(),
    ];
}
