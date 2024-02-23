import express from "express";
import { config } from "dotenv";
import { GetPaymentsController } from "./controllers/get-payments/get-payments";
import { MongoGetPaymentsRepository } from "./repositories/get-payments/mongo-get-payments";
import { MongoClient } from "./database/mongo";
import { MongoCreatePaymentRepository } from "./repositories/create-payments/mongo-create-payment";
import { CreatePaymentController } from "./controllers/create-payments/create-payments";
import { MongoGetPaymentRepository } from "./repositories/get-payment/mongo-get-payment";
import { GetPaymentController } from "./controllers/get-payment/get-payment";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/payments", async (req, res) => {
    const createPaymentRepository = new MongoGetPaymentsRepository();

    const getPaymentsController = new GetPaymentsController(
      createPaymentRepository
    );

    const { body, statusCode } = await getPaymentsController.handle();

    res.status(statusCode).json(body);
  });

  app.get("/payments/:id", async (req, res) => {
    const getPaymentRepository = new MongoGetPaymentRepository();

    const getPaymentController = new GetPaymentController(getPaymentRepository);

    const { body, statusCode } = await getPaymentController.handle(req);

    res.status(statusCode).json(body);
  });

  app.post("/payments", async (req, res) => {
    const mongoCreatePaymentRepository = new MongoCreatePaymentRepository();

    const createPaymentController = new CreatePaymentController(
      mongoCreatePaymentRepository
    );

    const { body, statusCode } = await createPaymentController.handle({
      body: req.body,
    });

    res.status(statusCode).json(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
