import express from "express";
import cors from "cors";
import { campusRouter } from "./routes/campus.routes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use("/api/v1/campus", campusRouter);


app.listen(PORT, (err) => {
  if(err){
    console.log(err);
  }
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
})
