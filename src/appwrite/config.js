// import conf from "../conf/conf";

// import { Client, ID, Databases, Storage, Query } from "appwrite";

// export class Service {
//     Client = new Client;
//     Databases;
//     Bucket;
//     constructor(){
//         this.Client
//         .setEndpoint(conf.appwriteUrl)
//         .setProject(conf.appwriteProjectId);
//         this.Databases = new Databases(this.Client);
//         this.Bucket = new Storage(this.Client);
//     }

//     async createPost ({title, slug, content, img, status, userId}){
//         try {
//             return await this.Databases.createDocument(
//                 conf.appwriteDatabaseID,
//                 conf.appwriteCollectionID,
//                 slug,
//                 {
//                     title,
//                     content,
//                     img,
//                     status,
//                     userId,
//                 }
//             )
//         } catch (error) {
//             console.log("appwrite service :: createPost :: error", error)
//         }
//     }

//     async upadatePost(slug, {title, content, img, status}){
//         try {
//             return await this.Databases.updateDocument(
//                 conf.appwriteDatabaseID,
//                 conf.appwriteCollectionID,
//                 slug,
//                 {
//                     title,
//                     content,
//                     img,
//                     status,
//                 }
//             )
//             return true;
//         } catch (error) {
//             console.log("appwrite service :: updatePost :: error", error)
//             return false;
//         }
//     }


//     async deletePost(slug){
//         try {
//             return await this.Databases.deleteDocument(
//                 conf.appwriteDatabaseID,
//                 conf.appwriteCollectionID,
//                 slug,
//             )
//         } catch (error) {
//             console.log("appwrite service :: deletePost :: error", error)
//         }
//     }

//     async getPost(slug) {
//         try {
//             console.log("Database ID:", conf.appwriteDatabaseID);
//             console.log("Collection ID:", conf.appwriteCollectionID);
//             console.log("Slug (Document ID):", slug);
    
//             return await this.Databases.getDocument(
//                 conf.appwriteDatabaseID, 
//                 conf.appwriteCollectionID, 
//                 slug
//             );
//         } catch (error) {
//             console.error("Appwrite service :: getPost :: error", error);
//             return false;
//         }
//     }
    
    


//     async getPosts( queries = [Query.equal("status","active")] ){
//         try {
//             return await this.Databases.listDocuments(
//                 conf.appwriteDatabaseID,
//                 conf.appwriteCollectionID,
//                 queries,
//             )
//         } catch (error) {
//             console.log("appwrite service :: getPosts :: error", error)
//             return false;
//         }
//     }

//     async uploadFile(file){
//         try {
//             return await this.Bucket.createFile(
//                 conf.appwriteBucketID,
//                 ID.unique(),
//                 file,
//             )
//         } catch (error) {
//             console.log("appwrite service :: uploadFile :: error", error)
//             return false;
//         }
//     }

//     async deleteFile(fileId){
//         try {
//             return await this.Bucket.deleteFile(
//                 conf.appwriteBucketID,
//                 fileId,
//             )
//             return true;
//         } catch (error) {
//             console.log("appwrite service :: deleteFile :: error", error)
//             return false;
//         }
//     }

//     // getFilePreview(fileId){
//     //     return this.Bucket.getFilePreview(
//     //         conf.appwriteBucketID,
//     //         fileId,
//     //     )
//     // }
//     getFilePreview(fileId) {
//         if (!fileId) {
//             console.warn("getFilePreview: No fileId provided, returning placeholder.");
//             return "/placeholder.jpg"; // Provide a default placeholder
//         }
    
//         return this.Bucket.getFilePreview(conf.appwriteBucketID, fileId);
//     }
    
    
// }

// const service = new Service();

// export default service 


import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, img, status, userId, username }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                ID.unique(),
                {
                    title,
                    content,
                    slug,
                    img,
                    status,
                    userId,
                    username,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
    

    async updatePost(slug, {title, content, img, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    img,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        if (!Array.isArray(queries)) {
            throw new Error("Invalid queries parameter. Expected an array of queries.");
        }
    
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error);
            throw new Error("Failed to fetch posts");
        }
    }
    
    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        console.log("File ID:", fileId)
        if (!fileId) {
            console.warn("getFilePreview: No fileId provided, returning placeholder.");
            return "/placeholder.jpg"; // Default placeholder image
        }
    
        try {
            // Generate the file preview URL
            return this.bucket.getFilePreview(conf.appwriteBucketID, fileId);
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error", error);
            return "/error.jpg"; // Fallback image in case of an error
        }
    }
    // getFilePreview(fileId){
    //     console.log("File ID:", fileId)
    //     return this.bucket.getFilePreview(
    //         conf.appwriteBucketID,
    //         fileId
    //     )
    // }
    
}


const service = new Service()
export default service