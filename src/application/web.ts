import express from "express";
import { Request, Response } from "express";
import { publicRouter } from "../router/public-router";
import { errorMiddleware } from "../middleware/error-middleware";
import swaggerUi from "swagger-ui-express";
// import { swaggerDocument } from "./swagger";
import cors from "cors";
import { privateRouter } from "../router/private-router";

export const web = express();

web.use(cors());

// web.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

web.use(express.json());

web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

// web.use(notFoundMiddleware)
// web.use((req: Request, res: Response) => {
//   res.status(404).json({
//     errors: "Error not found",
//   });
// });
