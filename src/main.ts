import express, { Request, Response } from "express";
import cors from "cors";
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swaggerOptions';

import apiRoutes from "./routes/api.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
