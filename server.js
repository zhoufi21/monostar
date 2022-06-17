import mariadb from "mariadb";
import { startDatabase } from "./initDB.js";
import express from "express";
import bodyParser from "body-parser";
import path, { join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Customer } from "./src/models/customer.js";
import { Item } from "./src/models/item.js";
import { Crate } from "./src/models/crate.js";
import { Transaction } from "./src/models/transaction.js";

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
const item = await Item(db);
const crate = await Crate(db);
const transaction = await Transaction(db);
const customer = await Customer(db);
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});

itemRouter.post("/", async (req, res) => {
  console.log("item post");
  console.log(req.body);
  //   item.create({
  //     model: "a",
  //     producer: "b",
  //     name: "c",
  //     box_number: 1,
  //     item_per_box: 2,
  //     price: 3.3,
  //     box_sold: 0,
  //     crate_ID: null,
  //   });

  const temp = await item.create({
    model: req.body.model,
    producer: req.body.producer,
    name: req.body.name,
    box_number: req.body.box,
    item_per_box: req.body.item_per_box,
    price: req.body.price,
    box_sold: 0,
    crate_ID: req.body.crate,
  });
  res.status(200).send();
});
itemRouter.get("/", async (req, res) => {
  console.log(req.body);
  const select = await item.findAll();
  console.log("All users:", JSON.stringify(select, null, 2));
  res.json({ body: select });
});
itemRouter.get("/crate", async (req, res) => {
  const crates = await crate.findAll({ attributes: ["crate_ID"] });
  console.log(JSON.stringify(crates));
  res.json({ body: crates });
});

customerRouter.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const temp = await customer.create({
      name: req.body.name,
      date_created: req.body.date,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
  res.status(200).send();
});

crateRouter.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const temp = await crate.create({
      transport_company: req.body.transport,
      cost: req.body.cost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
  res.status(200).send();
});

crateRouter.get("/companies", async (req, res) => {
  console.log(req.body);
  const companies = await crate.findAll({ attributes: ["transport_company"] });
  console.log(JSON.stringify(companies));
  res.json({ body: companies });
});
customerRouter.get("/", async (req, res) => {
  console.log(req.body);
  const select = await customer.findAll();
  console.log("All users:", JSON.stringify(select, null, 2));
  res.json({ body: select });
});
app.listen(port, () => {
  console.log("listening on " + port);
});
