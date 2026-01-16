import {UserViewModel} from "./user-view-model";

export type PaginatedBlogViewModel = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: UserViewModel[];
}