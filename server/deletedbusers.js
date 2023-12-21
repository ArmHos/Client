import mongoose from "mongoose";
import connectDB from "./db/connect.js";
import { User } from "./model/User.js";

async function deleteUsers() {
    try {
        await connectDB("mongodb+srv://armen:jhonsmith4067@nodeexpressprojects.yklcopn.mongodb.net/auth?retryWrites=true&w=majority");
        console.log('conected');
        await User.deleteMany({});
        console.log("Delete users");
    } catch (err) {
        throw new Error(err)
    }
}

// deleteUsers();