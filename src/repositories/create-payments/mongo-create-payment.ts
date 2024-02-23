import { CreatePaymentParams } from "../../controllers/create-payments/protocols";
import { ICreatePaymentRepository } from "../../controllers/create-payments/protocols";
import { MongoClient } from "../../database/mongo";
import { Payment } from "../../models/payment";
import { MongoPayment } from "../mongo-protocols";

export class MongoCreatePaymentRepository implements ICreatePaymentRepository {
  async createPayment(params: CreatePaymentParams): Promise<Payment> {
    const { insertedId } = await MongoClient.db
      .collection("payments")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoPayment>("payments")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("Payment not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
