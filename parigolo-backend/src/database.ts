// database.ts
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}
export const sequelize = new Sequelize(databaseUrl, {dialect: "postgres"});