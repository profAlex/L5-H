import {BlogViewModel} from "../../routers/router-types/blog-view-model";
import {bloggerCollectionStorageModel} from "../command-repository-layer/command-repository";

export const mapSingleBloggerCollectionToViewModel = (blogInContainer: bloggerCollectionStorageModel) => {
    return {
        id: blogInContainer._id.toString(),
        name: blogInContainer.name,
        description: blogInContainer.description,
        websiteUrl: blogInContainer.websiteUrl,
        createdAt: blogInContainer.createdAt,
        isMembership: false // был false
    } as BlogViewModel;
};