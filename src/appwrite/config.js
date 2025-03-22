import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    Client = new Client;
    Databases;
    Bucket;
    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.Databases = new Databases(this.Client);
        this.Bucket = new Storage(this.Client);
    }

    async createPost ({title, slug, content, img, status, userId}){
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    img,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("appwrite service :: createPost :: error", error)
        }
    }

    async upadatePost(slug, {title, content, img, status}){
        try {
            return await this.Databases.updateDocument(
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
            return true;
        } catch (error) {
            console.log("appwrite service :: updatePost :: error", error)
            return false;
        }
    }


    async deletePost(slug){
        try {
            return await this.Databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
            )
        } catch (error) {
            console.log("appwrite service :: deletePost :: error", error)
        }
    }

    async getPost(slug){
        try {
            return await this.Databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: getPost :: error", error)
            return false;
        }
    }


    async getPosts( queries = [Query.equal("status","active")] ){
        try {
            return await this.Databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            console.log("appwrite service :: getPosts :: error", error)
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.Bucket.createFile(
                conf.appwriteBucketID,
                ID.unique,
                file,
            )
        } catch (error) {
            console.log("appwrite service :: uploadFile :: error", error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.Bucket.deleteFile(
                conf.appwriteBucketID,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: deleteFile :: error", error)
            return false;
        }
    }

    getFilePreview(fileId){
        return this.Bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId,
        )
    }
}

const service = new Service();

export default service 