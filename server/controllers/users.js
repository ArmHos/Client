import { loginUser, registerUser, verifyUser } from "../services/user.services.js";

export async function homeController(req, res) {
    await verifyUser(req, res);
}

export async function registerController(req, res) {
    await registerUser(req, res);
}

export async function loginController(req, res) {
    await loginUser(req, res)
}