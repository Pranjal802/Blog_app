import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    // const session = await authService.getSession();
    // if (!session) {
    //   await authService.login(email, password);
    // }
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      // return await this.account.createEmailSession(email, password);
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // async getCurrentUser() {
  //     try {
  //         return await this.account.get();
  //     } catch (error) {
  //         console.log("Appwrite serive :: getCurrentUser :: error", error);
  //     }

  //     return null;
  // }

  async getCurrentUser() {
    try {
      const session = await this.account.getSession("current"); // Check if session exists
      if (!session) {
        console.warn("No active session found.");
        return null;
      }
      return await this.account.get();
    } catch (error) {
      console.warn("No authenticated user:", error.message);
      return null;
    }
  }
}

const authService = new AuthService();

export default authService;
