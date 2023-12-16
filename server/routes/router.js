import { Router } from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/users.js";

const router = Router();

router.route("/home").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;