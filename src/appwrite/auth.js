import conf from "../conf/conf.js";
import {Account, Client, ID} from "appwrite"

export class AuthService{
    Client = new Client();
    Account;

    constructor(){
        this.conf
        .setEndpoint(conf.appwriteUrl)
        .serProject(conf.appwriteProjectId);

        this.Account = new Account(this.Client);
    }

    async createAccount({email,password,name}){ 
        //It can be fail also , so we put it into try block
        try {
            const userAccount = await(this.Account.create(ID.unique(),email,password,name));
            if(userAccount) 
            {
                // Call another method
                return this.login({email, password});
            }
        else{
            return userAccount     
        }
        } catch (error) {
            throw error;
        }
    }

    async login ({email, password}){
        try {
            return await this.Account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.Account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logout(){
        try {
            await this.Account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService