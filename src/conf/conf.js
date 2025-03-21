const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
    appwriteCollectionID: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucketID: String(import.meta.env.VITE_BUCKET_ID),
    appwriteDatabaseID: String(import.meta.env.VITE_DATABASE_ID),
}

export default conf