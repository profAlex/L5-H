"use strict";
// import {BlogViewModel} from "../types/blog-view-model";
// import {BlogInputModel} from "../types/blog-input-model";
// import {PostViewModel} from "../types/post-view-model";
// import {PostInputModel} from "../types/post-input-model";
//
// // type blogPost = {
// //     postId: string;
// //     postTitle: string;
// //     postShortDescription: string;
// //     postContent: string;
// // };
//
// type bloggerRawData = {
//
//     bloggerInfo: BlogViewModel,
//     bloggerPosts: PostViewModel[] | null | undefined;
// };
//
// const nonDisclosableDatabase = {
//     bloggerRepository: [{
//         bloggerInfo:
//             {
//                 id: "001",
//                 name: "blogger_001",
//                 description: "takoy sebe blogger...",
//                 websiteUrl: "https://takoy.blogger.com",
//             },
//         bloggerPosts:
//             [{
//                 id: "001_001",
//                 title: "post blog 001",
//                 shortDescription: "post ni o 4em",
//                 content: "Eto testovoe napolnenie posta 001_001",
//                 blogId: "001",
//                 blogName: "blogger_001"
//             },
//             {
//                 id: "001_002",
//                 title: "post blog 002",
//                 shortDescription: "post ni o 4em",
//                 content: "Eto testovoe napolnenie posta 001_002",
//                 blogId: "001",
//                 blogName: "blogger_001"
//             }
//         ]},
//         {
//             bloggerInfo:
//             {
//                 id: "002",
//                 name: "blogger_002",
//                 description: "a eto klassnii blogger!",
//                 wbesiteUrl: "https://klassnii.blogger.com"
//             },
//             bloggerPosts:
//             [{
//                 id: "002_001",
//                 title: "post blog 001",
//                 shortDescription: "horowii post",
//                 content: "Eto testovoe napolnenie posta 002_001",
//                 blogId: "002",
//                 blogName: "blogger_002"
//             },
//             {
//                 postId: "002_002",
//                 postTitle: "post blog 002",
//                 postShortDescription: "horowii post",
//                 postContent: "Eto testovoe napolnenie posta 002_002",
//                 blogId: "002",
//                 blogName: "blogger_002"
//             }]
//         }
//     ] as bloggerRawData[]
// }
//
//
// const generateCombinedId = () => {
//     const timestamp = Date.now();
//     const random = Math.random().toString().substring(2,5);
//     return `${timestamp}-${random}`;
// }
//
// export const dataRepository = {
//
//     // *****************************
//     // методы для управления блогами
//     // *****************************
//
//     getAllBlogs(): BlogViewModel[] {
//         return nonDisclosableDatabase.bloggerRepository.map(({ bloggerInfo }) => ({
//             id: bloggerInfo.id,
//             name: bloggerInfo.name,
//             description: bloggerInfo.description,
//             websiteUrl: bloggerInfo.websiteUrl
//         }));
//     },
//
//     createNewBlog(newBlog: BlogInputModel): BlogViewModel {
//         const newBlogEntry = {
//             id: generateCombinedId(),
//             ...newBlog
//         };
//
//
//         const newDatabaseEntry: bloggerRawData = {
//             bloggerInfo: newBlogEntry,
//             bloggerPosts: []
//         };
//
//         nonDisclosableDatabase.bloggerRepository.push(newDatabaseEntry);
//
//         // console.log("ID Inside repository: ",newBlogEntry.id);
//         return newBlogEntry;
//     },
//
//     findSingleBlog(blogId: string): BlogViewModel | undefined {
//         const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === blogId);
//
//         if(blogger)
//         {
//             const foundBlogger = {
//                 id: blogger.bloggerInfo.id,
//                 name: blogger.bloggerInfo.name,
//                 description: blogger.bloggerInfo.description,
//                 websiteUrl: blogger.bloggerInfo.websiteUrl
//             }
//
//             // console.log("ID inside finding function:", foundBlogger.id);
//
//             return foundBlogger;
//         }
//
//         return undefined;
//     },
//
//     updateBlog(blogId: string, newData: BlogInputModel): null | undefined {
//         const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === blogId);
//
//         if(blogger)
//         {
//             let blogIndex = nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
//
//             const updatedBlogger = {
//                 ...blogger,
//                 bloggerInfo: {
//                     id: blogger.bloggerInfo.id,
//                     name: newData.name,
//                     description: newData.description,
//                     websiteUrl: newData.websiteUrl
//                 }
//             }
//
//             nonDisclosableDatabase.bloggerRepository[blogIndex] = updatedBlogger;
//
//             return null;
//         }
//
//         return undefined;
//     },
//
//     deleteBlog(blogId: string): null | undefined {
//         const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === blogId);
//
//         if(blogger)
//         {
//             let blogIndex = nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
//             nonDisclosableDatabase.bloggerRepository.splice(blogIndex, 1);
//
//             return null;
//         }
//
//         return undefined;
//     },
//
//     // *****************************
//     // методы для управления постами
//     // *****************************
//     getAllPosts(): PostViewModel[] | []{
//         return nonDisclosableDatabase.bloggerRepository.flatMap((element: bloggerRawData):PostViewModel[] | [] => (element.bloggerPosts ?? []));
//     },
//
//
//     createNewPost(newPost: PostInputModel): PostViewModel | undefined {
//
//         let blogName = this.findSingleBlog(newPost.blogId)?.name;
//         if (!blogName)
//         {
//             return undefined;
//         }
//
//         const blogIndex = nonDisclosableDatabase.bloggerRepository.findIndex(
//             (blogger) => blogger.bloggerInfo.id === newPost.blogId
//         );
//
//         const newPostEntry = {
//             ...newPost,
//             id: generateCombinedId(),
//             blogName: blogName,
//         };
//
//         nonDisclosableDatabase.bloggerRepository[blogIndex].bloggerPosts?.push(newPostEntry);
//
//         return newPostEntry;
//     },
//
//     findSinglePost(postId: string): PostViewModel | undefined {
//         for (const blogger of nonDisclosableDatabase.bloggerRepository) {
//             if (!blogger.bloggerPosts) continue;
//             for(const post of blogger.bloggerPosts)
//             {
//                 if(post.id === postId)
//                     return post;
//             }
//         }
//         return undefined;
//     },
//
//     updatePost(postId: string, newData: PostInputModel): null | undefined {
//         //const post = this.findSinglePost(id);
//         const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === newData.blogId);
//
//         if(blogger && blogger.bloggerPosts)
//         {
//             let blogIndex = nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
//             let post = this.findSinglePost(postId);
//
//             if(blogIndex !== -1 && post) {
//                 let postIndex = blogger.bloggerPosts.indexOf(post);
//
//                 if(postIndex !== -1)
//                 {
//                     const updatedPost: PostViewModel = {
//                         id: post.id,
//                         blogName: post.blogName,
//                         ...newData
//                     };
//
//                     // Создаем новый массив постов с обновленным постом
//                     const updatedPosts = [
//                         ...blogger.bloggerPosts.slice(0, postIndex),
//                         updatedPost,
//                         ...blogger.bloggerPosts.slice(postIndex + 1)
//                     ];
//
//                     // Создаем обновленную запись блоггера
//                     const updatedBlogEntry: bloggerRawData = {
//                         ...blogger,
//                         bloggerPosts: updatedPosts
//                     };
//
//
//                         nonDisclosableDatabase.bloggerRepository[blogIndex] = updatedBlogEntry;
//                     return null;
//                 }
//             }
//         }
//
//         return undefined;
//     },
//
//     deletePost(postId: string): null | undefined {
//         const post = this.findSinglePost(postId);
//         if(!post)
//         {
//             return undefined;
//         }
//
//         const blogIdFromPost = post.blogId;
//         const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === blogIdFromPost);
//
//         if(blogger && blogger.bloggerPosts)
//         {
//             let blogIndex = nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
//
//             if(blogIndex !== -1 && post) {
//                 let postIndex = blogger.bloggerPosts.indexOf(post);
//                 nonDisclosableDatabase.bloggerRepository[blogIndex].bloggerPosts?.splice(postIndex,1);
//
//                 return null;
//             }
//         }
//
//         return undefined;
//     },
//
//     // *****************************
//     // методы для тестов
//     // *****************************
//     deleteAllBloggers() {
//         nonDisclosableDatabase.bloggerRepository = [];
//     },
//
//     returnLength() {
//         return nonDisclosableDatabase.bloggerRepository.length;
//     }
// }
