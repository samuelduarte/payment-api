import { IGetPaymentsRepository } from "../../controllers/get-payments/protocols";
import { MongoClient } from "../../database/mongo";
import { Payment } from "../../models/payment";
import { MongoPayment } from "../mongo-protocols";

export class MongoGetPaymentsRepository implements IGetPaymentsRepository {
  async getPayments(): Promise<Payment[]> {
    const payments = await MongoClient.db
      .collection<MongoPayment>("payments")
      .find({})
      .toArray();

    return payments.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
