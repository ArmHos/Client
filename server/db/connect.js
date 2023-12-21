import mongoose from "mongoose";

async function connectDB(url) {
    try {
        await mongoose.connect(url);
        console.log(`Connected to db successfully.`);
    } catch (err) {
        throw new Error(err);
    }
}

export default connectDB;