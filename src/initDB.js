import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { Item } from "./models/item.js";
import { Crate } from "./models/crate.js";
dotenv.config();
function startDatabase() {
  const sequelize = new Sequelize(
    process.env.DB_database,
    process.env.DB_user,
    process.env.DB_password,
    { host: process.env.DB_host, port: process.env.DB_port, dialect: "mariadb" }
  );

  const item = Item(sequelize);
  const crate = Crate(sequelize);
  try {
    sequelize.authenticate();
    item.sync();
    crate.sync();
  } catch (error) {
    console.error("unable to start database: ", error);
  }
}

export { startDatabase };
