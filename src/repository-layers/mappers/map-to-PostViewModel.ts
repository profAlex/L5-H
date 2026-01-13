import {PostViewModel} from "../../routers/router-types/post-view-model";
import {postCollectionStorageModel} from "../command-repository-layer/command-repository";

export const mapSinglePostCollectionToViewModel = (postInContainer: postCollectionStorageModel) => {
    return {
        id: postInContainer._id.toString(),
        title: postInContainer.title,
        shortDescription: postInContainer.shortDescription,
        content: postInContainer.content,
        blogId: postInContainer.blogId,
        blogName: postInContainer.blogName,
        createdAt: postInContainer.createdAt
    } as PostViewModel;
};