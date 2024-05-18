import express from "express";
import { customerController } from ".";
import auth from "../middleware/authMiddleware";

const customerRouter = express.Router();

customerRouter.post("/create", auth, customerController.createCustomer);

customerRouter.get("", auth, customerController.getAllCustomers);

customerRouter.get("/:id", auth, customerController.getParticularCustomer);

export default customerRouter;
