import { Column, HasMany, Model, Table } from "sequelize-typescript";
import Customer from "../Customers/Customer";

export interface IUser extends Model {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

@Table
class User extends Model implements IUser {
  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  userName!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @HasMany(() => Customer)
  customers: Customer;
}

export default User;
