"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsSortListEnum = exports.BlogsSortListEnum = void 0;
var BlogsSortListEnum;
(function (BlogsSortListEnum) {
    BlogsSortListEnum["Id"] = "id";
    BlogsSortListEnum["Name"] = "name";
    BlogsSortListEnum["Description"] = "description";
    BlogsSortListEnum["WebsiteUrl"] = "websiteUrl";
    BlogsSortListEnum["CreatedAt"] = "createdAt";
    BlogsSortListEnum["IsMembership"] = "isMembership";
})(BlogsSortListEnum || (exports.BlogsSortListEnum = BlogsSortListEnum = {}));
;
var PostsSortListEnum;
(function (PostsSortListEnum) {
    PostsSortListEnum["Id"] = "id";
    PostsSortListEnum["Title"] = "title";
    PostsSortListEnum["ShortDescription"] = "shortDescription";
    PostsSortListEnum["Content"] = "content";
    PostsSortListEnum["BlogId"] = "blogId";
    PostsSortListEnum["CreatedAt"] = "createdAt";
    PostsSortListEnum["BlogName"] = "blogName";
})(PostsSortListEnum || (exports.PostsSortListEnum = PostsSortListEnum = {}));
;
