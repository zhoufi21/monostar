import mariadb from "mariadb";
import { startDatabase } from "./initDB.js";
import express from "express";
import bodyParser from "body-parser";
import path, { join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const customerRouter = express.Router();
const crateRouter = express.Router();
const transactionRouter = express.Router();
const itemRouter = express.Router();

app.use(bodyParser.json());
app.use(express.static(join(__dirname, "build")));
app.use("/customer", customerRouter);
app.use("/crate", crateRouter);
app.use("/transaction", transactionRouter);
app.use("/item", itemRouter);
dotenv.config();
const port = process.env.port;

const db = await startDatabase();
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});
app.listen(port, () => {
  console.log("listening on " + port);
});
