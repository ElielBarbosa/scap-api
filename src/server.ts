import express from "express";
import "dotenv/config";
import cors from "cors";
import { campusRouter } from "./routes/campus.routes";

import { errorHandle } from "./middlewares/errorHandler.middleware";
import { userRouter } from "./routes/user.routes";
import { authRoutes } from "./routes/auth.routes";
import { security } from "./middlewares/auth.middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);


app.use("/api/v1/campus", campusRouter);
app.use("/api/v1/user", userRouter);
//app.use(security);

app.use(errorHandle);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
