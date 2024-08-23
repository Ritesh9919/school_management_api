import express from "express";
import cors from "cors";

import schoolRouter from "./routes/school.route.js";
import { notFoundMiddleware } from "./middlewares/not_found.middleware.js";
import { errorHandlerMiddleware } from "./middlewares/error_handler.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(
    '<h1>SCHOOL-MANAGEMENT-API</h1><a href="https://documenter.getpostman.com/view/28692168/2sAXjDfwCn#af89db77-4f25-4d23-a522-2f244cde61f1">Documentation</a>'
  );
});

app.use("/api/school", schoolRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export { app };
