import { Payment } from "../../models/payment";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetPaymentsRepository } from "./protocols";

export class GetPaymentsController implements IController {
  constructor(private readonly getPaymentsRepository: IGetPaymentsRepository) {}

  async handle(): Promise<HttpResponse<Payment[] | string>> {
    try {
      const payments = await this.getPaymentsRepository.getPayments();

      return ok<Payment[]>(payments);
    } catch (error) {
      return serverError();
    }
  }
}
