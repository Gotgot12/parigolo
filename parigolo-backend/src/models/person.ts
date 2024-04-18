import {DataTypes, Model} from "sequelize";
import { sequelize } from "../database";

interface PersonAttributes {
  id: number;
  pseudo: string;
  password: string;
}

class Person extends Model<PersonAttributes> implements PersonAttributes {
  public id!: number;
  public pseudo!: string;
  public password!: string;
}

Person.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pseudo: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Person',
    }
);

export default Person;