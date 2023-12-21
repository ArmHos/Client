import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authenticateUser } from "../middlewares/authenticateUser.js";
import { validateRegister } from "../middlewares/validateRegister.js";
import { User } from "../model/User.js";

export async function findUser(email) {
    try {
        return await User.findOne({ email });
    } catch (err) {
        throw new Error(err);
    }
}

export async function verifyUser(req, res) {
    try {
        const authToken = req.headers.authorization.split(" ")[1];

        jwt.verify(authToken, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: "Token verification failed unauthorized user.", err, route: "/login" });
            } else {
                return res.status(200).json({
                    msg: "Welcome !!!",
                    route: "/home"
                });
            }
        });
    } catch (err) {
        console.error(err);
    }
}

export async function registerUser(req, res) {
    try {
        await validateRegister(req, res, async () => {
            const { email, password } = req.body;
            const hashedPass = await bcrypt.hash(password, 7);
            try {
                await User.create({
                    email,
                    password: hashedPass
                });
                return res.status(201).json({
                    msg: `The user registered successfully.`,
                    route: "/login"
                });
            } catch (err) {
                if (err.code === 11000 && err.keyPattern && err.keyValue && err.keyValue.email) {
                    return res.status(400).json({ msg: `The mail ${err.keyValue.email} is already registered. Log in or create another account with other mail.` });
                } else {
                    return res.status(400).json({ msg: err.message });
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
}

export async function loginUser(req, res) {
    try {
        await authenticateUser(req, res, () => {
            const { email } = req.body;
            const token = jwt.sign({ email }, process.env.SECRET);

            return res.status(200).json({
                access_token: token,
                msg: "Generated token successfully."
            });
        })
    } catch (err) {
        throw new Error(err);
    }
}