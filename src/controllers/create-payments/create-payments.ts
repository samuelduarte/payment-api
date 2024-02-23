import validator from "validator";
import { Payment } from "../../models/payment";
import { created } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreatePaymentParams, ICreatePaymentRepository } from "./protocols";

export class CreatePaymentController implements IController {
  constructor(
    private readonly createPaymentRepository: ICreatePaymentRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreatePaymentParams>
  ): Promise<HttpResponse<Payment | string>> {
    try {
      await this.validateInput(httpRequest);

      const payment = await this.createPaymentRepository.createPayment(
        httpRequest.body!
      );
      return created<Payment>(payment);
    } catch (error) {
      return {
        body: error as any,
        statusCode: 500,
      };
    }
  }

  private async validateInput(httpRequest: HttpRequest<CreatePaymentParams>) {
    if (!validator.isEmpty(httpRequest.body!.amount)) {
      return {
        body: "Amount can be empty",
        statusCode: 400,
      };
    }
    if (!validator.isEmpty(httpRequest.body!.cvv)) {
      return {
        body: "CVV can be empty",
        statusCode: 400,
      };
    }

    if (!validator.isEmpty(httpRequest.body!.name)) {
      return {
        body: "Name can be empty",
        statusCode: 400,
      };
    }

    if (!validator.isEmpty(httpRequest.body!.numberCard)) {
      return {
        body: "NumberCard can be empty",
        statusCode: 400,
      };
    }

    if (validator.isDate(httpRequest.body!.validateDateCard)) {
      return {
        body: "ValidateDateCard can be empty",
        statusCode: 400,
      };
    }
  }
}
