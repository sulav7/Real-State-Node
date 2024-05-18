import express from "express";
import userRouter from "../User/UserRouter";
import customerRouter from "../Customers/CustomerRouter";

const router = express.Router();

router.use("/user", userRouter);

router.use("/customer", customerRouter);

export default router;
