import { Sequelize } from "sequelize-typescript";
import { dbConfig } from "../config/databaseConfig";
import User from "../User/User";
import Customer from "../Customers/Customer";

const sequelize = new Sequelize({
  database: dbConfig.database,
  dialect: "postgres",
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  models: [User, Customer],
  repositoryMode: true,
  logging: false,
});

export default sequelize;
