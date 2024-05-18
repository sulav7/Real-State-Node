import { Repository } from "sequelize-typescript";
import Customer, { ICustomer } from "./Customer";

import { IUserService } from "../User/UserService";

class CustomerService {
  private _customerModel;
  private _userService;

  constructor(model: Repository<Customer>, userService: IUserService) {
    this._customerModel = model;
    this._userService = userService;
  }

  async createCustomer(body: ICustomer, id: string) {
    await this._userService.getUser(id);

    const checkEmail = await this._customerModel.findOne({
      where: {
        email: body.email,
      },
    });

    const checkFiscalCode = await this._customerModel.findOne({
      where: {
        fiscalCode: body.fiscalCode,
      },
    });

    if (checkEmail) {
      throw {
        message: "Email already exists",
        status: 400,
      };
    }

    if (checkFiscalCode) {
      throw {
        message: "Fiscal Code must be unique",
        status: 400,
      };
    }
    const createCustomer = await this._customerModel.create({
      ...body,
      userId: id,
    });

    return createCustomer;
  }

  async getAllCustomers(id: string) {
    await this._userService.getUser(id);

    const customers = await this._customerModel.findAll({
      where: {
        userId: id,
      },
    });

    return customers;
  }

  async getParticularCustomer(customerId: string, userId: string) {
    await this._userService.getUser(userId);
    const customer = await this._customerModel.findOne({
      where: {
        userId: userId,
        id: customerId,
      },
    });

    return customer;
  }
}

export default CustomerService;
