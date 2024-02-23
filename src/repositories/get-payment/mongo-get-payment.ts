import { ObjectId } from "mongodb";
import { IGetPaymentRepository } from "../../controllers/get-payment/protocols";
import { MongoClient } from "../../database/mongo";
import { Payment } from "../../models/payment";
import { MongoPayment } from "../mongo-protocols";

export class MongoGetPaymentRepository implements IGetPaymentRepository {
  async getPaymentById(id: any): Promise<Payment> {
    console.log("Id", id);

    const user = await MongoClient.db
      .collection<MongoPayment>("payments")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("Payment not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
