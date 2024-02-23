import { Payment } from "../../models/payment";

export interface IGetPaymentsRepository {
  getPayments(): Promise<Payment[]>;
}
