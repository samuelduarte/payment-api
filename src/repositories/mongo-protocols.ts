import { Payment } from "../models/payment";

export type MongoPayment = Omit<Payment, "id">;
