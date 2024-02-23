import { Payment } from "../../models/payment";

export interface CreatePaymentParams {
  name: string;
  numberCard: string;
  amount: string;
  validateDateCard: string;
  cvv: string;
}

export interface ICreatePaymentRepository {
  createPayment(params: CreatePaymentParams): Promise<Payment>;
}
