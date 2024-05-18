import express from "express";
import { customerService } from ".";
import { success } from "../utils/success.utils";

class CustomerController {
  async createCustomer(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // @ts-ignore
      const userId = req.id;

      const createCustomer = await customerService.createCustomer(
        req.body,
        userId
      );
      return res
        .status(200)
        .json(
          success(
            "Customer Created Successfully",
            res.statusCode,
            createCustomer
          )
        );
    } catch (err) {
      next(err);
    }
  }

  async getAllCustomers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // @ts-ignore
      const userId = req.id;

      const searchQuery = req.query;

      const page = searchQuery.page || 0;

      const customers = await customerService.getAllCustomers(
        userId,
        searchQuery.query || "",
        page,
        searchQuery.limit
      );
      return res
        .status(200)
        .json(success("Customers Details Shown", res.statusCode, customers));
    } catch (err) {
      next(err);
    }
  }

  async getParticularCustomer(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // @ts-ignore
      const userId = req.id;
      const customerId = req.params.id;

      const customer = await customerService.getParticularCustomer(
        customerId,
        userId
      );
      return res
        .status(200)
        .json(success("Customer Details Shown", res.statusCode, customer));
    } catch (err) {
      next(err);
    }
  }
}

export default CustomerController;
