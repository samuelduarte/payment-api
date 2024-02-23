import { Payment } from "../../models/payment";

export interface IGetPaymentRepository {
  getPaymentById(id: any): Promise<Payment>;
}
