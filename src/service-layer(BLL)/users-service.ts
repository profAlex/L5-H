export const usersService = {
    // getSeveralBlogs, getSeveralPostsById, findSingleBlog переехал в query-repositary-layer, и в потоке который обрабатывает query отсутствует слой service

    // async getSeveralBlogs(sentInputGetBlogsQuery: InputGetBlogsQuery): Promise<{items: WithId<BlogViewModel>[]; totalCount: number}> {
    //
    //     return await dataCommandRepository.getSeveralBlogs(sentInputGetBlogsQuery);
    // },

    async createNewBlog(newBlog: BlogInputModel) : Promise<string | undefined> {

        return await dataCommandRepository.createNewBlog(newBlog);
    },