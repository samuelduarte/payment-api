import { Payment } from "../../models/payment";
import { badRequest, ok } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IGetPaymentRepository } from "./protocols";

export class GetPaymentController implements IController {
  constructor(private readonly repository: IGetPaymentRepository) {}
  async handle(
    httpRequest: HttpRequest<{ id: string }>
  ): Promise<HttpResponse<Payment | string>> {
    console.log("Http Request", httpRequest.params.id);

    if (!httpRequest.params.id) {
      return badRequest("Missing Id on params");
    }
    const payment = await this.repository.getPaymentById(httpRequest.params.id);
    return ok<Payment>(payment);
  }
}
