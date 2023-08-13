import { Sequelize } from "sequelize";

import * as dotenv from "dotenv";

dotenv.config();
const dbName = process.env.DB_DATABASE as string;
const dbUser = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

export default sequelizeConnection;
