import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Province } from "./type";
import User from "../User/User";

export interface ICustomer extends Model {
  firstName: string;
  lastName: string;
  fiscalCode: string;
  displayName: string;
  street: string;
  city: string;
  houseNumber: string;
  zipCode: string;
  province: Province;
  country: string;
  email: string;
  phone: string;
  whatsapp: string;
  note: string;
  marketingConsent: boolean;
  privacyConsent: boolean;
}

@Table
class Customer extends Model implements ICustomer {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  fiscalCode: string;

  @Column
  displayName: string;

  @Column
  street: string;

  @Column
  city: string;

  @Column
  houseNumber: string;

  @Column
  zipCode: string;

  @Column
  province: Province;

  @Column
  country: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  whatsapp: string;

  @Column
  note: string;

  @Column
  marketingConsent: boolean;

  @Column
  privacyConsent: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

export default Customer;
