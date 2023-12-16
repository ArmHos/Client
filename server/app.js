import express from "express";
import connectDB from "./db/connect.js";
import router from "./routes/router.js";

const app = express();
const PORT = process.env.PORT || 5005;
const mongoUrl = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
const start = async () => {
    try {
        await connectDB(mongoUrl);
        app.listen(PORT, () => console.log(`Server is listening on port :: ${PORT}`));
    } catch (err) {
        console.error(err);
    }
}

start();