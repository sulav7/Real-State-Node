import express from "express";
import { userCotroller } from ".";
import auth from "../middleware/authMiddleware";
import validate from "../utils/helpers/validationHelper";
import userSchema from "./UserValidation";

const userRouter = express.Router();

userRouter.post("/create", validate(userSchema), userCotroller.createUser);

userRouter.post("/login", userCotroller.login);

userRouter.get("/details", auth, userCotroller.getUserDetails);

userRouter.patch("/update", auth, userCotroller.updateUserDetails);

export default userRouter;
