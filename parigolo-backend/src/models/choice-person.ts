// models/choice.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Person from "./person";
import Choice from "./choice";

const ChoicePerson = sequelize.define('ChoicePerson', {
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
});

export default ChoicePerson;