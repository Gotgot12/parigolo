// models/choice.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const Choice = sequelize.define('Choice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  isWin: DataTypes.BOOLEAN,
  BetId: DataTypes.INTEGER,
});

export default Choice;