// models/choice.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import Person from "./person";
import Choice from "./choice";


interface ChoicePersonAttributes {
  ChoiceId: number;
  PersonId: number;
}

class ChoicePerson extends Model<ChoicePersonAttributes> implements ChoicePersonAttributes {
  public ChoiceId!: number;
  public PersonId!: number;
}


ChoicePerson.init(
  {
    ChoiceId: {
      type: DataTypes.INTEGER,
      references: {
          model: Choice,
          key: 'id',
      },
    },
    PersonId: {
      type: DataTypes.INTEGER,
      references: {
          model: Person,
          key: 'id',
      },
    },
  },
  {
      sequelize,
      modelName: 'ChoicePerson',
  }
  );

export default ChoicePerson;