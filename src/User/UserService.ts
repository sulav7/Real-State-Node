import { Repository } from "sequelize-typescript";
import User, { IUser } from "./User";
import { comparePassword, hashedPassword } from "../utils/helpers/bcryptHelper";
import generateToken from "../utils/helpers/tokenHelper";

import { Op } from "sequelize";
import sequelize from "../setup/dbSetup";
import Customer from "../Customers/Customer";

export interface IUserService {
  checkEmail(email: string): Promise<null>;
  getUser(id: string): Promise<User>;
}

class UserService {
  private _userModal;
  constructor(userModal: Repository<User>) {
    this._userModal = userModal;
  }

  async checkEmail(email: string) {
    const checkEmail = await this._userModal.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      throw {
        status: 400,
        message: "Email already exists",
      };
    }

    return checkEmail;
  }

  async checkUserName(userName: string) {
    const checkUser = await this._userModal.findOne({
      where: {
        userName,
      },
    });
    if (checkUser) {
      throw {
        status: 400,
        message: "Username already exists",
      };
    }

    return userName;
  }

  async userFromEmail(email: string) {
    const user = await this._userModal.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw {
        status: 400,
        message: "User not found",
      };
    }
  }

  async createUser(body: IUser): Promise<User> {
    await this.checkEmail(body.email);
    await this.checkUserName(body.userName);

    const password = body.password;

    const hashPassword = await hashedPassword(password);
    const createUser = await this._userModal.create({
      ...body,
      password: hashPassword,
    });

    return createUser;
  }

  async loginUser(email: string, password: string) {
    const user = await this._userModal.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw {
        status: 400,
        message: "User not found",
      };
    }

    const checkPassword = await comparePassword(password, user.password);

    if (!checkPassword) {
      throw {
        status: 400,
        message: "Invalid Credentials",
      };
    }

    const accessToken = generateToken(user.id);

    return {
      user,
      accessToken,
    };
  }

  async getUser(id: string): Promise<User> {
    const getInfo = await this._userModal.findOne({
      where: {
        id,
      },
      include: [
        {
          model: sequelize.getRepository(Customer),
          required: false,
        },
      ],
    });

    if (!getInfo) {
      throw {
        code: 404,
        message: "User not found",
      };
    }
    return getInfo;
  }

  async updateUser(body: IUser, id: string) {
    const checkEmail = await this._userModal.findOne({
      where: {
        email: body.email,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (checkEmail) {
      throw {
        message: "Email Already Taken",
        code: 404,
      };
    }

    const checkUserName = await this._userModal.findOne({
      where: {
        userName: body.userName,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (checkUserName) {
      throw {
        message: "Username already taken",
        code: 404,
      };
    }

    const updateUserInfo = await this._userModal.update(body, {
      where: {
        id,
      },
    });
    return updateUserInfo;
  }
}

export default UserService;
