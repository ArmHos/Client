import { Router } from "express";
import { homeController, registerController, loginController } from "../controllers/users.js";

const router = Router();

router.route("/home").get(homeController);
router.route("/register").post(registerController);
router.route("/login").post(loginController);

export default router;