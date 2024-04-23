// models/choice.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const Sport = sequelize.define('Sport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
});

export default Sport;