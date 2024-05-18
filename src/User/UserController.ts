import express from "express";
import { userService } from ".";
import { success } from "../utils/success.utils";

class UserController {
  async createUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const createUser = await userService.createUser(req.body);
      return res
        .status(200)
        .json(success("User created successfully", res.statusCode, createUser));
    } catch (err) {
      next(err);
      console.log(err, "error");
    }
  }

  async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const login = await userService.loginUser(
        req.body.email,
        req.body.password
      );
      return res
        .status(200)
        .json(success("User login successfully", res.statusCode, login));
    } catch (err) {
      next(err);
    }
  }

  async getUserDetails(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // @ts-ignore
      const userDetails = await userService.getUser(req.id);
      return res
        .status(200)
        .json(success("User Details", res.statusCode, userDetails));
    } catch (err) {
      next(err);
    }
  }

  async updateUserDetails(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      console.log(req.body);
      // @ts-ignore
      const userId = req.id;

      const updateUserDetails = await userService.updateUser(req.body, userId);

      return res
        .status(200)
        .json(
          success("User Details Updated", res.statusCode, updateUserDetails)
        );
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
