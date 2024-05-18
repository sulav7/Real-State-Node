import { userService } from "../User";
import User from "../User/User";
import sequelize from "../setup/dbSetup";
import Customer from "./Customer";
import CustomerController from "./CustomerController";
import CustomerService from "./CustomerService";

const customerRepo = sequelize.getRepository(Customer);

const customerService = new CustomerService(customerRepo, userService);

const customerController = new CustomerController();

export { customerController, customerService };
