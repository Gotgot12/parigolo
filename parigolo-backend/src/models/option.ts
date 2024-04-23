import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

class Option extends Model {
  public id!: number;
  public description!: string;
  public betId!: number;
}

Option.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    betId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "options",
    sequelize: sequelize, // this bit is important
  }
);

export default Option;