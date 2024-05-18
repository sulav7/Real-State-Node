import sequelize from "../setup/dbSetup";
import User from "./User";
import UserController from "./UserController";
import UserService from "./UserService";

const userModal = sequelize.getRepository(User);

const userService = new UserService(userModal);

const userCotroller = new UserController();

export { userService, userCotroller };
