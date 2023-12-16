import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import crypto from "crypto";

import { User } from "../model/User.js";
// import { log } from "console";
const secret = process.env.SECRET;

export async function getAllUsers(req, res) {
    try {
        const authToken = req.headers.authorization.split(" ")[1];
        console.log(authToken);
        jwt.verify(authToken, secret, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err);
                return res.status(401).json({ msg: "Token verification failed unauthorized user.", err, route: "/login" });
            } else {
                console.log('Token is valid');
                console.log('Decoded token:', decoded);
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
        const { email, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 7);
        const user = await User.create({
            email,
            password: hashedPass
        });
        console.log(user);
        res.status(201).json({
            msg: `The user register successfully.`,
            route: "/login"
        });
    } catch (err) {
        res.status(400).json({
            msg: `The mail is already registered. Log in or create another account with other mail`,
            err
        });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                user,
                msg: "Incorrect email."
            });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                msg: "Incorrect password."
            })
        }
        const token = jwt.sign({ email }, secret);
        return res.status(200).json({
            access_token: token,
            msg: "Generated token successfully."
        });
    } catch (err) {
        throw new Error(err);
    }
}