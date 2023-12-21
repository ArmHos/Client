import { findUser } from "../services/user.services.js";
import bcrypt from "bcrypt";

export async function authenticateUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await findUser(email);

        if (!user) {
            console.log(false);
            return res.status(400).json({
                user,
                msg: "Incorrect email."
            });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                msg: "Incorrect password."
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            msg: "Server error.",
            err: err.message
        });
    }
}