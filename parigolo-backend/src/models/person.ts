import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pseudo: DataTypes.STRING,
  password: DataTypes.STRING,
  nbPoints: DataTypes.FLOAT,
});

export default Person;